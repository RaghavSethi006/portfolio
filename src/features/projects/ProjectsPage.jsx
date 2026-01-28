import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { loadProjectsData } from '../../utils/excelLoader';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await loadProjectsData();
                setProjects(data);
            } catch (error) {
                console.error("Failed to load projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }
    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
        >
            {/* ===== SECTION HEADER WITH HUD STYLING ===== */}
            <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <div className="relative inline-block px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
                        Projects Archive
                    </h1>
                    {/* Decorative HUD elements - Responsive sizing */}
                    <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 border-l-2 border-t-2 border-cyan-400/60" />
                    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-8 sm:h-8 border-r-2 border-t-2 border-cyan-400/60" />
                    <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 border-l-2 border-b-2 border-cyan-400/60" />
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-4 h-4 sm:w-8 sm:h-8 border-r-2 border-b-2 border-cyan-400/60" />
                </div>

                <motion.div
                    className="w-24 md:w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
            </motion.div>

            {/* ===== PROJECTS GRID ===== */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="group relative"
                        initial={{ opacity: 0, y: 50, rotateX: -15 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        whileHover={{
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                        }}
                    >
                        {/* Project card with advanced glassmorphism */}
                        <div
                            className="relative h-full p-5 sm:p-6 rounded-2xl backdrop-blur-md border transition-all duration-500 group-hover:shadow-2xl overflow-hidden flex flex-col"
                            style={{
                                background: project.featured
                                    ? 'rgba(6, 182, 212, 0.15)'
                                    : 'rgba(2, 6, 23, 0.6)',
                                border: project.featured
                                    ? '1px solid rgba(6, 182, 212, 0.4)'
                                    : '1px solid rgba(6, 182, 212, 0.2)',
                                boxShadow: project.featured
                                    ? '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(6, 182, 212, 0.2)'
                                    : '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            {/* Featured project indicator */}
                            {project.featured && (
                                <motion.div
                                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold"
                                    style={{
                                        background: 'rgba(34, 211, 238, 0.2)',
                                        border: '1px solid rgba(34, 211, 238, 0.4)',
                                        color: 'rgb(34, 211, 238)',
                                    }}
                                    animate={{
                                        boxShadow: [
                                            '0 0 10px rgba(34, 211, 238, 0.3)',
                                            '0 0 20px rgba(34, 211, 238, 0.5)',
                                            '0 0 10px rgba(34, 211, 238, 0.3)',
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    FEATURED
                                </motion.div>
                            )}

                            {/* Status and progress */}
                            <div className="flex justify-between items-start mb-4 sm:mb-6">
                                <span
                                    className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border ${project.status === 'Completed'
                                        ? 'bg-green-500/20 text-green-300 border-green-500/40'
                                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                                        }`}
                                >
                                    {project.status}
                                </span>

                                {/* Progress indicator */}
                                <div className="text-right">
                                    <div className="text-[10px] sm:text-xs text-gray-400 mb-1">{project.progress}%</div>
                                    <div className="w-12 sm:w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress}%` }}
                                            transition={{ delay: 0.5 + index * 0.2, duration: 1.5, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                                {project.description}
                            </p>

                            {/* Tech stack with holographic styling */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech) => (
                                    <motion.span
                                        key={tech}
                                        className="px-3 py-1 rounded-md text-xs backdrop-blur-sm"
                                        style={{
                                            background: 'rgba(6, 182, 212, 0.15)',
                                            border: '1px solid rgba(6, 182, 212, 0.3)',
                                            color: 'rgb(6, 182, 212)',
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Action buttons with enhanced styling */}
                            <div className="flex space-x-3">
                                <motion.a
                                    href={project.github}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300"
                                    style={{
                                        background: 'rgba(75, 85, 99, 0.3)',
                                        border: '1px solid rgba(75, 85, 99, 0.5)',
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: '0 0 20px rgba(75, 85, 99, 0.4)',
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Github className="w-4 h-4" />
                                    <span className="text-sm">Code</span>
                                </motion.a>

                                <motion.a
                                    href={project.demo}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300"
                                    style={{
                                        background: 'rgba(6, 182, 212, 0.2)',
                                        border: '1px solid rgba(6, 182, 212, 0.4)',
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span className="text-sm">Demo</span>
                                </motion.a>
                            </div>

                            {/* Holographic scan effect on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                        </div>

                        {/* External glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                    </motion.div>
                ))}
            </div>

            {/* ===== GITHUB INTEGRATION HINT ===== */}
            <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div
                    className="inline-block px-6 py-4 rounded-lg backdrop-blur-sm"
                    style={{
                        background: 'rgba(2, 6, 23, 0.4)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                    }}
                >
                    <p className="text-gray-400 text-sm mb-2">
                        💡 <span className="text-cyan-400">Pro Tip:</span> Integrate with GitHub API for automatic repository updates
                    </p>
                    <code className="text-xs text-cyan-300 bg-black/50 px-2 py-1 rounded">
                        fetch('https://api.github.com/users/yourusername/repos')
                    </code>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectsPage;
