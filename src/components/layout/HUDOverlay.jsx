import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HUDOverlay = () => {
    const [systemTime, setSystemTime] = useState(new Date());
    const [systemStatus] = useState('ONLINE');
    const [cpuUsage] = useState(Math.floor(Math.random() * 30) + 45);
    const [memoryUsage] = useState(Math.floor(Math.random() * 40) + 35);

    useEffect(() => {
        const timer = setInterval(() => {
            setSystemTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-10 pointer-events-none">
            {/* Top-left system status */}
            <motion.div
                className="absolute top-20 left-4 space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <div
                    className="px-3 py-2 rounded-lg backdrop-blur-md text-xs font-mono"
                    style={{
                        background: 'rgba(2, 6, 23, 0.7)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}
                >
                    <div className="text-green-400">SYS: {systemStatus}</div>
                    <div className="text-cyan-300">TIME: {systemTime.toLocaleTimeString()}</div>
                </div>

                <div
                    className="px-3 py-2 rounded-lg backdrop-blur-md text-xs font-mono"
                    style={{
                        background: 'rgba(2, 6, 23, 0.7)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}
                >
                    <div className="text-yellow-400">CPU: {cpuUsage}%</div>
                    <div className="text-blue-400">MEM: {memoryUsage}%</div>
                </div>
            </motion.div>

            {/* Bottom-right coordinates */}
            <motion.div
                className="absolute bottom-20 right-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
            >
                <div
                    className="px-3 py-2 rounded-lg backdrop-blur-md text-xs font-mono"
                    style={{
                        background: 'rgba(2, 6, 23, 0.7)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}
                >
                    <div className="text-cyan-300">LAT: 40.7128°N</div>
                    <div className="text-cyan-300">LON: 74.0060°W</div>
                </div>
            </motion.div>

            {/* Corner frame elements */}
            <motion.div
                className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.6 }}
            />
            <motion.div
                className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2, duration: 0.6 }}
            />
            <motion.div
                className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.4, duration: 0.6 }}
            />
            <motion.div
                className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.6, duration: 0.6 }}
            />
        </div>
    );
};

export default HUDOverlay;
