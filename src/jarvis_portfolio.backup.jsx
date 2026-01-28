import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  User, 
  Code, 
  FileText, 
  Star, 
  Github, 
  Linkedin, 
  Download,
  ExternalLink,
  MessageCircle,
  Zap,
  Target,
  Cpu,
  Shield,
  Activity,
  Radar
} from 'lucide-react';

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const JarvisPortfolio = () => {
  const [currentPage, setCurrentPage] = useState('about');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Page transition handler with loading animation
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setIsLoading(false);
      }, 800);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-cyan-300 overflow-x-hidden relative">
      {/* ===== LAYERED BACKGROUND SYSTEM ===== */}
      <HolographicBackground />
      <ParticleSystem />
      <ScanningSystem />
      <FloatingHexagons />
      <CircularHUD />
      
      {/* ===== MAIN INTERFACE ===== */}
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={handlePageChange}
        isLoading={isLoading}
      />
      
      {/* ===== PAGE CONTENT WITH LOADING ===== */}
      <main className="relative z-20 pt-28">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingInterface key="loading" />
          ) : (
            <>
              {currentPage === 'about' && <AboutPage key="about" />}
              {currentPage === 'projects' && <ProjectsPage key="projects" />}
              {currentPage === 'resume' && <ResumePage key="resume" />}
              {currentPage === 'reviews' && <ReviewsPage key="reviews" reviews={reviews} setReviews={setReviews} />}
            </>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
      <FloatingAIAssistant currentPage={currentPage} />
      <HUDOverlay />
    </div>
  );
};

// ============================================================================
// ADVANCED HOLOGRAPHIC BACKGROUND SYSTEM
// ============================================================================
const HolographicBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900" />
      
      {/* Animated grid layers */}
      <div className="absolute inset-0 opacity-15">
        <motion.div 
          className="h-full w-full"
          animate={{ 
            backgroundPosition: ['0px 0px', '100px 100px'],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      {/* Secondary grid with different timing */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="h-full w-full"
          animate={{ 
            backgroundPosition: ['0px 0px', '-80px -80px'],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
      </div>
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at center, transparent, rgba(30, 58, 138, 0.2), rgba(2, 6, 23, 0.6))'
      }} />
    </div>
  );
};

// ============================================================================
// ENHANCED PARTICLE SYSTEM WITH BURSTS
// ============================================================================
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

// ============================================================================
// SCANNING SYSTEM WITH TRANSLUCENT LINES
// ============================================================================
const ScanningSystem = () => {
  return (
    <div className="fixed inset-0 z-2 pointer-events-none">
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(34, 211, 238, 0.6), transparent)',
          boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)',
        }}
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          delay: 3,
        }}
      />
      
      {/* Diagonal scanning sweep */}
      <motion.div
        className="absolute w-full h-full"
        style={{
          background: 'linear-gradient(45deg, transparent 48%, rgba(6, 182, 212, 0.1) 49%, rgba(6, 182, 212, 0.3) 50%, rgba(6, 182, 212, 0.1) 51%, transparent 52%)',
        }}
        animate={{
          transform: ['translateX(-100%) translateY(-100%)', 'translateX(100%) translateY(100%)']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 6,
        }}
      />
    </div>
  );
};

// ============================================================================
// FLOATING HEXAGONS WITH PARALLAX
// ============================================================================
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

// ============================================================================
// CIRCULAR HUD ELEMENTS
// ============================================================================
const CircularHUD = () => {
  return (
    <div className="fixed inset-0 z-4 pointer-events-none">
      {/* Top-right radar sweep */}
      <div className="absolute top-10 right-10 w-32 h-32">
        <motion.div
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="0.5"
            />
            <circle
              cx="50" cy="50" r="30"
              fill="none"
              stroke="rgba(6, 182, 212, 0.2)"
              strokeWidth="0.5"
            />
            <circle
              cx="50" cy="50" r="15"
              fill="none"
              stroke="rgba(6, 182, 212, 0.4)"
              strokeWidth="1"
            />
            <line
              x1="50" y1="5" x2="50" y2="50"
              stroke="rgba(34, 211, 238, 0.6)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Bottom-left targeting reticle */}
      <div className="absolute bottom-20 left-10 w-24 h-24">
        <motion.svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line x1="10" y1="50" x2="25" y2="50" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
          <line x1="75" y1="50" x2="90" y2="50" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="25" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
          <line x1="50" y1="75" x2="50" y2="90" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
          <circle cx="50" cy="50" r="3" fill="rgba(34, 211, 238, 0.8)" />
        </motion.svg>
      </div>
    </div>
  );
};

