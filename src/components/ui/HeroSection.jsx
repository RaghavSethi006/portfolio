import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import WatchMechanism from './WatchMechanism';

const nameParts = ['RAGHAV', 'SETHI'];

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(320px,420px)] items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div>
              <div className="flex flex-col gap-2">
                {nameParts.map((part, partIndex) => (
                  <h1
                    key={partIndex}
                    className={`flex flex-wrap items-center gap-2 font-bold uppercase tracking-[0.18em] leading-none text-[#EEF2F9] ${
                      partIndex === 0
                        ? 'text-5xl sm:text-6xl md:text-8xl'
                        : 'text-4xl sm:text-5xl md:text-7xl pl-1'
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {part.split('').map((letter, index) => {
                      const overallIndex = partIndex === 0 ? index : nameParts[0].length + index;
                      return (
                        <span
                          key={`${part}-${index}`}
                          className="opacity-0 inline-block fade-letter"
                          style={{ animationDelay: `${overallIndex * 0.05}s` }}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </h1>
                ))}
              </div>
              <div className="mt-6 h-px w-40 bg-[#C8D8F0]/40" />
            </div>

            <motion.p
              className="max-w-2xl text-lg sm:text-xl leading-8 text-[#CAD4E4]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 1.3, duration: 0.8 }}
            >
              AI/ML Engineer — Builder of intelligent systems. I measure work the way a watchmaker measures time: every hidden gear aligned, every outcome precise.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-[#B8960C] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-[0.3em] text-[#EEF2F9] transition hover:bg-[#B8960C]/10"
              >
                View My Work
              </a>
              <a
                href={`${process.env.PUBLIC_URL}/assets/Raghav_Sethi_Resume.pdf`}
                download="Raghav_Sethi_Resume.pdf"
                className="inline-flex items-center justify-center rounded-full border border-[#C8D8F0]/40 bg-[#0B1428] px-6 py-3 text-sm font-medium uppercase tracking-[0.3em] text-[#C8D8F0] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          <div className="hidden lg:flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
              className="w-full max-w-[420px]"
            >
              <WatchMechanism />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
