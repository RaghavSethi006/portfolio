import React from 'react';
import { motion } from 'framer-motion';

const interests = [
  {
    id: 'chess',
    label: 'CHESS',
    reveal: 'I play chess while the world plays checkers.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="38" width="16" height="3" rx="1" fill="rgba(200,216,240,0.4)"/><rect x="18" y="35" width="12" height="3" rx="1" fill="rgba(200,216,240,0.3)"/><path d="M20 35 C18 28 14 24 16 18 C18 14 22 12 24 10 C28 14 30 18 28 24 L26 35Z" fill="rgba(200,216,240,0.2)" stroke="rgba(200,216,240,0.5)" stroke-width="0.8"/><circle cx="21" cy="16" r="1.5" fill="rgba(200,216,240,0.6)"/><path d="M24 10 L27 7 L25 10" fill="rgba(200,216,240,0.4)" stroke="rgba(200,216,240,0.5)" stroke-width="0.5"/></svg>'
  },
  {
    id: 'watch',
    label: 'HOROLOGY',
    reveal: 'Every invisible gear has a purpose. So does every line of code.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" stroke="rgba(200,216,240,0.3)" stroke-width="0.8"/><circle cx="24" cy="24" r="13" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><circle cx="24" cy="24" r="8" stroke="rgba(184,150,12,0.4)" stroke-width="0.8"/><line x1="24" y1="7" x2="24" y2="10" stroke="rgba(200,216,240,0.6)" stroke-width="1"/><line x1="24" y1="38" x2="24" y2="41" stroke="rgba(200,216,240,0.6)" stroke-width="1"/><line x1="7" y1="24" x2="10" y2="24" stroke="rgba(200,216,240,0.6)" stroke-width="1"/><line x1="38" y1="24" x2="41" y2="24" stroke="rgba(200,216,240,0.6)" stroke-width="1"/><line x1="24" y1="24" x2="24" y2="14" stroke="rgba(200,216,240,0.7)" stroke-width="1" stroke-linecap="round"/><line x1="24" y1="24" x2="32" y2="24" stroke="rgba(200,216,240,0.5)" stroke-width="0.8" stroke-linecap="round"/><circle cx="24" cy="24" r="1.2" fill="rgba(184,150,12,0.8)"/></svg>'
  },
  {
    id: 'rubiks',
    label: 'PUZZLES',
    reveal: 'Every problem is a scrambled state. I find the algorithm.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="8" height="8" rx="1" fill="rgba(200,216,240,0.5)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="20" y="10" width="8" height="8" rx="1" fill="rgba(200,216,240,0.15)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="30" y="10" width="8" height="8" rx="1" fill="rgba(184,150,12,0.4)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="10" y="20" width="8" height="8" rx="1" fill="rgba(200,216,240,0.15)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="20" y="20" width="8" height="8" rx="1" fill="rgba(200,216,240,0.5)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="30" y="20" width="8" height="8" rx="1" fill="rgba(200,216,240,0.15)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="10" y="30" width="8" height="8" rx="1" fill="rgba(184,150,12,0.4)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="20" y="30" width="8" height="8" rx="1" fill="rgba(200,216,240,0.15)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/><rect x="30" y="30" width="8" height="8" rx="1" fill="rgba(200,216,240,0.5)" stroke="rgba(200,216,240,0.2)" stroke-width="0.5"/></svg>'
  },
  {
    id: 'ironman',
    label: 'IRON MAN',
    reveal: 'Intelligence is the only armor that matters.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" stroke="rgba(200,216,240,0.2)" stroke-width="0.8"/><circle cx="24" cy="24" r="12" stroke="rgba(200,216,240,0.35)" stroke-width="0.8"/><polygon points="24,13 32.6,18.5 32.6,29.5 24,35 15.4,29.5 15.4,18.5" fill="none" stroke="rgba(200,216,240,0.5)" stroke-width="0.8"/><line x1="24" y1="24" x2="24" y2="13" stroke="rgba(184,150,12,0.4)" stroke-width="0.6"/><line x1="24" y1="24" x2="32.6" y2="18.5" stroke="rgba(184,150,12,0.4)" stroke-width="0.6"/><line x1="24" y1="24" x2="32.6" y2="29.5" stroke="rgba(184,150,12,0.4)" stroke-width="0.6"/><line x1="24" y1="24" x2="24" y2="35" stroke="rgba(184,150,12,0.4)" stroke-width="0.6"/><line x1="24" y1="24" x2="15.4" y2="29.5" stroke="rgba(184,150,12,0.4)" stroke-width="0.6"/><line x1="24" y1="24" x2="15.4" y2="18.5" stroke="rgba(184,150,12,0.4)" stroke-width="0.6"/><circle cx="24" cy="24" r="3" fill="rgba(184,150,12,0.6)"/></svg>'
  },
  {
    id: 'ai',
    label: 'AI / ML',
    reveal: 'I teach machines to reason. Still working on teaching people.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="14" r="2.5" fill="rgba(200,216,240,0.4)" stroke="rgba(200,216,240,0.3)" stroke-width="0.5"/><circle cx="10" cy="24" r="2.5" fill="rgba(200,216,240,0.4)" stroke="rgba(200,216,240,0.3)" stroke-width="0.5"/><circle cx="10" cy="34" r="2.5" fill="rgba(200,216,240,0.4)" stroke="rgba(200,216,240,0.3)" stroke-width="0.5"/><circle cx="24" cy="18" r="2.5" fill="rgba(184,150,12,0.5)" stroke="rgba(184,150,12,0.3)" stroke-width="0.5"/><circle cx="24" cy="30" r="2.5" fill="rgba(184,150,12,0.5)" stroke="rgba(184,150,12,0.3)" stroke-width="0.5"/><circle cx="38" cy="24" r="2.5" fill="rgba(200,216,240,0.7)" stroke="rgba(200,216,240,0.4)" stroke-width="0.8"/><line x1="12.5" y1="14" x2="21.5" y2="18" stroke="rgba(200,216,240,0.15)" stroke-width="0.6"/><line x1="12.5" y1="14" x2="21.5" y2="30" stroke="rgba(200,216,240,0.15)" stroke-width="0.6"/><line x1="12.5" y1="24" x2="21.5" y2="18" stroke="rgba(200,216,240,0.15)" stroke-width="0.6"/><line x1="12.5" y1="24" x2="21.5" y2="30" stroke="rgba(200,216,240,0.15)" stroke-width="0.6"/><line x1="12.5" y1="34" x2="21.5" y2="18" stroke="rgba(200,216,240,0.15)" stroke-width="0.6"/><line x1="12.5" y1="34" x2="21.5" y2="30" stroke="rgba(200,216,240,0.15)" stroke-width="0.6"/><line x1="26.5" y1="18" x2="35.5" y2="24" stroke="rgba(184,150,12,0.25)" stroke-width="0.6"/><line x1="26.5" y1="30" x2="35.5" y2="24" stroke="rgba(184,150,12,0.25)" stroke-width="0.6"/></svg>'
  },
  {
    id: 'magic',
    label: 'CARD MAGIC',
    reveal: 'Misdirection is an art. So is debugging.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="22" height="30" rx="2" fill="#0B1428" stroke="rgba(200,216,240,0.3)" stroke-width="0.8" transform="rotate(-12 19 29)"/><rect x="12" y="12" width="22" height="30" rx="2" fill="#0B1428" stroke="rgba(200,216,240,0.2)" stroke-width="0.8" transform="rotate(-4 23 27)"/><rect x="16" y="10" width="22" height="30" rx="2" fill="#0E1A34" stroke="rgba(200,216,240,0.5)" stroke-width="0.8"/><path d="M27 23 C27 20 23 18 23 18 C23 18 19 20 19 23 C19 25 21 26 21 26 L20 29 L26 29 L25 26 C25 26 27 25 27 23Z" fill="rgba(200,216,240,0.6)"/><text x="18" y="15" font-size="6" fill="rgba(200,216,240,0.5)" font-family="serif">♠</text></svg>'
  },
  {
    id: 'doraemon',
    label: 'THE POCKET',
    reveal: 'Infinite curiosity. Finite time. I choose carefully.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="22" r="16" stroke="rgba(200,216,240,0.3)" stroke-width="0.8"/><circle cx="24" cy="22" r="10" stroke="rgba(200,216,240,0.15)" stroke-width="0.5" stroke-dasharray="2,3"/><path d="M18 36 Q24 40 30 36" stroke="rgba(200,216,240,0.4)" stroke-width="0.8" fill="none"/><path d="M18 22 C18 19 21 17 24 22 C27 27 30 25 30 22 C30 19 27 17 24 22 C21 27 18 25 18 22Z" stroke="rgba(184,150,12,0.5)" stroke-width="0.8" fill="none"/></svg>'
  },
  {
    id: 'philosophy',
    label: 'PHILOSOPHY',
    reveal: 'The unexamined system is not worth running.',
    svg: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="8" width="8" height="2" rx="0.5" fill="rgba(200,216,240,0.4)"/><rect x="22" y="10" width="4" height="26" fill="rgba(200,216,240,0.12)" stroke="rgba(200,216,240,0.25)" stroke-width="0.5"/><rect x="19" y="36" width="10" height="2" rx="0.5" fill="rgba(200,216,240,0.4)"/><rect x="17" y="38" width="14" height="2" rx="0.5" fill="rgba(200,216,240,0.3)"/><line x1="22" y1="10" x2="22" y2="36" stroke="rgba(200,216,240,0.08)" stroke-width="0.5"/><line x1="24" y1="10" x2="24" y2="36" stroke="rgba(200,216,240,0.08)" stroke-width="0.5"/><line x1="26" y1="10" x2="26" y2="36" stroke="rgba(200,216,240,0.08)" stroke-width="0.5"/></svg>'
  }
];

const InterestsStrip = () => {
  return (
    <motion.div 
      className="w-full bg-[#050A18]"
      style={{ overflow: 'visible', paddingBottom: '48px' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full py-10">
        <div className="max-w-7xl mx-auto px-8 mb-10 text-center">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#8BA3C7] opacity-60">Personal Interests</h3>
        </div>
        <div className="flex justify-center flex-wrap gap-x-16 gap-y-12 max-w-7xl mx-auto px-8">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.id}
            className="flex flex-col items-center gap-3 relative cursor-default group"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.5 }}
          >
            <div 
              className="transition-transform duration-300 ease-out group-hover:scale-[1.06]"
              style={{ width: '48px', height: '48px' }}
              dangerouslySetInnerHTML={{ __html: interest.svg }} 
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#7A8EAB]">
              {interest.label}
            </span>
            <span 
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif italic text-xs text-[#C8D8F0]/60 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
            >
              {interest.reveal}
            </span>
          </motion.div>
        ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InterestsStrip;
