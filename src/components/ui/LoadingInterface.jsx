import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const LoadingInterface = () => {
    const [loadingText, setLoadingText] = useState('INITIALIZING');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const texts = ['INITIALIZING', 'SCANNING', 'LOADING', 'ALMOST READY'];
        let textIndex = 0;
        let progressValue = 0;

        const interval = setInterval(() => {
            if (textIndex < texts.length) {
                setLoadingText(texts[textIndex]);
                textIndex++;
            }
            if (progressValue < 100) {
                progressValue += 2;
                setProgress(progressValue);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="flex items-center justify-center min-h-[60vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="text-center">
                {/* Central loading animation */}
                <motion.div
                    className="w-32 h-32 mx-auto mb-8 relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="40"
                            fill="none"
                            stroke="rgba(6, 182, 212, 0.2)"
                            strokeWidth="1"
                        />
                        <circle
                            cx="50" cy="50" r="40"
                            fill="none"
                            stroke="rgba(6, 182, 212, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="60,40"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="50" cy="50" r="25"
                            fill="none"
                            stroke="rgba(34, 211, 238, 0.6)"
                            strokeWidth="1"
                            strokeDasharray="20,10"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="w-8 h-8 text-cyan-400" />
                    </div>
                </motion.div>

                {/* Loading text and progress */}
                <motion.h2
                    className="text-2xl font-bold text-cyan-300 mb-4"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    {loadingText}
                </motion.h2>

                {/* Progress bar */}
                <div className="w-64 h-1 mx-auto bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: 'easeOut' }}
                    />
                </div>

                <p className="text-gray-400 mt-2 text-sm">{progress}%</p>
            </div>
        </motion.div>
    );
};

export default LoadingInterface;