// ============================================================================
// GLASSMORPHIC NAVIGATION
// ============================================================================
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
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                      isActive 
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

// ============================================================================
// LOADING INTERFACE WITH SCANNING ANIMATION
// ============================================================================
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

// ============================================================================
// ENHANCED ABOUT PAGE WITH GLASSMORPHISM
// ============================================================================
const AboutPage = () => {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* ===== HOLOGRAPHIC AVATAR SECTION ===== */}
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        >
          <div className="relative">
            {/* Main avatar container with glassmorphism */}
            <div 
              className="w-80 h-80 rounded-full relative overflow-hidden backdrop-blur-md"
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '2px solid rgba(6, 182, 212, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)',
              }}
            >
              {/* Avatar content */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-300/10 via-blue-500/10 to-cyan-300/10">
                <User className="w-32 h-32 text-cyan-300" />
              </div>
              
              {/* Rotating holographic rings */}
              <motion.div
                className="absolute inset-4 rounded-full border border-cyan-400/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-blue-400/30"
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
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
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
        >
          {/* HUD-style frame around content */}
          <div 
            className="relative p-8 rounded-2xl backdrop-blur-md"
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
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-gray-300">Hello, I'm </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                {/* TODO: Replace with your name */}
                Raghav Sethi
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl text-cyan-400 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* TODO: Replace with your title */}
              App Developer & AI Enthusiast
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {/* TODO: Replace with your bio */}
              Welcome to my digital workspace. I’m a developer who enjoys working with web technologies
              and artificial intelligence. I focus on building practical, user-friendly solutions and
              am always looking for ways to learn and improve through my projects.
            </motion.p>
            
            {/* ===== HOLOGRAPHIC SKILLS DISPLAY ===== */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* TODO: Replace with your actual skills */}
              {['Python', 'N8N', 'React', 'AI/ML', 'Angular', 'SQL'].map((skill, index) => (
                <motion.div
                  key={skill}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div 
                    className="px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300"
                    style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <span className="text-cyan-300 font-medium">{skill}</span>
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

// ============================================================================
// ENHANCED PROJECTS PAGE WITH HOLOGRAPHIC CARDS
// ============================================================================
const ProjectsPage = () => {
  // TODO: Replace with your actual projects or fetch from GitHub API
const projects = [
  {
    id: 1,
    title: 'Jarvis',
    description: 'A desktop voice / text assistant that listens to commands and performs tasks like opening apps, fetching data, etc.',
    tech: ['Python', 'Eel', 'HTML', 'JavaScript'],
    github: 'https://github.com/RaghavSethi006/jarvis',
    demo: null,   // if live demo exists, fill in
    status: 'Completed',
    progress: 100,
    featured: true
  },
  {
    id: 2,
    title: 'Bank Management System',
    description: 'A system to manage bank operations including account creation, fund transfers, and transaction tracking.',
    tech: ['(specify language / DB)'],  // e.g. Java, Python, SQL — detail from your repo
    github: 'https://github.com/RaghavSethi006/bank-management-system',
    demo: null,
    status: 'Completed',
    progress: 100,
    featured: false
  },
  {
    id: 3,
    title: 'RAG-based Chatbot for Embedded Data',
    description: 'A chatbot using Retrieval-Augmented Generation (RAG) that retrieves domain-specific embedding data and responds accordingly.',
    tech: ['(your stack, e.g. Python, LangChain, embeddings, vector DB)'],
    github: 'https://github.com/RaghavSethi006/RAG-based-chatbot-for-custom-data-embedding',
    demo: null,
    status: 'Completed',
    progress: 100,
    featured: true
  },
  {
    id: 4,
    title: 'Face Recognition Attendance System',
    description: 'Attendance system that uses face recognition (via camera) to mark presence/absence automatically.',
    tech: ['(e.g. Python, OpenCV, face-recognition)'],
    github: 'https://github.com/RaghavSethi006/Face-Recognition-attendance-system-',
    demo: null,
    status: 'Completed',
    progress: 100,
    featured: false
  },
  {
    id: 5,
    title: 'Wi-Fi Password Extractor',
    description: 'A tool to extract saved Wi-Fi passwords from the system.',
    tech: ['(specify language)'],
    github: 'https://github.com/RaghavSethi006/Wi-Fi-password-extractor-',
    demo: null,
    status: 'Completed',
    progress: 100,
    featured: false
  },
  {
    id: 6,
    title: 'Travel Data Analysis App',
    description: 'App for analyzing travel-related data (e.g. trends, patterns, visualizations).',
    tech: ['(your stack, e.g. Python, JS, D3, Pandas)'],
    github: 'https://github.com/RaghavSethi006/Travel-data-analysis-app',
    demo: null,
    status: 'Completed',
    progress: 100,
    featured: false
  },
  {
    id: 7,
    title: 'Clock Frontend Practice',
    description: 'A frontend exercise / component: a clock (analog or digital) as a UI piece.',
    tech: ['(React / Vanilla JS / CSS)'],
    github: 'https://github.com/RaghavSethi006/Clock-frontend-practice',
    demo: null,
    status: 'Completed',
    progress: 100,
    featured: false
  },
  {
    id: 8,
    title: 'Rivalry Chess',
    description: 'A chess game / platform or UI for playing chess (possibly with opponent support).',
    tech: ['(JS / game engine / backend stack)'],
    github: 'https://github.github.com/RaghavSethi006/Rivalry-chess-',
    demo: null,
    status: 'Completed',
    progress: 100,
    featured: false
  },
  {
    id: 9,
    title: 'Smart Desk',
    description: 'A “smart desk” project (automated / IoT / interactive desk) — details in repository.',
    tech: ['(whatever hardware / software stack)'],
    github: 'https://github.com/RaghavSethi006/Smart-Desk',
    demo: null,
    status: 'In Progress',  // you can adjust
    progress: 60,           // adjust based on your current work
    featured: false
  }
];


  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* ===== SECTION HEADER WITH HUD STYLING ===== */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="relative inline-block">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
            Projects Archive
          </h1>
          {/* Decorative HUD elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/60" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/60" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60" />
        </div>
        
        <motion.div
          className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>
      
      {/* ===== PROJECTS GRID ===== */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
              className="relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-500 group-hover:shadow-2xl overflow-hidden"
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
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
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
              <div className="flex justify-between items-start mb-6">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    project.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-300 border-green-500/40' 
                      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                  }`}
                >
                  {project.status}
                </span>
                
                {/* Progress indicator */}
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-1">{project.progress}%</div>
                  <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
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

// ============================================================================
// ENHANCED RESUME PAGE WITH HOLOGRAPHIC TIMELINE
// ============================================================================
const ResumePage = () => {
  const handleDownloadResume = () => {
    // TODO: Replace with your actual resume PDF path
    const link = document.createElement('a');
    link.href = './src/RESUME.pdf';
    link.download = 'RaghavSethi-Resume.pdf';
    link.click();
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* ===== HEADER WITH DOWNLOAD BUTTON ===== */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-8">
          Professional Resume
        </h1>
        
        <motion.button
          onClick={handleDownloadResume}
          className="group relative px-8 py-4 rounded-xl backdrop-blur-md overflow-hidden"
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
            <Download className="w-6 h-6 text-cyan-300" />
            <span className="text-cyan-300 font-semibold text-lg">Download Resume</span>
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

      <div className="space-y-16">
        {/* ===== EXPERIENCE SECTION WITH TIMELINE ===== */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center mb-8">
            <motion.div 
              className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-blue-500 mr-6 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(6, 182, 212, 0.5)',
                  '0 0 20px rgba(6, 182, 212, 0.8)',
                  '0 0 10px rgba(6, 182, 212, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <h2 className="text-3xl font-bold text-cyan-300">Experience</h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
            
            <div className="space-y-8">
              {/* TODO: Replace with your actual work experience */}
              {[
  {
    title: 'Software Development Intern',
    company: 'Safe Lanes',
    period: 'Jul 2025 – Aug 2025',
    description: 'Worked on frontend and backend solutions including UI components, secure file handling, and AI chatbots.',
    achievements: [
      'Built a Windows 11–style notification drawer with real-time updates and category filters',
      'Developed a secure PDF viewer with password protection and anti-copy/print features',
      'Created a Retrieval-Augmented Generation chatbot using HuggingFace, FAISS, and Streamlit'
    ]
  },
  {
    title: 'Student Body Captain',
    company: 'Fahaheel Al Watanieh Indian Private School (DPS Kuwait)',
    period: 'Sep 2023 – Feb 2024',
    description: 'Led student activities, competitions, and discipline management across the school community.',
    achievements: [
      'Organized and led 4 interhouse competitions, boosting student participation by 50%',
      'Reduced disciplinary incidents by 40% through peer mentorship',
      'Secured 5 wins in interhouse events, increasing house points by 70%'
    ]
  },
  {
    title: 'Director of Graphic Design',
    company: 'Fahaheel Al Watanieh Indian Private School (DPS Kuwait)',
    period: 'Aug 2023 – Oct 2023',
    description: 'Directed the design of school magazines and coordinated with editorial teams.',
    achievements: [
      'Designed 4 magazine covers and 6 sub-covers with cohesive visual themes',
      'Contributed to a 30% increase in distribution and 50% rise in reader engagement',
      'Achieved 90% satisfaction from editorial staff for design quality'
    ]
  },
  {
    title: 'Director of Computer Science',
    company: 'Fahaheel Al Watanieh Indian Private School (DPS Kuwait)',
    period: 'Sep 2022 – Mar 2023',
    description: 'Founded and led the Computer Science Club, organizing events and mentoring peers.',
    achievements: [
      'Grew club membership by 70% and boosted student proficiency in MS Office by 60%',
      'Organized 3 computer science events and 4 creative contests',
      'Secured 2 interschool competition victories for the school'
    ]
  },
  {
    title: 'Graphic Designer',
    company: 'Contract Role',
    period: 'Dec 2022',
    description: 'Designed visuals for a school event to ensure aesthetic appeal and branding.',
    achievements: [
      'Produced 5 high-quality graphic visuals for event backdrops',
      'Improved efficiency by reducing design revisions by 30%',
      'Contributed to 40% increase in attendee engagement'
    ]
  },
  {
    title: 'Event Manager',
    company: 'Freelance',
    period: 'Feb 2022 – May 2022',
    description: 'Organized large-scale events with responsibility for planning, marketing, and budgeting.',
    achievements: [
      'Executed 5+ events with 150+ attendees each',
      'Increased attendance by 30% and revenue by 20%',
      'Managed budgets of ₹50,000 per event while balancing academic commitments'
    ]
  }
]
.map((job, index) => (
                <motion.div
                  key={index}
                  className="relative pl-16"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-6 top-4 w-4 h-4 rounded-full border-2 border-cyan-400"
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
                    className="p-6 rounded-xl backdrop-blur-md border"
                    style={{
                      background: 'rgba(2, 6, 23, 0.4)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-cyan-400 mb-4 flex items-center">
                      <span>{job.company}</span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-400">{job.period}</span>
                    </p>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    
                    {/* Achievements list */}
                    <div className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center text-sm text-gray-400"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3" />
                          {achievement}
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
          <div className="flex items-center mb-8">
            <motion.div 
              className="w-2 h-12 bg-gradient-to-b from-blue-400 to-cyan-500 mr-6 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.8)',
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <h2 className="text-3xl font-bold text-cyan-300">Education</h2>
          </div>
          
          <div 
            className="p-8 rounded-xl backdrop-blur-md border"
            style={{
              background: 'rgba(2, 6, 23, 0.4)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">BSc.Honors in Computer Science with Artificial Intelligence</h3>
            <p className="text-cyan-400 mb-4">University Of Alberta • 2024 - 2028</p>
            <p className="text-gray-300">
              Pursuing a degree in Computer Science with a concentration in Artificial Intelligence. 
              Coursework includes software engineering, machine learning, data structures, and web development, 
              with practical experience through projects and research.
            </p>
          </div>
        </motion.div>

        {/* ===== SKILLS SECTION WITH INTERACTIVE METERS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center mb-8">
            <motion.div 
              className="w-2 h-12 bg-gradient-to-b from-green-400 to-cyan-500 mr-6 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(34, 197, 94, 0.5)',
                  '0 0 20px rgba(34, 197, 94, 0.8)',
                  '0 0 10px rgba(34, 197, 94, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            />
            <h2 className="text-3xl font-bold text-cyan-300">Technical Skills</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* TODO: Replace with your actual skills and proficiency levels */}
            {[
              { 
                category: 'Frontend', 
                skills: [
                  { name: 'React', level: 95 },
                  { name: 'Angular', level: 85 },
                  { name: 'Streamlit', level: 90 },
                  { name: 'Tailwind CSS', level: 88 }
                ]
              },
              { 
                category: 'Backend', 
                skills: [
                  { name: 'Node.js', level: 92 },
                  { name: 'Python', level: 88 },
                  { name: 'PostgreSQL', level: 85 },
                  { name: 'MongoDB', level: 80 }
                ]
              },
              { 
                category: 'Tools & Automation', 
                skills: [
                  { name: 'Git', level: 95 },
                  { name: 'Docker', level: 82 },
                  { name: 'N8N', level: 78 },
                  { name: 'AWS', level: 75 }
                ]
              }
            ].map((skillGroup, groupIndex) => (
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
                <h3 className="text-xl font-bold text-cyan-300 mb-6">{skillGroup.category}</h3>
                <div className="space-y-4">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 text-sm font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden relative">
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

// ============================================================================
// ENHANCED REVIEWS PAGE WITH HOLOGRAPHIC FORM
// ============================================================================
const ReviewsPage = ({ reviews, setReviews }) => {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    review: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (reviewForm.name && reviewForm.review) {
      setIsSubmitting(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newReview = {
        id: Date.now(),
        ...reviewForm,
        date: new Date().toLocaleDateString(),
        verified: Math.random() > 0.5 // Random verification status
      };
      
      setReviews([newReview, ...reviews]);
      setReviewForm({ name: '', review: '', rating: 5 });
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* ===== SECTION HEADER ===== */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
          Client Reviews
        </h1>
        <motion.div
          className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>
      
      <div className="grid xl:grid-cols-5 gap-12">
        {/* ===== HOLOGRAPHIC REVIEW FORM ===== */}
        <motion.div
          className="xl:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center">
            <MessageCircle className="w-8 h-8 mr-3" />
            Leave a Review
          </h2>
          
          <div 
            className="relative p-8 rounded-2xl backdrop-blur-md border overflow-hidden"
            style={{
              background: 'rgba(2, 6, 23, 0.6)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Corner HUD elements */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400/60" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400/60" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60" />
            
            <div className="space-y-6 relative z-10">
              {/* Name Input */}
              <div>
                <label className="block text-cyan-300 mb-3 font-medium">Name</label>
                <motion.input
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 focus:outline-none"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: 'white',
                  }}
                  placeholder="Your name"
                  whileFocus={{
                    borderColor: 'rgba(6, 182, 212, 0.6)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
                  }}
                />
              </div>
              
              {/* Rating System */}
              <div>
                <label className="block text-cyan-300 mb-3 font-medium">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                      className="transition-all duration-200"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= reviewForm.rating 
                            ? 'text-yellow-400 fill-current drop-shadow-glow' 
                            : 'text-gray-500'
                        }`}
                        style={{
                          filter: star <= reviewForm.rating 
                            ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' 
                            : 'none'
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Review Textarea */}
              <div>
                <label className="block text-cyan-300 mb-3 font-medium">Review</label>
                <motion.textarea
                  value={reviewForm.review}
                  onChange={(e) => setReviewForm({...reviewForm, review: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 focus:outline-none resize-none"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: 'white',
                  }}
                  placeholder="Share your experience working with me..."
                  whileFocus={{
                    borderColor: 'rgba(6, 182, 212, 0.6)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
                  }}
                />
              </div>
              
              {/* Submit Button */}
              <motion.button
                onClick={handleSubmitReview}
                disabled={isSubmitting || !reviewForm.name || !reviewForm.review}
                className="w-full px-6 py-4 rounded-xl backdrop-blur-md border-2 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(6, 182, 212, 0.2)',
                  border: '2px solid rgba(6, 182, 212, 0.4)',
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-cyan-300 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="text-cyan-300 font-semibold">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 text-cyan-300" />
                      <span className="text-cyan-300 font-semibold">Submit Review</span>
                    </>
                  )}
                </div>
                
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
            
            {/* Form scanning animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent"
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
        
        {/* ===== REVIEWS DISPLAY ===== */}
        <motion.div
          className="xl:col-span-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center">
            <Star className="w-8 h-8 mr-3 text-yellow-400" />
            Recent Reviews
          </h2>
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {reviews.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div 
                  className="inline-block p-12 rounded-2xl backdrop-blur-md border"
                  style={{
                    background: 'rgba(2, 6, 23, 0.4)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                  }}
                >
                  <MessageCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-400 mb-2">No reviews yet</h3>
                  <p className="text-gray-500">Be the first to share your experience!</p>
                </div>
              </motion.div>
            ) : (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="p-6 rounded-xl backdrop-blur-md border transition-all duration-300 group-hover:border-cyan-400/40"
                    style={{
                      background: 'rgba(2, 6, 23, 0.4)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-bold text-white text-lg">{review.name}</h4>
                        {review.verified && (
                          <motion.div
                            className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs"
                            style={{
                              background: 'rgba(34, 197, 94, 0.2)',
                              border: '1px solid rgba(34, 197, 94, 0.4)',
                            }}
                            animate={{
                              boxShadow: [
                                '0 0 10px rgba(34, 197, 94, 0.3)',
                                '0 0 20px rgba(34, 197, 94, 0.5)',
                                '0 0 10px rgba(34, 197, 94, 0.3)',
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Shield className="w-3 h-3 text-green-300" />
                            <span className="text-green-300 font-medium">Verified</span>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">{review.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">{review.review}</p>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// ENHANCED FOOTER WITH GLASSMORPHISM
// ============================================================================
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
              {/* TODO: Replace with your actual social media links */}
              <motion.a
                href="https://github.com/RaghavSethi006"
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
                href="https://www.linkedin.com/in/raghav-sethi-a08501319/"
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

// ============================================================================
// ENHANCED FLOATING AI ASSISTANT
// ============================================================================
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
              {/* TODO: Customize these messages for your personality */}
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

// ============================================================================
// HUD OVERLAY WITH SYSTEM STATUS
// ============================================================================
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

// ============================================================================
// CUSTOM CSS FOR SCROLLBAR
// ============================================================================
const GlobalStyles = () => (
  <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(6, 182, 212, 0.5);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(6, 182, 212, 0.7);
    }
    
    /* Smooth scrolling for all browsers */
    html {
      scroll-behavior: smooth;
    }
    
    /* Custom focus styles for better accessibility */
    button:focus-visible, 
    input:focus-visible, 
    textarea:focus-visible {
      outline: 2px solid rgba(6, 182, 212, 0.8);
      outline-offset: 2px;
    }
  `}</style>
);

export default JarvisPortfolio;