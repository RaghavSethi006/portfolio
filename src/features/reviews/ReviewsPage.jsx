import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, Shield } from 'lucide-react';

const ReviewsPage = ({ reviews, setReviews }) => {
    const [reviewForm, setReviewForm] = useState({
        name: '',
        review: '',
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (reviewForm.name && reviewForm.review) {
            setIsSubmitting(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newReview = {
                id: Date.now(),
                ...reviewForm,
                date: new Date().toLocaleDateString(),
                verified: Math.random() > 0.5 // Random verification status
            };

            setReviews([newReview, ...reviews]);
            setReviewForm({ name: '', review: '', rating: 5 });
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
        >
            {/* ===== SECTION HEADER ===== */}
            <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
                    Client Reviews
                </h1>
                <motion.div
                    className="w-24 md:w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12">
                {/* ===== HOLOGRAPHIC REVIEW FORM ===== */}
                <motion.div
                    className="xl:col-span-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-6 sm:mb-8 flex items-center">
                        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
                        Leave a Review
                    </h2>

                    <div
                        className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-md border overflow-hidden"
                        style={{
                            background: 'rgba(2, 6, 23, 0.6)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {/* Corner HUD elements */}
                        <div className="absolute top-4 left-4 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-cyan-400/60" />
                        <div className="absolute top-4 right-4 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-cyan-400/60" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-cyan-400/60" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-cyan-400/60" />

                        <div className="space-y-4 sm:space-y-6 relative z-10">
                            {/* Name Input */}
                            <div>
                                <label className="block text-cyan-300 mb-2 sm:mb-3 text-sm sm:text-base font-medium">Name</label>
                                <motion.input
                                    type="text"
                                    value={reviewForm.name}
                                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                                    className="w-full px-4 py-2 sm:py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 focus:outline-none text-sm sm:text-base"
                                    style={{
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        border: '1px solid rgba(6, 182, 212, 0.3)',
                                        color: 'white',
                                    }}
                                    placeholder="Your name"
                                    whileFocus={{
                                        borderColor: 'rgba(6, 182, 212, 0.6)',
                                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
                                    }}
                                />
                            </div>

                            {/* Rating System */}
                            <div>
                                <label className="block text-cyan-300 mb-2 sm:mb-3 text-sm sm:text-base font-medium">Rating</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            className="transition-all duration-200"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Star
                                                className={`w-6 h-6 sm:w-8 sm:h-8 ${star <= reviewForm.rating
                                                    ? 'text-yellow-400 fill-current drop-shadow-glow'
                                                    : 'text-gray-500'
                                                    }`}
                                                style={{
                                                    filter: star <= reviewForm.rating
                                                        ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))'
                                                        : 'none'
                                                }}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Review Textarea */}
                            <div>
                                <label className="block text-cyan-300 mb-2 sm:mb-3 text-sm sm:text-base font-medium">Review</label>
                                <motion.textarea
                                    value={reviewForm.review}
                                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 sm:py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 focus:outline-none resize-none text-sm sm:text-base"
                                    style={{
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        border: '1px solid rgba(6, 182, 212, 0.3)',
                                        color: 'white',
                                    }}
                                    placeholder="Share your experience working with me..."
                                    whileFocus={{
                                        borderColor: 'rgba(6, 182, 212, 0.6)',
                                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                onClick={handleSubmitReview}
                                disabled={isSubmitting || !reviewForm.name || !reviewForm.review}
                                className="w-full px-6 py-3 sm:py-4 rounded-xl backdrop-blur-md border-2 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: 'rgba(6, 182, 212, 0.2)',
                                    border: '2px solid rgba(6, 182, 212, 0.4)',
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-center space-x-3 relative z-10">
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-300 border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            />
                                            <span className="text-cyan-300 font-semibold text-sm sm:text-base">Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                                            <span className="text-cyan-300 font-semibold text-sm sm:text-base">Submit Review</span>
                                        </>
                                    )}
                                </div>

                                {/* Animated background effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.button>
                        </div>

                        {/* Form scanning animation */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </div>
                </motion.div>

                {/* ===== REVIEWS DISPLAY ===== */}
                <motion.div
                    className="xl:col-span-3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-6 sm:mb-8 flex items-center">
                        <Star className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-yellow-400" />
                        Recent Reviews
                    </h2>

                    <div className="space-y-6 lg:max-h-[600px] lg:overflow-y-auto pr-0 lg:pr-4 custom-scrollbar">
                        {reviews.length === 0 ? (
                            <motion.div
                                className="text-center py-12 md:py-16"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div
                                    className="inline-block p-8 md:p-12 rounded-2xl backdrop-blur-md border"
                                    style={{
                                        background: 'rgba(2, 6, 23, 0.4)',
                                        border: '1px solid rgba(6, 182, 212, 0.2)',
                                    }}
                                >
                                    <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-lg md:text-xl text-gray-400 mb-2">No reviews yet</h3>
                                    <p className="text-sm md:text-base text-gray-500">Be the first to share your experience!</p>
                                </div>
                            </motion.div>
                        ) : (
                            reviews.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    className="relative group"
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div
                                        className="p-6 rounded-xl backdrop-blur-md border transition-all duration-300 group-hover:border-cyan-400/40"
                                        style={{
                                            background: 'rgba(2, 6, 23, 0.4)',
                                            border: '1px solid rgba(6, 182, 212, 0.2)',
                                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <h4 className="font-bold text-white text-lg">{review.name}</h4>
                                                {review.verified && (
                                                    <motion.div
                                                        className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs"
                                                        style={{
                                                            background: 'rgba(34, 197, 94, 0.2)',
                                                            border: '1px solid rgba(34, 197, 94, 0.4)',
                                                        }}
                                                        animate={{
                                                            boxShadow: [
                                                                '0 0 10px rgba(34, 197, 94, 0.3)',
                                                                '0 0 20px rgba(34, 197, 94, 0.5)',
                                                                '0 0 10px rgba(34, 197, 94, 0.3)',
                                                            ],
                                                        }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        <Shield className="w-3 h-3 text-green-300" />
                                                        <span className="text-green-300 font-medium">Verified</span>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= review.rating
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-500'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-gray-400 text-sm">{review.date}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 leading-relaxed">{review.review}</p>

                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 rounded-xl bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ReviewsPage;
