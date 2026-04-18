import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default');

  // Native mouse positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springConfigOuter = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfigOuter);
  const smoothY = useSpring(mouseY, springConfigOuter);

  useEffect(() => {

    const trail = [];
    let ticking = false;

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Trailing dot logic restored
      if (!ticking && cursorState === 'default') {
        requestAnimationFrame(() => {
          const dot = document.createElement('div');
          dot.className = 'cursor-trail-dot';
          dot.style.left = e.clientX + 'px';
          dot.style.top = e.clientY + 'px';
          document.body.appendChild(dot);
          trail.push(dot);
          if (trail.length > 4) {
            const old = trail.shift();
            old.remove();
          }
          setTimeout(() => {
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 400);
          }, 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const computedStyle = window.getComputedStyle(target);
      
      // Determine state by element type or styling
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        computedStyle.cursor === 'pointer'
      ) {
        setCursorState('pointer');
        trail.forEach(t => t.remove()); // Clear trail when hovering
        trail.length = 0;
      } else if (
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'p' ||
        target.tagName.toLowerCase().match(/^h[1-6]$/) ||
        computedStyle.cursor === 'text'
      ) {
        setCursorState('text');
        trail.forEach(t => t.remove()); // Clear trail
        trail.length = 0;
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      trail.forEach(t => t.remove());
    };
  }, [mouseX, mouseY, cursorState]);



  const variantsInner = {
    default: {
      width: 4,
      height: 4,
      opacity: 1,
      backgroundColor: '#B8960C'
    },
    pointer: {
      width: 0,
      height: 0,
      opacity: 0
    },
    text: {
      width: 2,
      height: 16,
      opacity: 1,
      backgroundColor: '#B8960C',
      borderRadius: '2px'
    }
  };

  const variantsOuter = {
    default: {
      width: 14,
      height: 14,
      borderWidth: 1,
      borderColor: 'rgba(184, 150, 12, 0.4)',
      backgroundColor: 'transparent',
      opacity: 1,
      scale: 1,
      rotate: 45, // Sharp diamond
      borderRadius: '2px'
    },
    pointer: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: 'rgba(184, 150, 12, 0.8)',
      backgroundColor: 'rgba(184, 150, 12, 0.05)',
      opacity: 1,
      scale: 1,
      rotate: 90,
      borderRadius: '0px' // Sharp square framing
    },
    text: {
      width: 4,
      height: 24,
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: 'rgba(184, 150, 12, 0.2)',
      opacity: 1,
      scale: 1,
      rotate: 0,
      borderRadius: '0px'
    }
  };

  // Primary inner point: Zero-latency tracking
  return (
    <div className="custom-cursor-wrapper">
      {/* Outer physics-based trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
          willChange: 'transform'
        }}
        variants={variantsOuter}
        animate={cursorState}
        transition={{ type: 'spring', stiffness: 450, damping: 30, mass: 0.4 }}
      >
        <AnimatePresence>
          {cursorState === 'pointer' && (
             <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="w-[2px] h-[2px] bg-[#EEF2F9] rounded-full absolute"
             />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Primary inner point: Zero-latency tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          willChange: 'transform'
        }}
        variants={variantsInner}
        animate={cursorState}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </div>
  );
};

export default CustomCursor;
