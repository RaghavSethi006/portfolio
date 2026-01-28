import React from 'react';
import { motion } from 'framer-motion';

const FloatingHexagons = () => {
    const hexagons = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotationSpeed: Math.random() * 2 + 1,
        floatSpeed: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 5,
    }));

    const HexagonSVG = ({ size, opacity }) => (
        <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
            <polygon
                points="50,2 90,25 90,75 50,98 10,75 10,25"
                fill="none"
                stroke="rgba(6, 182, 212, 0.4)"
                strokeWidth="1"
                style={{ opacity }}
            />
            <polygon
                points="50,15 80,30 80,70 50,85 20,70 20,30"
                fill="none"
                stroke="rgba(34, 211, 238, 0.2)"
                strokeWidth="0.5"
                style={{ opacity: opacity * 0.7 }}
            />
        </svg>
    );

    return (
        <div className="fixed inset-0 z-3 pointer-events-none">
            {hexagons.map((hex) => (
                <motion.div
                    key={hex.id}
                    className="absolute"
                    style={{
                        left: `${hex.x}%`,
                        top: `${hex.y}%`,
                    }}
                    animate={{
                        rotate: [0, 360],
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                    }}
                    transition={{
                        rotate: {
                            duration: hex.rotationSpeed * 10,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        y: {
                            duration: hex.floatSpeed,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: hex.delay,
                        },
                        x: {
                            duration: hex.floatSpeed * 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: hex.delay + 2,
                        },
                    }}
                >
                    <HexagonSVG size={hex.size} opacity={hex.opacity} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHexagons;
