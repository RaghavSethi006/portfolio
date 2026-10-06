import React from 'react';
import { motion } from 'framer-motion';
import { bio } from '../../data/profile';
import SplitHeading from '../../components/ui/SplitHeading';
import TriLevelChess from '../../components/ui/TriLevelChess';

const AboutPage = () => {
  return (
    <section
      className="py-20 lg:py-24 relative border-y border-[#1A2744]/50"
      style={{
        background: '#050A18',
        backgroundImage: `linear-gradient(rgba(200,216,240,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(200,216,240,0.022) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:gap-14 lg:grid-cols-12 items-center">
          {/* Left Column: Tri-Level Chess Artifact (responsive scale) */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <TriLevelChess />
          </motion.div>

          {/* Right Column: About Details */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7]">About</p>
            <SplitHeading className="text-3xl font-serif text-[#EEF2F9] leading-tight sm:text-4xl lg:text-5xl max-w-3xl">
              Engineering intelligent systems with structural integrity and precision.
            </SplitHeading>
            <div className="text-base leading-relaxed text-[#CAD4E4] space-y-4 max-w-3xl">
              <p>
                I am a Computer Science Honours student at the University of Alberta, specializing in Artificial Intelligence. Currently, I serve as the Vice President of Technology for the Undergraduate Artificial Intelligence Society (UAIS), overseeing technical operations and cloud infrastructure.
              </p>
              <p>
                My work involves architecting retrieval-augmented generation (RAG) pipelines, building secure enterprise features, and designing scalable full-stack applications. I work primarily with Python, React, and Node.js, focusing on creating robust systems where every component serves a clear functional purpose.
              </p>
              <p>
                I am currently exploring autonomous agent workflows and optimizations for large-scale data retrieval. My goal is to engineer high-performance software that integrates sophisticated AI logic into stable, production-ready environments.
              </p>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#8BA3C7] mt-4 mb-2">Education</p>
              <p className="text-sm text-[#CAD4E4] leading-7">
                BSc Honours in Computer Science with AI — University of Alberta, 2024–2028.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 pt-10 border-t border-[#1A2744]/40"
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

export default React.memo(AboutPage);
