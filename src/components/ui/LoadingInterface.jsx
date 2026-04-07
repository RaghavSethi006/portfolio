import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  'rgba(200,216,240,0.65)',
  'rgba(200,216,240,0.18)',
  'rgba(184,150,12,0.55)',
];

const makeGrid = () =>
  Array.from({ length: 9 }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);

const LoadingInterface = () => {
  const [grid, setGrid] = useState(makeGrid);
  const [label, setLabel] = useState('SOLVING');

  useEffect(() => {
    const labels = ['SOLVING', 'COMPUTING', 'ALIGNING', 'READY'];
    let i = 0;
    const iv = setInterval(() => {
      setGrid(makeGrid());
      i++;
      if (i < labels.length) setLabel(labels[i]);
    }, 420);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid grid-cols-3 gap-1.5 p-3 border border-[#1A2744] rounded-xl bg-[#0B1428]">
        {grid.map((color, idx) => (
          <motion.div
            key={idx}
            className="w-10 h-10 rounded-md"
            animate={{ backgroundColor: color }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#7A8EAB]">{label}</span>
        <span className="font-mono text-[#B8960C] animate-pulse">_</span>
      </div>
    </motion.div>
  );
};

export default LoadingInterface;
