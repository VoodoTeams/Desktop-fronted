import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import VideoChat from '../components/video-chat/VideoChat';
import TextChat from '../components/text-chat/TextChat';
import { useSocket } from '../hooks/useSocket';

const ChatPage = () => {
  const { onlineUsers } = useSocket();
  const [activeTab, setActiveTab] = useState('video'); // 'video' or 'text'
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900">
      <div className="container mx-auto px-4 py-6">
        {/* Online users indicator */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-white">{onlineUsers} online</span>
          </div>
        </motion.div>
        
        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-1 inline-flex">
            <motion.button
              className={`px-6 py-2 rounded-full text-white ${activeTab === 'video' ? 'bg-purple-600' : 'bg-transparent'}`}
              onClick={() => setActiveTab('video')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Video Chat
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-full text-white ${activeTab === 'text' ? 'bg-purple-600' : 'bg-transparent'}`}
              onClick={() => setActiveTab('text')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Text Chat
            </motion.button>
          </div>
        </div>
        
        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'video' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'video' ? 50 : -50 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto"
          >
            {activeTab === 'video' ? (
              <VideoChat />
            ) : (
              <TextChat />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatPage;
