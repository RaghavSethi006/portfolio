import React from 'react';
import { motion } from 'framer-motion';

const StatementBand = ({ text, sub }) => {
  return (
    <div className="relative w-full overflow-hidden py-6 select-none pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6"
      >
        <span
          className="font-serif leading-none tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 9rem)',
            color: 'rgba(200,216,240,0.07)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </span>
        {sub && (
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] md:self-center"
            style={{ color: 'rgba(184,150,12,0.5)', whiteSpace: 'normal', paddingLeft: '4px' }}
          >
            {sub}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default StatementBand;
