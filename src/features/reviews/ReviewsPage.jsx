import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviews as staticReviews } from '../../data/profile';

const chessNav = [
  { prev: '← Qb6', next: 'Nf3 →' },
  { prev: '← d4',  next: 'Bc4 →' },
  { prev: '← Bb5', next: 'O-O →' },
  { prev: '← c4',  next: 'e5 →' },
  { prev: '← Nd2', next: 'O-O-O →' },
];

const ReviewsPage = ({ reviews, setReviews }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isComposing, setIsComposing] = useState(false);
  const [formData, setFormData] = useState({ quote: '', author: '', role: '' });

  const current = reviews[index] || reviews[0];
  const nav = chessNav[index % chessNav.length];

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.quote.trim() || !formData.author.trim()) return;
    
    setReviews(prev => [...prev, { ...formData }]);
    setFormData({ quote: '', author: '', role: '' });
    setIsComposing(false);
    
    setDirection(1);
    setIndex(reviews.length);
  };

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  };

  return (
    <section className="py-28 bg-[#050A18]" id="reviews">
      <div className="mx-auto max-w-4xl px-6 text-center">

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#8BA3C7] mb-16">
          Testimonials
        </p>

        <div style={{ minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ position: 'absolute', width: '100%' }}
            >
              <p
                className="font-serif text-[#EEF2F9] leading-relaxed"
                style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontStyle: 'italic' }}
              >
                "{current.quote}"
              </p>
              <div className="mt-8 flex flex-col items-center gap-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C8D8F0]">
                  {current.author}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#7A8EAB]">
                  {current.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 flex items-center justify-center gap-12">
          <button
            onClick={() => paginate(-1)}
            className="font-mono text-[11px] tracking-[0.25em] text-[#7A8EAB] hover:text-[#B8960C] transition-colors duration-200"
          >
            {nav.prev}
          </button>

          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <div
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                style={{
                  width: i === index ? '20px' : '4px',
                  height: '4px',
                  borderRadius: '2px',
                  background: i === index ? '#B8960C' : 'rgba(200,216,240,0.2)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="font-mono text-[11px] tracking-[0.25em] text-[#7A8EAB] hover:text-[#B8960C] transition-colors duration-200"
          >
            {nav.next}
          </button>
        </div>

        <div className="mt-16 pt-10 border-t border-[#1A2744] relative z-50 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isComposing ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A8EAB] mb-3">
                  Worked with me?
                </p>
                <button
                  onClick={() => setIsComposing(true)}
                  className="inline-block px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#C8D8F0] hover:text-[#B8960C] transition-colors duration-200"
                >
                  Leave a note →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="w-full max-w-lg text-left"
              >
                <div className="space-y-4">
                  <textarea
                    autoFocus
                    required
                    rows="3"
                    placeholder="Your note..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full bg-transparent border border-[#1A2744] rounded-lg p-4 font-serif text-[#EEF2F9] placeholder:text-[#1A2744] focus:border-[#B8960C] focus:outline-none transition-colors resize-none"
                    style={{ fontSize: '1.2rem', fontStyle: 'italic' }}
                  />
                  <div className="flex gap-4">
                    <input
                      required
                      type="text"
                      placeholder="Name"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="flex-1 bg-transparent border border-[#1A2744] rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8D8F0] placeholder:text-[#1A2744] focus:border-[#B8960C] focus:outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Role (Optional)"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="flex-1 bg-transparent border border-[#1A2744] rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8D8F0] placeholder:text-[#1A2744] focus:border-[#B8960C] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8EAB] hover:text-[#EEF2F9] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1A2744] hover:bg-[#B8960C] text-[#EEF2F9] hover:text-[#050A18] px-6 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    Sign & Attach
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ReviewsPage;
