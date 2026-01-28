import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, FileText, MessageCircle } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, isLoading }) => {
    const navItems = [
        { id: 'about', label: 'About', icon: User },
        { id: 'projects', label: 'Projects', icon: Code },
        { id: 'resume', label: 'Resume', icon: FileText },
        { id: 'reviews', label: 'Reviews', icon: MessageCircle },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md"
            style={{
                background: 'rgba(2, 6, 23, 0.7)',
                borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* ===== LOGO WITH HUD FRAME ===== */}
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div
                            className="px-6 py-3 rounded-lg relative overflow-hidden"
                            style={{
                                background: 'rgba(6, 182, 212, 0.1)',
                                border: '1px solid rgba(6, 182, 212, 0.3)',
                                boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
                            }}
                        >
                            <span className="text-2xl font-bold text-cyan-300 relative z-10">
                                J.A.R.V.I.S.
                            </span>
                            {/* Animated border effect */}
                            <motion.div
                                className="absolute inset-0 rounded-lg"
                                style={{
                                    background: 'linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.2), transparent)',
                                }}
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

                    {/* ===== NAVIGATION ITEMS WITH GLASSMORPHISM ===== */}
                    <div className="flex space-x-2">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className="relative group"
                                    disabled={isLoading}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div
                                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 ${isActive
                                                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/60 text-cyan-300'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-white/10'
                                            }`}
                                        style={{
                                            border: '1px solid',
                                            boxShadow: isActive
                                                ? '0 0 20px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                                : '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                            layoutId="activeTab"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navigation;
