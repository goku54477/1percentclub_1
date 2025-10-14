import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CheckoutTransition = ({ onComplete }) => {
  useEffect(() => {
    // Complete the transition after animation
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1800); // Total animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      {/* Animated Logo and Text */}
      <div className="flex flex-col items-center space-y-8">
        {/* Logo with pulse animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <motion.img
            src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
            alt="1% Logo"
            className="w-32 h-32 object-contain"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Loading text with fade animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.3
          }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wider">
            Proceeding to Checkout
          </h2>
          <motion.div className="flex items-center justify-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-yellow-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.div
              className="w-2 h-2 bg-yellow-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.2
              }}
            />
            <motion.div
              className="w-2 h-2 bg-yellow-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.4
              }}
            />
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutTransition;
