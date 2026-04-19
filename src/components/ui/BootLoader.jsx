import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statements = [
  'Establishing secure connection...',
  'Aligning mechanical arrays...',
  'Initializing neural subsystems...',
  'Loading cognitive context...',
  'SYSTEM ONLINE.'
];

const BootLoader = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < statements.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, currentLine === statements.length - 1 ? 400 : 250); // Speed up transition
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(() => {
        onComplete();
      }, 300); // Speed up exit
      return () => clearTimeout(finalTimeout);
    }
  }, [currentLine, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-[#050A18] px-8 py-12 md:px-16 md:py-24"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <div className="flex flex-col gap-2 font-mono text-sm tracking-wider text-[#C8D8F0]">
        <AnimatePresence>
          {statements.slice(0, currentLine + 1).map((statement, idx) => (
            <motion.div
              key={statement}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[#B8960C] mr-4">{'>'}</span>
              <span className={idx === statements.length - 1 ? 'text-[#EEF2F9] font-bold' : 'text-[#8BA3C7]'}>{statement}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          className="h-4 w-2 bg-[#B8960C] ml-6 mt-1"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};

export default BootLoader;
