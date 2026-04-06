import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, Shield } from 'lucide-react';

const ReviewsPage = ({ reviews, setReviews }) => {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    review: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.review) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newReview = {
      id: Date.now(),
      ...reviewForm,
      date: new Date().toLocaleDateString(),
      verified: Math.random() > 0.5,
    };

    setReviews([newReview, ...reviews]);
    setReviewForm({ name: '', review: '', rating: 5 });
    setIsSubmitting(false);
  };

  return (
    <section className="py-20" id="reviews">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-4">Testimonials</p>
          <h2 className="text-4xl font-serif text-[#EEF2F9] sm:text-5xl">Client Reviews</h2>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl border border-[#1A2744] bg-[#0B1428] p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-1 rounded-full bg-[#B8960C]" />
              <h3 className="text-2xl font-serif text-[#EEF2F9]">Share a Review</h3>
            </div>
            <form className="space-y-6" onSubmit={handleSubmitReview}>
              <div>
                <label className="block text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-3">Name</label>
                <input
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full rounded-xl border border-[#1E2D4D] bg-[#0E1A34] px-4 py-3 text-sm text-[#EEF2F9] outline-none transition focus:border-[#B8960C]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-3">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="rounded-full p-3 transition hover:scale-105"
                    >
                      <Star
                        className={star <= reviewForm.rating ? 'h-6 w-6 text-[#F5C451]' : 'h-6 w-6 text-[#4A5568]'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-3">Review</label>
                <textarea
                  value={reviewForm.review}
                  onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                  rows={5}
                  className="w-full rounded-[24px] border border-[#1E2D4D] bg-[#0E1A34] px-4 py-3 text-sm text-[#EEF2F9] outline-none transition focus:border-[#B8960C] resize-none"
                  placeholder="Share your experience working with me..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !reviewForm.name || !reviewForm.review}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#B8960C] px-6 py-3 text-sm uppercase tracking-[0.35em] text-[#0B1428] transition disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            {reviews.length === 0 ? (
              <div className="rounded-xl border border-[#1A2744] bg-[#0B1428] p-8 text-center text-[#7A8EAB]">
                <p className="text-sm">No reviews yet.</p>
                <p className="mt-3 text-[#CED9EB]">Be the first to share your experience.</p>
              </div>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-[#1A2744] bg-[#0B1428] p-8 shadow-[0_0_40px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7]">{review.name}</p>
                      <p className="mt-2 text-[#EEF2F9]">{review.review}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={star <= review.rating ? 'h-4 w-4 text-[#F5C451]' : 'h-4 w-4 text-[#4A5568]'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[#7A8EAB]">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#A7B5D1]">
                    <Shield className="h-4 w-4 text-[#7ED8A1]" />
                    <span>{review.verified ? 'Verified client' : 'Verified completion'}</span>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;
