import React from 'react';
import { motion } from 'framer-motion';

const HolographicBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base gradient with depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900" />

            {/* Animated grid layers */}
            <div className="absolute inset-0 opacity-15">
                <motion.div
                    className="h-full w-full"
                    animate={{
                        backgroundPosition: ['0px 0px', '100px 100px'],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Secondary grid with different timing */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    className="h-full w-full"
                    animate={{
                        backgroundPosition: ['0px 0px', '-80px -80px'],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 2
                    }}
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '120px 120px',
                    }}
                />
            </div>

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at center, transparent, rgba(30, 58, 138, 0.2), rgba(2, 6, 23, 0.6))'
            }} />
        </div>
    );
};

export default HolographicBackground;
