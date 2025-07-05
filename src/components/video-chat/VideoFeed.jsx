import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../../hooks/useSocket';

const VideoFeed = () => {
  const {
    myVideo,
    userVideo,
    callAccepted,
    stream,
    isVideoOff
  } = useSocket();
  
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showEmojiTimer, setShowEmojiTimer] = useState(null);

  // Function to handle emoji reactions
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmoji(true);
    
    // Clear previous timer if exists
    if (showEmojiTimer) clearTimeout(showEmojiTimer);
    
    // Set timer to hide emoji after 3 seconds
    const timer = setTimeout(() => {
      setShowEmoji(false);
      setSelectedEmoji(null);
    }, 3000);
    
    setShowEmojiTimer(timer);
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (showEmojiTimer) clearTimeout(showEmojiTimer);
    };
  }, [showEmojiTimer]);

  // Animation variants for video containers
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  // Animation for emoji reactions
  const emojiVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [1, 1.5, 1], 
      opacity: 1,
      transition: { 
        duration: 0.5,
        times: [0, 0.5, 1]
      } 
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // List of emoji reactions
  const emojiReactions = ['❤️', '😂', '👍', '🔥', '😮', '👏'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Local Video */}
      <motion.div 
        className="relative bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl overflow-hidden shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {stream ? (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <p className="text-white text-xl">Loading your video...</p>
            </motion.div>
          </div>
        )}
        
        <motion.div 
          className="absolute bottom-4 left-4 bg-black bg-opacity-50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You
        </motion.div>
        
        {/* Emoji Reactions Display (Your Side) */}
        <AnimatePresence>
          {showEmoji && selectedEmoji && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl z-10"
              variants={emojiVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {selectedEmoji}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Remote Video */}
      <motion.div 
        className="relative bg-gradient-to-r from-indigo-900 to-fuchsia-900 rounded-xl overflow-hidden shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {callAccepted ? (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 10 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="mb-6"
            >
              <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <motion.p 
              className="text-white text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              Looking for someone cool...
            </motion.p>
          </div>
        )}
        
        {callAccepted && (
          <motion.div 
            className="absolute bottom-4 left-4 bg-black bg-opacity-50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Stranger
          </motion.div>
        )}
      </motion.div>
      
      {/* Emoji Reaction Bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2">
        <div className="flex space-x-3">
          {emojiReactions.map((emoji, index) => (
            <motion.button
              key={index}
              className="text-2xl hover:scale-125 transition-all"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
