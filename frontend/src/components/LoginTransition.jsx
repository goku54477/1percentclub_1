import React from 'react';
import { motion } from 'framer-motion';

const LoginTransition = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#dc2626' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo Container */}
      <div className="relative flex items-center justify-center mb-8">
        <motion.img
          src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
          alt="1% Logo"
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 1.2,
            times: [0, 0.6, 1],
            ease: "easeOut"
          }}
        />
        
        {/* Pixelated blocks animation effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: 2,
            ease: "easeInOut"
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5]
              }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.1,
                repeat: 1,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        className="text-white text-xl md:text-2xl font-light tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        LOADING
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          ...
        </motion.span>
      </motion.div>

      {/* Subtle glitch effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.1, 0, 0.15, 0],
          x: [0, -2, 2, -1, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          mixBlendMode: 'overlay'
        }}
      />
    </motion.div>
  );
};

export default LoginTransition;
