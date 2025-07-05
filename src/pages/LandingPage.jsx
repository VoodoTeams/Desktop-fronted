import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            {/* You can replace this with your actual logo */}
            <div className="flex items-center justify-center mb-4">
              <svg className="w-16 h-16 text-white" viewBox="0 0 40 40" fill="currentColor">
                <circle cx="20" cy="20" r="18" />
                <circle cx="15" cy="15" r="3" fill="black" />
                <circle cx="25" cy="15" r="3" fill="black" />
                <path d="M15 26a5 5 0 0110 0" stroke="black" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-4xl font-extrabold ml-2 bg-gradient-to-r from-white to-purple-300 text-transparent bg-clip-text">Voodo.</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-purple-400 text-transparent bg-clip-text"
          >
            Voodo Chats
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl"
          >
            Connect With A Touch of Mystery
            <br />
            Not our Average Chat App
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-2xl text-purple-200 mb-6">Select Your Tags</h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                className="bg-black bg-opacity-60 border border-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Texts chat
              </motion.button>
              
              <motion.button 
                className="bg-black bg-opacity-60 border border-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Video Chats
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full max-w-lg"
          >
            <div className="bg-black bg-opacity-40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
              <label className="flex items-center space-x-3 text-left mb-6 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600 rounded" />
                <span className="text-sm md:text-base text-white">
                  I confirm I have read and agree to the Terms of Service.<br />
                  I confirm that I am at least 13 years old and I have reached the age of majority.
                </span>
              </label>
              
              <Link to="/chat">
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-fuchsia-600 transition-all shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Chatting
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
