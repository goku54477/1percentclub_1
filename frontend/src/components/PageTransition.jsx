import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, isConfirmationPage = false }) => {
  // Special animation for confirmation page (slide in from right with fade)
  const confirmationVariants = {
    initial: { 
      opacity: 0, 
      x: '100%',
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth motion
      }
    },
    exit: { 
      opacity: 0,
      x: '-50%',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Standard fade animation for other pages
  const standardVariants = {
    initial: { 
      opacity: 0,
      x: 20
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    exit: { 
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      variants={isConfirmationPage ? confirmationVariants : standardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
