import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userCount, setUserCount] = useState(15023);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animate user count
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10' 
          : 'bg-transparent'
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-fuchsia-900/10 opacity-50" />
      
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-3"
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Glowing background for logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              
              {/* Logo SVG (since we can't use img src) */}
               <img src="/src/assets/logo.png" alt="Voodo Logo" className="h-10" />
            </motion.div>
            
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 text-transparent bg-clip-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Voodo.
            </motion.span>
          </motion.div>

          {/* Right Section */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            {/* User Count */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <motion.span 
                  className="text-white font-medium"
                  key={userCount}
                  initial={{ scale: 1.2, color: "#10b981" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.3 }}
                >
                  {userCount.toLocaleString()}+
                </motion.span>
              </div>
            </motion.div>

            {/* Premium Button */}
            <motion.button
              className="group relative px-6 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Premium</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />
            </motion.button>

            {/* Download Button */}
            <motion.button
              className="group relative px-6 py-2 bg-black/60 backdrop-blur-sm border border-purple-500/30 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:border-purple-400 hover:bg-purple-900/20"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </motion.header>
  );
};

export default Header;