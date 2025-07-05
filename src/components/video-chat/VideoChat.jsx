import React, { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import VideoControls from './VideoControls';
import VideoFeed from './VideoFeed';

const VideoChat = () => {
  const {
    callAccepted,
    callEnded,
    call,
    answerCall,
    findNewPartner,
    onlineUsers
  } = useSocket();
  
  const [searching, setSearching] = useState(false);
  
  // Auto-answer incoming call
  useEffect(() => {
    if (call?.isReceivingCall && !callAccepted && !callEnded) {
      answerCall();
    }
  }, [call, callAccepted, callEnded, answerCall]);
  
  // Start searching when component mounts
  useEffect(() => {
    if (!callAccepted && !callEnded && !searching) {
      setSearching(true);
      findNewPartner();
    }
  }, [callAccepted, callEnded, searching, findNewPartner]);
  
  // Reset searching state when call changes
  useEffect(() => {
    if (callAccepted) {
      setSearching(false);
    }
  }, [callAccepted]);
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      <div className="flex-grow p-4 relative">
        <VideoFeed />
        
        {searching && !callAccepted && !callEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Finding someone to chat with...</p>
              <p className="mt-2">Online users: {onlineUsers}</p>
            </div>
          </div>
        )}
        
        <VideoControls />
      </div>
    </div>
  );
};

export default VideoChat;
