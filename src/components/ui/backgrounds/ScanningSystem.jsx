import React from 'react';
import { motion } from 'framer-motion';

const ScanningSystem = () => {
    return (
        <div className="fixed inset-0 z-2 pointer-events-none">
            {/* Horizontal scan line */}
            <motion.div
                className="absolute left-0 right-0 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
                }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Vertical scan line */}
            <motion.div
                className="absolute top-0 bottom-0 w-px"
                style={{
                    background: 'linear-gradient(180deg, transparent, rgba(34, 211, 238, 0.6), transparent)',
                    boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)',
                }}
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 3,
                }}
            />

            {/* Diagonal scanning sweep */}
            <motion.div
                className="absolute w-full h-full"
                style={{
                    background: 'linear-gradient(45deg, transparent 48%, rgba(6, 182, 212, 0.1) 49%, rgba(6, 182, 212, 0.3) 50%, rgba(6, 182, 212, 0.1) 51%, transparent 52%)',
                }}
                animate={{
                    transform: ['translateX(-100%) translateY(-100%)', 'translateX(100%) translateY(100%)']
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 6,
                }}
            />
        </div>
    );
};

export default ScanningSystem;
