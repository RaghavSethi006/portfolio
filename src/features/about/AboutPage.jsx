import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { bio } from '../../data/profile';

const AboutPage = () => {
    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* ===== HOLOGRAPHIC AVATAR SECTION ===== */}
                <motion.div
                    className="flex justify-center mb-8 lg:mb-0"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                >
                    <div className="relative">
                        {/* Main avatar container with glassmorphism */}
                        <div
                            className="w-64 h-64 md:w-80 md:h-80 rounded-full relative overflow-hidden backdrop-blur-md"
                            style={{
                                background: 'rgba(6, 182, 212, 0.1)',
                                border: '2px solid rgba(6, 182, 212, 0.3)',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)',
                            }}
                        >
                            {/* Avatar content */}
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-300/10 via-blue-500/10 to-cyan-300/10">
                                <User className="w-24 h-24 md:w-32 md:h-32 text-cyan-300" />
                            </div>

                            {/* Rotating holographic rings */}
                            <motion.div
                                className="absolute inset-2 sm:inset-4 rounded-full border border-cyan-400/40"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute inset-6 sm:inset-8 rounded-full border border-blue-400/30"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Scanning effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>

                        {/* Floating data points around avatar */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                                style={{
                                    top: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                                    left: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                                }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* ===== CONTENT SECTION WITH HUD FRAMING ===== */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="w-full"
                >
                    {/* HUD-style frame around content */}
                    <div
                        className="relative p-6 md:p-8 rounded-2xl backdrop-blur-md"
                        style={{
                            background: 'rgba(2, 6, 23, 0.4)',
                            border: '1px solid rgba(6, 182, 212, 0.2)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60" />

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <span className="text-gray-300">Hello, I'm </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                                {bio.name}
                            </span>
                        </motion.h1>

                        <motion.h2
                            className="text-xl sm:text-2xl text-cyan-400 mb-6 md:mb-8 font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {bio.title}
                        </motion.h2>

                        <motion.p
                            className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            {bio.description}
                        </motion.p>

                        {/* ===== HOLOGRAPHIC SKILLS DISPLAY ===== */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
                            {bio.highlights.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    className="relative group"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div
                                        className="px-4 py-2 sm:py-3 rounded-lg backdrop-blur-sm border transition-all duration-300"
                                        style={{
                                            background: 'rgba(6, 182, 212, 0.1)',
                                            border: '1px solid rgba(6, 182, 212, 0.3)',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <span className="text-cyan-300 text-sm sm:text-base font-medium">{skill}</span>
                                        {/* Skill level indicator */}
                                        <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.random() * 40 + 60}%` }}
                                                transition={{ delay: 1.6 + index * 0.1, duration: 1 }}
                                            />
                                        </div>
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 rounded-lg bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Status indicator */}
                        <motion.div
                            className="flex items-center space-x-3 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                        >
                            <div className="flex items-center space-x-2">
                                <motion.div
                                    className="w-3 h-3 bg-green-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.7, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />
                                <span className="text-gray-400">Available for projects</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutPage;
