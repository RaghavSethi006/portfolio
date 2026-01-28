import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { loadResumeData } from '../../utils/excelLoader';

const ResumePage = () => {
    const [profileData, setProfileData] = useState({ experience: [], education: {}, skills: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const data = await loadResumeData();
                setProfileData(data);
            } catch (error) {
                console.error("Failed to load resume data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResumeData();
    }, []);

    const { experience, education, skills } = profileData;

    const handleDownloadResume = () => {
        // TODO: Replace with your actual resume PDF path
        const link = document.createElement('a');
        link.href = './src/RESUME.pdf';
        link.download = 'RaghavSethi-Resume.pdf';
        link.click();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
        >
            {/* ===== HEADER WITH DOWNLOAD BUTTON ===== */}
            <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-6 md:mb-8">
                    Professional Resume
                </h1>

                <motion.button
                    onClick={handleDownloadResume}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl backdrop-blur-md overflow-hidden"
                    style={{
                        background: 'rgba(6, 182, 212, 0.2)',
                        border: '2px solid rgba(6, 182, 212, 0.4)',
                    }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex items-center space-x-3 relative z-10">
                        <Download className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
                        <span className="text-cyan-300 font-semibold text-base sm:text-lg">Download Resume</span>
                    </div>

                    {/* Animated background effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                    />
                </motion.button>
            </motion.div>

            <div className="space-y-12 md:space-y-16">
                {/* ===== EXPERIENCE SECTION WITH TIMELINE ===== */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <div className="flex items-center mb-6 md:mb-8">
                        <motion.div
                            className="w-1.5 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-cyan-400 to-blue-500 mr-4 sm:mr-6 rounded-full"
                            animate={{
                                boxShadow: [
                                    '0 0 10px rgba(6, 182, 212, 0.5)',
                                    '0 0 20px rgba(6, 182, 212, 0.8)',
                                    '0 0 10px rgba(6, 182, 212, 0.5)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300">Experience</h2>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-transparent" />

                        <div className="space-y-6 sm:space-y-8">
                            {experience.map((job, index) => (
                                <motion.div
                                    key={index}
                                    className="relative pl-10 sm:pl-16"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + index * 0.2 }}
                                >
                                    {/* Timeline node */}
                                    <motion.div
                                        className="absolute left-[0.875rem] sm:left-6 top-4 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-cyan-400"
                                        style={{ background: 'rgba(6, 182, 212, 0.3)' }}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            boxShadow: [
                                                '0 0 0 0 rgba(6, 182, 212, 0.7)',
                                                '0 0 0 10px rgba(6, 182, 212, 0)',
                                                '0 0 0 0 rgba(6, 182, 212, 0)'
                                            ],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                    />

                                    <div
                                        className="p-5 sm:p-6 rounded-xl backdrop-blur-md border"
                                        style={{
                                            background: 'rgba(2, 6, 23, 0.4)',
                                            border: '1px solid rgba(6, 182, 212, 0.2)',
                                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{job.title}</h3>
                                        <p className="text-cyan-400 text-sm sm:text-base mb-4 flex flex-wrap items-center">
                                            <span>{job.company}</span>
                                            <span className="mx-2 hidden sm:inline">•</span>
                                            <span className="text-gray-400 w-full sm:w-auto mt-1 sm:mt-0">{job.period}</span>
                                        </p>
                                        <p className="text-gray-300 text-sm sm:text-base mb-4">{job.description}</p>

                                        {/* Achievements list */}
                                        <div className="space-y-2">
                                            {job.achievements.map((achievement, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex items-start text-xs sm:text-sm text-gray-400"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                                                >
                                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                                                    <span>{achievement}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ===== EDUCATION SECTION ===== */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <div className="flex items-center mb-6 md:mb-8">
                        <motion.div
                            className="w-1.5 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-blue-400 to-cyan-500 mr-4 sm:mr-6 rounded-full"
                            animate={{
                                boxShadow: [
                                    '0 0 10px rgba(59, 130, 246, 0.5)',
                                    '0 0 20px rgba(59, 130, 246, 0.8)',
                                    '0 0 10px rgba(59, 130, 246, 0.5)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300">Education</h2>
                    </div>

                    <div
                        className="p-6 md:p-8 rounded-xl backdrop-blur-md border"
                        style={{
                            background: 'rgba(2, 6, 23, 0.4)',
                            border: '1px solid rgba(6, 182, 212, 0.2)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{education.degree}</h3>
                        <p className="text-cyan-300 sm:text-cyan-400 text-sm sm:text-base mb-4">{education.school} • {education.period}</p>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {education.description}
                        </p>
                    </div>
                </motion.div>

                {/* ===== SKILLS SECTION WITH INTERACTIVE METERS ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <div className="flex items-center mb-6 md:mb-8">
                        <motion.div
                            className="w-1.5 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-green-400 to-cyan-500 mr-4 sm:mr-6 rounded-full"
                            animate={{
                                boxShadow: [
                                    '0 0 10px rgba(34, 197, 94, 0.5)',
                                    '0 0 20px rgba(34, 197, 94, 0.8)',
                                    '0 0 10px rgba(34, 197, 94, 0.5)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                        />
                        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300">Technical Skills</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {skills.map((skillGroup, groupIndex) => (
                            <motion.div
                                key={skillGroup.category}
                                className="p-6 rounded-xl backdrop-blur-md border"
                                style={{
                                    background: 'rgba(2, 6, 23, 0.4)',
                                    border: '1px solid rgba(6, 182, 212, 0.2)',
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 + groupIndex * 0.2 }}
                            >
                                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-6">{skillGroup.category}</h3>
                                <div className="space-y-4">
                                    {skillGroup.skills.map((skill, skillIndex) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-300 text-sm sm:text-base font-medium">{skill.name}</span>
                                                <span className="text-cyan-400 text-xs sm:text-sm font-bold">{skill.level}%</span>
                                            </div>
                                            <div className="h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden relative">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{
                                                        delay: 1.6 + groupIndex * 0.2 + skillIndex * 0.1,
                                                        duration: 1.5,
                                                        ease: 'easeOut'
                                                    }}
                                                >
                                                    {/* Glowing effect */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-white/30"
                                                        animate={{
                                                            x: ['-100%', '100%'],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: 'linear',
                                                            delay: 2 + groupIndex * 0.3 + skillIndex * 0.2,
                                                        }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ResumePage;
