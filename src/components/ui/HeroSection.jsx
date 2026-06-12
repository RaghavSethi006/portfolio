import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import WatchMechanism from './WatchMechanism';

const nameParts = ['RAGHAV', 'SETHI'];

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(320px,420px)] items-center relative z-10 w-full">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: 0.8 }}
            >
              Software Engineer specializing in AI and systems architecture. I build high-performance applications with a focus on RAG pipelines, full-stack development, and technical infrastructure.<span style={{ display:'inline-block', marginLeft:'4px', fontFamily:'JetBrains Mono, monospace', color:'#B8960C' }} className="animate-pulse">_</span>
            </motion.p>

            <div className="flex flex-wrap gap-3">
              {['Multi-agent AI', 'RAG systems', 'Local-first apps'].map((item) => (
                <span
                  key={item}
                  className="border border-[#1A2744] bg-[#0B1428]/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8D8F0]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-[#B8960C] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#EEF2F9] transition hover:bg-[#B8960C]/10"
              >
                View My Work
              </a>
              <a
                href={`${process.env.PUBLIC_URL}/assets/Raghav_Sethi_Resume.pdf`}
                download="Raghav_Sethi_Resume.pdf"
                className="inline-flex items-center justify-center rounded-full border border-[#C8D8F0]/40 bg-[#0B1428] px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#C8D8F0] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
              >
                Download Resume
              </a>
            </div>

            <motion.div
              className="flex items-center gap-6 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              {[
                { label: 'PROJECTS', value: '09' },
                { label: 'YEAR', value: String(new Date().getFullYear()) },
                { label: 'DEGREE', value: 'CS·AI' },
                { label: 'STATUS', value: 'BUILDING' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#7A8EAB]">{stat.label}</span>
                  <span className="font-mono text-[13px] text-[#C8D8F0]">{stat.value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="
            absolute lg:static 
            right-[-75vw] sm:right-[-60vw] md:right-[-50vw] lg:right-auto 
            top-[45%] lg:top-auto 
            -translate-y-1/2 lg:translate-y-0 
            opacity-60 lg:opacity-100 
            w-[150vw] sm:w-[120vw] md:w-[100vw] lg:w-full lg:max-w-[420px] 
            -z-10 lg:z-10 
            pointer-events-none lg:pointer-events-auto 
            flex justify-end
          ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
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
