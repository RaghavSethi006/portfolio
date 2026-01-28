import React from 'react';
import { motion } from 'framer-motion';

const CircularHUD = () => {
    return (
        <div className="fixed inset-0 z-4 pointer-events-none">
            {/* Top-right radar sweep */}
            <div className="absolute top-10 right-10 w-32 h-32">
                <motion.div
                    className="relative w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="rgba(6, 182, 212, 0.3)"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50" cy="50" r="30"
                            fill="none"
                            stroke="rgba(6, 182, 212, 0.2)"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50" cy="50" r="15"
                            fill="none"
                            stroke="rgba(6, 182, 212, 0.4)"
                            strokeWidth="1"
                        />
                        <line
                            x1="50" y1="5" x2="50" y2="50"
                            stroke="rgba(34, 211, 238, 0.6)"
                            strokeWidth="1"
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Bottom-left targeting reticle */}
            <div className="absolute bottom-20 left-10 w-24 h-24">
                <motion.svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                >
                    <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.4)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />
                    <line x1="10" y1="50" x2="25" y2="50" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
                    <line x1="75" y1="50" x2="90" y2="50" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
                    <line x1="50" y1="10" x2="50" y2="25" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
                    <line x1="50" y1="75" x2="50" y2="90" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="3" fill="rgba(34, 211, 238, 0.8)" />
                </motion.svg>
            </div>
        </div>
    );
};

export default CircularHUD;
