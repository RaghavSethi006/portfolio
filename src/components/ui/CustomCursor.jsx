import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

const interactiveSelector = [
  'a',
  'button',
  '[role="button"]',
  'input',
  'textarea',
  'select',
  '.cursor-pointer',
].join(',');

const textSelector = ['input', 'textarea', '[contenteditable="true"]'].join(',');

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 420, mass: 0.35 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 420, mass: 0.35 });

  // Custom motion values to animate properties without causing React re-renders
  const width = useMotionValue(22);
  const height = useMotionValue(22);
  const opacity = useMotionValue(0);
  const borderColor = useMotionValue('rgba(184, 150, 12, 0.55)');
  const backgroundColor = useMotionValue('rgba(184, 150, 12, 0.02)');
  const boxShadow = useMotionValue('none');
  const dotOpacity = useMotionValue(0);

  useEffect(() => {
    let currentCursorState = 'idle';
    let isMouseOnScreen = false;

    const updateCursorProperties = (state, visible) => {
      currentCursorState = state;
      isMouseOnScreen = visible;

      const config = { type: 'spring', stiffness: 520, damping: 34, mass: 0.35 };

      if (!visible) {
        animate(opacity, 0, { duration: 0.15 });
        return;
      }

      if (state === 'idle') {
        animate(width, 22, config);
        animate(height, 22, config);
        animate(opacity, 0.32, config);
        animate(borderColor, 'rgba(184, 150, 12, 0.55)', config);
        animate(backgroundColor, 'rgba(184, 150, 12, 0.02)', config);
        animate(boxShadow, 'none', config);
        animate(dotOpacity, 0, config);
      } else if (state === 'action') {
        animate(width, 38, config);
        animate(height, 38, config);
        animate(opacity, 0.72, config);
        animate(borderColor, 'rgba(184, 150, 12, 0.9)', config);
        animate(backgroundColor, 'rgba(184, 150, 12, 0.08)', config);
        animate(boxShadow, '0 0 24px rgba(184, 150, 12, 0.18)', config);
        animate(dotOpacity, 1, config);
      } else if (state === 'text') {
        animate(width, 10, config);
        animate(height, 30, config);
        animate(opacity, 0.55, config);
        animate(borderColor, 'rgba(200, 216, 240, 0.75)', config);
        animate(backgroundColor, 'rgba(200, 216, 240, 0.06)', config);
        animate(boxShadow, 'none', config);
        animate(dotOpacity, 0, config);
      }
    };

    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!isMouseOnScreen) {
        updateCursorProperties(currentCursorState, true);
      }
    };

    const handleMouseOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      let targetState = 'idle';
      if (target.closest(textSelector)) {
        targetState = 'text';
      } else if (target.closest(interactiveSelector)) {
        targetState = 'action';
      }

      if (currentCursorState !== targetState || !isMouseOnScreen) {
        updateCursorProperties(targetState, true);
      }
    };

    const handleMouseLeave = () => {
      updateCursorProperties(currentCursorState, false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, width, height, opacity, borderColor, backgroundColor, boxShadow, dotOpacity]);

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor-wrapper fixed left-0 top-0 z-[9999] pointer-events-none hidden items-center justify-center border sm:flex"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        width,
        height,
        opacity,
        borderColor,
        backgroundColor,
        boxShadow,
        borderRadius: 999,
        willChange: 'transform, width, height',
      }}
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-[#B8960C]"
        style={{ opacity: dotOpacity }}
      />
    </motion.div>
  );
};

export default CustomCursor;
