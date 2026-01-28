import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ParticleSystem = () => {
    const [particles, setParticles] = useState([]);
    const [bursts, setBursts] = useState([]);

    useEffect(() => {
        // Generate initial particles
        const initialParticles = Array.from({ length: 60 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.2,
        }));
        setParticles(initialParticles);

        // Generate periodic light bursts
        const burstInterval = setInterval(() => {
            const newBurst = {
                id: Date.now(),
                x: Math.random() * 100,
                y: Math.random() * 100,
            };
            setBursts(prev => [...prev.slice(-2), newBurst]);
        }, 3000);

        return () => clearInterval(burstInterval);
    }, []);

    return (
        <div className="fixed inset-0 z-1 pointer-events-none">
            {/* Standard floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-cyan-400"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        x: [0, Math.random() * 200 - 100],
                        y: [0, Math.random() * 200 - 100],
                        opacity: [particle.opacity, 0, particle.opacity],
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Light burst effects */}
            {bursts.map((burst) => (
                <motion.div
                    key={burst.id}
                    className="absolute"
                    style={{
                        left: `${burst.x}%`,
                        top: `${burst.y}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 2 }}
                >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/40 to-cyan-400/20 blur-xl" />
                </motion.div>
            ))}
        </div>
    );
};

export default ParticleSystem;
