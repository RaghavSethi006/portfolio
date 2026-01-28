import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const FloatingAIAssistant = ({ currentPage }) => {
    const [position, setPosition] = useState({ x: 85, y: 20 });
    const [isMoving, setIsMoving] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');

    // Enhanced page descriptions with personality
    const pageMessages = {
        about: "Analyzing user profile... Personal data successfully loaded. Welcome to my creator's digital workspace.",
        projects: "Scanning project archives... Multiple innovative solutions detected. Impressive development portfolio confirmed.",
        resume: "Accessing professional credentials database... Career trajectory analysis complete. Highly qualified individual detected.",
        reviews: "Client feedback terminal active... Reputation management system online. Your input is valuable data."
    };

    // Update message when page changes
    useEffect(() => {
        setIsGlitching(true);
        setTimeout(() => {
            setCurrentMessage(pageMessages[currentPage]);
            setIsGlitching(false);
        }, 300);
    }, [currentPage]);

    // Enhanced movement pattern
    useEffect(() => {
        const moveRandomly = () => {
            if (!isMoving) {
                setIsMoving(true);
                const newX = Math.random() * 70 + 15; // 15-85% of screen width
                const newY = Math.random() * 60 + 20; // 20-80% of screen height
                setPosition({ x: newX, y: newY });

                setTimeout(() => setIsMoving(false), 4000);
            }
        };

        const interval = setInterval(moveRandomly, 10000);
        return () => clearInterval(interval);
    }, [isMoving]);

    return (
        <motion.div
            className="fixed z-40 pointer-events-none"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
            }}
            animate={{
                x: isMoving ? 0 : [-8, 8, -8],
                y: isMoving ? 0 : [-4, 4, -4],
            }}
            transition={{
                x: {
                    duration: isMoving ? 3 : 6,
                    ease: isMoving ? "easeInOut" : "easeInOut",
                    repeat: isMoving ? 0 : Infinity
                },
                y: {
                    duration: isMoving ? 3 : 4,
                    ease: isMoving ? "easeInOut" : "easeInOut",
                    repeat: isMoving ? 0 : Infinity,
                    delay: 0.5
                },
            }}
        >
            <div className="relative">
                {/* Enhanced AI Assistant Avatar */}
                <motion.div
                    className="relative"
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: isGlitching ? [0, 2, -2, 0] : [0, 3, -3, 0],
                    }}
                    transition={{
                        scale: { duration: 3, repeat: Infinity },
                        rotate: { duration: isGlitching ? 0.2 : 8, repeat: Infinity },
                    }}
                >
                    {/* Outer energy rings */}
                    <motion.div
                        className="absolute inset-0 w-20 h-20 rounded-full border border-cyan-400/30"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                            scale: { duration: 4, repeat: Infinity },
                        }}
                    />
                    <motion.div
                        className="absolute inset-2 w-16 h-16 rounded-full border border-blue-400/20"
                        animate={{
                            rotate: -360,
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                            scale: { duration: 3, repeat: Infinity, delay: 1 },
                        }}
                    />

                    {/* Main holographic avatar */}
                    <div
                        className="relative w-20 h-20 rounded-full backdrop-blur-md border-2 flex items-center justify-center overflow-hidden"
                        style={{
                            background: 'rgba(6, 182, 212, 0.15)',
                            border: '2px solid rgba(6, 182, 212, 0.6)',
                            boxShadow: '0 0 30px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)',
                        }}
                    >
                        <motion.div
                            animate={{
                                opacity: isGlitching ? [1, 0.3, 1, 0.7, 1] : 1,
                                scale: isGlitching ? [1, 0.9, 1.1, 1] : 1,
                            }}
                            transition={{
                                duration: isGlitching ? 0.5 : 0,
                            }}
                        >
                            <Cpu className="w-10 h-10 text-cyan-300" />
                        </motion.div>

                        {/* Holographic scan lines */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.3) 50%, transparent 70%)',
                            }}
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />

                        {/* Glitch overlay when speaking */}
                        {isGlitching && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-cyan-500/20"
                                animate={{
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 0.1,
                                    repeat: 3,
                                }}
                            />
                        )}
                    </div>

                    {/* Floating data particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            style={{
                                left: `${50 + 35 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                                top: `${50 + 35 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                            }}
                            animate={{
                                scale: [0.5, 1.5, 0.5],
                                opacity: [0.3, 1, 0.3],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </motion.div>

                {/* Enhanced Speech Bubble */}
                <motion.div
                    className="absolute -top-20 left-24 max-w-xs pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1 }}
                >
                    <div
                        className="px-4 py-3 rounded-xl backdrop-blur-md border relative overflow-hidden"
                        style={{
                            background: 'rgba(2, 6, 23, 0.9)',
                            border: '1px solid rgba(6, 182, 212, 0.4)',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)',
                        }}
                    >
                        {/* Message text with glitch effect */}
                        <motion.p
                            className="text-cyan-300 text-sm leading-relaxed"
                            animate={{
                                opacity: isGlitching ? [1, 0.7, 1] : 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        >
                            {currentMessage}
                        </motion.p>

                        {/* Speech bubble pointer */}
                        <div
                            className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 border-r border-b"
                            style={{
                                background: 'rgba(2, 6, 23, 0.9)',
                                borderColor: 'rgba(6, 182, 212, 0.4)',
                            }}
                        />

                        {/* Scanning animation */}
                        <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: 2,
                            }}
                        />
                    </div>
                </motion.div>

                {/* Status indicator */}
                <motion.div
                    className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-green-400 flex items-center justify-center"
                    style={{
                        background: 'rgba(34, 197, 94, 0.2)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                            '0 0 10px rgba(34, 197, 94, 0.5)',
                            '0 0 20px rgba(34, 197, 94, 0.8)',
                            '0 0 10px rgba(34, 197, 94, 0.5)',
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FloatingAIAssistant;
