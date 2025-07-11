import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('Selected Tags:', selectedTags);
    console.log('Is Agreed:', isAgreed);
    console.log('Button should be enabled:', isAgreed && selectedTags.length > 0);
  }, [selectedTags, isAgreed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const toggleTag = (tag) => {
    console.log('Toggle tag:', tag);
    setSelectedTags(prev => {
      const newTags = prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      console.log('New selected tags:', newTags);
      return newTags;
    });
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/90 to-fuchsia-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
      </div>

      {/* Interactive cursor glow */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-96 h-96 bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 rounded-full blur-3xl" />
      </motion.div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${
                i % 3 === 0 ? 'rgba(147,51,234,0.4)' : 
                i % 3 === 1 ? 'rgba(236,72,153,0.4)' : 
                'rgba(168,85,247,0.4)'
              }, transparent)`,
              filter: 'blur(1px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Logo Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div 
              className="flex items-center justify-center mb-4"
              variants={floatingVariants}
              animate="animate"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full blur-md opacity-75" />
                <svg className="w-16 h-16 text-white relative z-10" viewBox="0 0 40 40" fill="currentColor">
                  <circle cx="20" cy="20" r="18" />
                  <circle cx="15" cy="15" r="3" fill="black" />
                  <circle cx="25" cy="15" r="3" fill="black" />
                  <path d="M15 26a5 5 0 0110 0" stroke="black" strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
              <motion.span 
                className="text-4xl font-extrabold ml-3 bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 text-transparent bg-clip-text"
                whileHover={{ scale: 1.05 }}
              >
                Voodo.
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 text-transparent bg-clip-text leading-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Voodo Chats
            </motion.h1>
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <motion.p
              className="text-xl md:text-2xl text-purple-100 mb-4 max-w-2xl leading-relaxed"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 text-transparent bg-clip-text font-semibold">
                Connect With A Touch of Mystery
              </span>
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-purple-200/80 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Not your Average Chat App
            </motion.p>
          </motion.div>

          {/* Tag Selection */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <motion.h2 
              className="text-2xl text-purple-200 mb-8 font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              Select Your Tags
            </motion.h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { id: 'text', label: 'Text Chat', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                )},
                { id: 'video', label: 'Video Chat', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                )}
              ].map((tag) => (
                <motion.button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`group relative px-8 py-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                    selectedTags.includes(tag.id)
                      ? 'bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-black/30 border-purple-500/30 text-purple-200 hover:border-purple-400 hover:bg-purple-900/20'
                  }`}
                  aria-pressed={selectedTags.includes(tag.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={selectedTags.includes(tag.id) ? { rotate: 360 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {tag.icon}
                    </motion.div>
                    <span className="font-medium">{tag.label}</span>
                  </div>
                  {selectedTags.includes(tag.id) && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-sm -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-lg"
          >
            <motion.div
              className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
              
              <motion.label 
                className="flex items-start space-x-4 text-left mb-8 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <motion.div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                      isAgreed 
                        ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 border-purple-400' 
                        : 'border-purple-400 bg-transparent'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence>
                      {isAgreed && (
                        <motion.svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
                <span className="text-sm md:text-base text-purple-100 leading-relaxed group-hover:text-white transition-colors">
                  I confirm I have read and agree to the{' '}
                  <span className="text-purple-300 hover:text-purple-200 underline decoration-purple-400">
                    Terms of Service
                  </span>
                  .<br />
                  I confirm that I am at least 13 years old and I have reached the age of majority.
                </span>
              </motion.label>
              
              <motion.button
                className={`group relative w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isAgreed && selectedTags.length > 0
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
                whileHover={isAgreed && selectedTags.length > 0 ? { scale: 1.03, y: -2 } : {}}
                whileTap={isAgreed && selectedTags.length > 0 ? { scale: 0.97 } : {}}
                disabled={!isAgreed || selectedTags.length === 0}
                onClick={() => {
                  if (isAgreed && selectedTags.length > 0) {
                    console.log('Start chatting button clicked');
                    // Navigation logic will be added here
                  }
                }}
              >
                <span className="relative z-10">
                  {isAgreed && selectedTags.length > 0 ? 'Start Chatting' : 
                   !isAgreed ? 'Please agree to terms' : 'Select at least one tag'}
                </span>
                {isAgreed && selectedTags.length > 0 && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                  />
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default LandingPage;