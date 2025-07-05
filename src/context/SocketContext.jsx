import React, { createContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:5000';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Request camera and microphone permissions
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Empty dependency array to run only once

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    // Listen for incoming calls
    socket.on('callUser', ({ from, signal, name }) => {
      setCall({ isReceivingCall: true, from, signal, name });
    });

    // Listen for user count update
    socket.on('updateUserCount', (count) => {
      setOnlineUsers(count);
    });

    // Clean up event listeners on unmount
    return () => {
      socket.off('callUser');
      socket.off('updateUserCount');
    };
  }, [socket]);

  // Function to answer an incoming call
  const answerCall = () => {
    setCallAccepted(true);

    try {
      // Create a peer connection as the receiver (not initiator)
      const peerOptions = { 
        initiator: false, 
        trickle: false, 
        stream 
      };
      
      const peer = new Peer(peerOptions);

      // When we get signal data, send it to the caller
      peer.on('signal', (data) => {
        socket.emit('answerCall', { signal: data, to: call.from });
      });

      // Handle when we get the remote stream
      peer.on('stream', (remoteStream) => {
        console.log('Received remote stream');
        if (userVideo.current) {
          userVideo.current.srcObject = remoteStream;
        }
      });

      // Handle errors
      peer.on('error', (err) => {
        console.error('Peer connection error:', err);
      });

      // Process the signal from the caller
      peer.signal(call.signal);

      // Store the peer connection for later use
      connectionRef.current = peer;
    } catch (err) {
      console.error('Error in answerCall:', err);
    }
  };

  // Function to initiate a call to another user
  const callUser = (id) => {
    try {
      // Create a peer connection as the initiator
      const peerOptions = { 
        initiator: true, 
        trickle: false, 
        stream 
      };
      
      const peer = new Peer(peerOptions);

      // When we get signal data, send it to the recipient
      peer.on('signal', (data) => {
        console.log('Generated signal data', data);
        socket.emit('callUser', { userToCall: id, signalData: data, from: socket.id, name: 'User' });
      });

      // Handle when we get the remote stream
      peer.on('stream', (remoteStream) => {
        console.log('Received remote stream');
        if (userVideo.current) {
          userVideo.current.srcObject = remoteStream;
        }
      });
      
      // Handle errors
      peer.on('error', (err) => {
        console.error('Peer connection error:', err);
      });

      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (err) {
      console.error('Error in callUser:', err);
    }
  };

  // Function to end a call
  const leaveCall = () => {
    setCallEnded(true);
    
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    
    socket.emit('endCall');
    
    // Reset call state
    setCallAccepted(false);
    setCall({});
    
    // Find a new partner
    findNewPartner();
  };

  // Function to find a new chat partner
  const findNewPartner = () => {
    setCallEnded(false);
    socket.emit('findPartner');
  };

  // Function to toggle microphone
  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  // Function to toggle camera
  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      stream,
      call,
      callAccepted,
      callEnded,
      myVideo,
      userVideo,
      isMuted,
      isVideoOff,
      onlineUsers,
      answerCall,
      callUser,
      leaveCall,
      toggleMute,
      toggleVideo,
      findNewPartner,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
