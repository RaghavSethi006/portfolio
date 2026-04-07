import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks, email } from '../../data/profile';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center text-center px-6 py-32 overflow-hidden"
      style={{ background: '#050A18' }}
    >
      {/* Radial glow behind the text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(184,150,12,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Eyebrow */}
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#8BA3C7] mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Contact
      </motion.p>

      {/* Main statement */}
      <motion.h2
        className="font-serif text-[#EEF2F9] leading-[0.95] tracking-tight mb-16"
        style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        Let's build something<br />
        <span style={{ color: 'rgba(200,216,240,0.4)' }}>that matters.</span>
      </motion.h2>

      {/* Email — the primary CTA */}
      <motion.a
        href={`mailto:${email}`}
        className="font-mono text-[#C8D8F0] hover:text-[#B8960C] transition-colors duration-300 mb-12"
        style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)', letterSpacing: '0.15em' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        {email} →
      </motion.a>

      {/* Divider */}
      <motion.div
        className="h-px bg-[#1A2744] mb-10"
        style={{ width: '48px' }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />

      {/* Social links */}
      <motion.div
        className="flex items-center gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A8EAB] hover:text-[#EEF2F9] transition-colors duration-200"
        >
          GitHub
        </a>
        <span className="text-[#1A2744] font-mono text-xs">·</span>
        
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A8EAB] hover:text-[#EEF2F9] transition-colors duration-200"
        >
          LinkedIn
        </a>
      </motion.div>

      {/* Bottom coordinate — a quiet personal detail */}
      <motion.p
        className="absolute bottom-10 font-mono text-[9px] tracking-[0.2em]"
        style={{ color: 'rgba(200,216,240,0.12)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.9 }}
      >
        53.5461° N, 113.4938° W · Edmonton, Alberta
      </motion.p>

    </section>
  );
};

export default ContactSection;
