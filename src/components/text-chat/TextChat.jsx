import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSocket } from '../../hooks/useSocket';

const TextChat = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [strangerTyping, setStrangerTyping] = useState(false);
  const [connected, setConnected] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (!socket) return;
    
    // Listen for new messages
    socket.on('receiveMessage', (message) => {
      setChat(prevChat => [...prevChat, { text: message, sender: 'stranger' }]);
      setStrangerTyping(false);
    });
    
    // Listen for typing indicator
    socket.on('typing', () => {
      setStrangerTyping(true);
      
      // Reset typing indicator after 2 seconds of inactivity
      setTimeout(() => {
        setStrangerTyping(false);
      }, 2000);
    });
    
    // Listen for connection status
    socket.on('chatConnected', () => {
      setConnected(true);
      setChat([{ text: 'You are now chatting with a stranger!', sender: 'system' }]);
    });
    
    socket.on('chatDisconnected', () => {
      setConnected(false);
      setChat(prevChat => [...prevChat, { text: 'Stranger has disconnected.', sender: 'system' }]);
    });
    
    // Initialize chat
    socket.emit('findTextChat');
    
    return () => {
      socket.off('receiveMessage');
      socket.off('typing');
      socket.off('chatConnected');
      socket.off('chatDisconnected');
    };
  }, [socket]);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && connected) {
      socket.emit('sendMessage', message);
      setChat(prevChat => [...prevChat, { text: message, sender: 'me' }]);
      setMessage('');
    }
  };
  
  const handleTyping = (e) => {
    setMessage(e.target.value);
    
    // Emit typing event
    if (connected && e.target.value && !isTyping) {
      setIsTyping(true);
      socket.emit('typing');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };
  
  const findNewChat = () => {
    setChat([{ text: 'Looking for someone to chat with...', sender: 'system' }]);
    setConnected(false);
    socket.emit('findTextChat');
  };
  
  return (
    <div className="h-[70vh] flex flex-col bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Chat messages */}
      <div className="flex-grow overflow-auto p-4 space-y-2">
        {chat.map((msg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
          >
            {msg.sender === 'system' ? (
              <div className="bg-gray-800 bg-opacity-70 text-gray-300 px-4 py-2 rounded-full text-sm">
                {msg.text}
              </div>
            ) : (
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.sender === 'me' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-gray-800 bg-opacity-70 text-white rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            )}
          </motion.div>
        ))}
        
        {/* Typing indicator */}
        {strangerTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-2xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="p-4 bg-black bg-opacity-30">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            disabled={!connected}
            className="flex-grow bg-gray-800 bg-opacity-50 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!connected || !message.trim()}
            className="bg-purple-600 text-white rounded-full p-2 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={findNewChat}
            className="bg-indigo-600 text-white rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default TextChat;
