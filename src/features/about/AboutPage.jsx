import React from 'react';
import { motion } from 'framer-motion';
import { bio, philosophy } from '../../data/profile';
import SplitHeading from '../../components/ui/SplitHeading';

const AboutPage = () => {
  return (
    <section
      className="py-20 relative"
      style={{
        background: '#050A18',
        backgroundImage: `linear-gradient(rgba(200,216,240,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(200,216,240,0.022) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7]">About</p>
            <SplitHeading className="max-w-3xl text-4xl font-serif text-[#EEF2F9] leading-tight sm:text-5xl">
              I build systems that think. I play chess while the world plays checkers.
            </SplitHeading>
            <div className="max-w-2xl text-base leading-8 text-[#CAD4E4] space-y-4">
              <p>
                I build systems that think. Not tools that perform — systems that reason.
                I approach every problem the way a chess player reads a board: three moves ahead,
                accounting for what the opponent hasn't done yet.
              </p>
              <p>
                I am obsessed with mechanical watches — not for status, but because they represent
                the highest form of engineering philosophy: every invisible gear has a purpose,
                and precision is the only aesthetic that matters. That philosophy runs through everything I build.
              </p>
              <p>
                There is also the Doraemon in me — the part that believes technology should feel like
                a pocket of infinite possibility. That wonder doesn't leave; it just learns to wear a sharper suit.
                I read philosophy. I do card magic. I eat everything. I learn without stopping.
              </p>
              <p>
                This portfolio is built the same way I build systems: nothing decorative without purpose,
                nothing powerful without elegance.
              </p>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#8BA3C7] mt-8 mb-3">Currently</p>
              <p className="text-sm text-[#CAD4E4] leading-7">
                BSc Honours in Computer Science with AI — University of Alberta, 2024–2028.
                Building systems at the intersection of intelligence and craft.
              </p>
            </div>
          </motion.div>

          <motion.aside
            className="rounded-2xl border border-[#1A2744] bg-[#0B1428] p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-6">Philosophy</p>
            <div className="space-y-6 border-l-2 border-[#B8960C]/50 pl-5">
              {philosophy.map((item, idx) => (
                <div key={item.title} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#B8960C]/60 text-lg" style={{ fontFamily: 'serif' }}>
                      {['♔', '♕', '♖'][idx]}
                    </span>
                    <p className="text-xl font-serif font-bold text-[#EEF2F9]">{item.title}</p>
                  </div>
                  <p className="text-sm leading-7 text-[#CAD4E4]">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-6">Technical discipline</p>
          <div className="flex flex-wrap gap-3">
            {bio.highlights.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[#1A2744] bg-[#0B1428] px-4 py-2 text-sm text-[#EEF2F9]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
