import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitTestimonial } from '../../utils/googleSheet';

const RELATIONSHIP_OPTIONS = ['Colleague', 'Manager', 'Client', 'Collaborator', 'Other'];

const chessNav = [
  { prev: '← Qb6', next: 'Nf3 →' },
  { prev: '← d4',  next: 'Bc4 →' },
  { prev: '← Bb5', next: 'O-O →' },
  { prev: '← c4',  next: 'e5 →' },
  { prev: '← Nd2', next: 'O-O-O →' },
];

const ReviewsPage = ({ reviews }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isComposing, setIsComposing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    role: '',
    company: '',
    linkedin: '',
    relationship: '',
    relationshipOther: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const current = reviews[index] || reviews[0];
  const nav = chessNav[index % chessNav.length];

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.quote.trim() || !formData.author.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      ...formData,
      relationship: formData.relationship === 'Other' ? formData.relationshipOther : formData.relationship,
    };

    const result = await submitTestimonial(payload);

    if (result.success) {
      setSubmitted(true);
      setFormData({ quote: '', author: '', role: '', company: '', linkedin: '', relationship: '', relationshipOther: '' });
    } else {
      setSubmitError(result.error || 'Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  };

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  };

  return (
    <section className="py-28 bg-[#050A18]">
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
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-8 flex flex-col items-center gap-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#C8D8F0]">
                  {current.author}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#7A8EAB]">
                  {[current.role, current.company].filter(Boolean).join(', ')}
                </span>
                {current.relationship && (
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8960C] mt-1">
                    {current.relationship}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 flex items-center justify-center gap-12">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="font-mono text-[11px] tracking-[0.25em] text-[#7A8EAB] hover:text-[#B8960C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18] rounded px-1"
          >
            {nav.prev}
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Testimonial pagination">
            {reviews.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18]"
                style={{
                  width: i === index ? '20px' : '4px',
                  height: '4px',
                  borderRadius: '2px',
                  background: i === index ? '#B8960C' : 'rgba(200,216,240,0.2)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="font-mono text-[11px] tracking-[0.25em] text-[#7A8EAB] hover:text-[#B8960C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18] rounded px-1"
          >
            {nav.next}
          </button>
        </div>

        <div className="mt-16 pt-10 border-t border-[#1A2744] relative z-50 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-serif text-[#EEF2F9] text-lg italic">
                  Thank you for your note.
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A8EAB] mt-2">
                  It will appear here once reviewed.
                </p>
              </motion.div>
            ) : !isComposing ? (
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
                  onClick={() => { setSubmitted(false); setIsComposing(true); }}
                  className="inline-block px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#C8D8F0] hover:text-[#B8960C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18] rounded"
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
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="flex-1 bg-transparent border border-[#1A2744] rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8D8F0] placeholder:text-[#1A2744] focus:border-[#B8960C] focus:outline-none transition-colors"
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn URL (Optional)"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="flex-1 bg-transparent border border-[#1A2744] rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8D8F0] placeholder:text-[#1A2744] focus:border-[#B8960C] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="w-full bg-transparent border border-[#1A2744] rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8D8F0] focus:border-[#B8960C] focus:outline-none transition-colors appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%237A8EAB' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
                    >
                      <option value="" disabled className="bg-[#050A18]">Relationship (Optional)</option>
                      {RELATIONSHIP_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#050A18]">{opt}</option>
                      ))}
                    </select>
                    {formData.relationship === 'Other' && (
                      <input
                        type="text"
                        placeholder="Specify relationship"
                        value={formData.relationshipOther}
                        onChange={(e) => setFormData({ ...formData, relationshipOther: e.target.value })}
                        className="mt-2 w-full bg-transparent border border-[#1A2744] rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8D8F0] placeholder:text-[#1A2744] focus:border-[#B8960C] focus:outline-none transition-colors"
                      />
                    )}
                  </div>
                </div>

                {submitError && (
                  <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-red-400">{submitError}</p>
                )}

                <div className="mt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8EAB] hover:text-[#EEF2F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18] rounded px-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1A2744] hover:bg-[#B8960C] text-[#EEF2F9] hover:text-[#050A18] px-6 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18]"
                  >
                    {isSubmitting ? 'Sending...' : 'Sign & Attach'}
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

export default React.memo(ReviewsPage);
