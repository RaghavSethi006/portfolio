import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { socialLinks } from '../../data/profile';

const Footer = () => {
    return (
        <motion.footer
            className="relative z-20 mt-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            <div
                className="backdrop-blur-md border-t"
                style={{
                    background: 'rgba(2, 6, 23, 0.8)',
                    borderTop: '1px solid rgba(6, 182, 212, 0.2)',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        {/* Logo Section */}
                        <div>
                            <motion.div
                                className="text-2xl font-bold text-cyan-300 mb-2"
                                whileHover={{
                                    textShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                                    scale: 1.05
                                }}
                            >
                                J.A.R.V.I.S.
                            </motion.div>
                            <p className="text-gray-400 text-sm">
                                Just A Rather Very Intelligent System
                            </p>
                        </div>

                        {/* Copyright */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                © 2024 J.A.R.V.I.S. Portfolio • Built with React & Tailwind CSS
                            </p>
                            <motion.div
                                className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2"
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center md:justify-end space-x-6">
                            <motion.a
                                href={socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg backdrop-blur-sm border transition-all duration-300"
                                style={{
                                    background: 'rgba(75, 85, 99, 0.2)',
                                    border: '1px solid rgba(75, 85, 99, 0.3)',
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    borderColor: 'rgba(6, 182, 212, 0.6)',
                                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Github className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition-colors" />
                            </motion.a>

                            <motion.a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg backdrop-blur-sm border transition-all duration-300"
                                style={{
                                    background: 'rgba(59, 130, 246, 0.2)',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: -5,
                                    borderColor: 'rgba(59, 130, 246, 0.6)',
                                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
