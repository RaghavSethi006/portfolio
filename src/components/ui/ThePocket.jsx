import React from 'react';
import { motion } from 'framer-motion';

const pocketItems = [
  { category: 'READING', content: 'Gödel, Escher, Bach — Douglas Hofstadter', note: 'On loops, self-reference, and strange minds.' },
  { category: 'STUDYING', content: 'Attention Is All You Need — Vaswani et al.', note: 'The paper that changed everything.' },
  { category: 'PLAYING', content: 'The Sicilian Defense', note: 'Aggressive. Asymmetric. Exactly how I like it.' },
  { category: 'OBSESSING OVER', content: 'A. Lange & Söhne Datograph', note: 'The flyback chronograph. Engineering as poetry.' },
  { category: 'BUILDING', content: 'Something with LLMs and memory', note: "Ask me when it's ready." },
  { category: 'THINKING ABOUT', content: 'The Ship of Theseus problem', note: 'Specifically whether my code from 2022 is still mine.' }
];

const ThePocket = () => {
  return (
    <section className="bg-[#050A18] py-20">
      <div className="max-w-[900px] mx-auto px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11.5" stroke="rgba(200,216,240,0.2)" strokeWidth="1" strokeDasharray="2 3"/>
              <text x="12" y="15.5" fontSize="10" fill="#B8960C" textAnchor="middle" fontFamily="sans-serif">∞</text>
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8BA3C7]">THE POCKET</span>
          </div>
          <h2 className="font-serif text-[2rem] text-[#EEF2F9] mt-4">What I'm carrying right now.</h2>
          <p className="italic text-[14px] text-[#7A8EAB] mt-2">A curated selection from infinite curiosity.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 mt-10">
          {pocketItems.map((item, index) => (
            <motion.div
              key={item.category}
              className="bg-[#0B1428] rounded-xl p-[1.25rem] px-[1.5rem] transition-colors duration-250 ease-out hover:border-[#B8960C]/30"
              style={{ border: '0.5px solid #1A2744' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <h3 className="font-mono text-[9px] uppercase tracking-widest text-[#B8960C] mb-2">{item.category}</h3>
              <p className="font-serif text-[15px] text-[#EEF2F9] mb-1">{item.content}</p>
              <p className="italic text-[12px] text-[#7A8EAB]">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThePocket;
