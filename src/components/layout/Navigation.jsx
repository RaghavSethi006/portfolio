import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'resume', label: 'Resume' },
  { id: 'skills', label: 'Skills' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = ({ activeSection, onNavigate, isProjectOpen = false, onBackFromProject }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Close menu automatically when switching to/from project view
    setIsMenuOpen(false);
  }, [isProjectOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-[#1A2744] bg-[#050A18]/95 backdrop-blur-xl"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo / RS button */}
        <button
          type="button"
          onClick={() => isProjectOpen ? onBackFromProject?.() : handleNavClick('home')}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#C8D8F0]/20 bg-[#0B1428] text-[#EEF2F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18]"
          aria-label={isProjectOpen ? 'Back to projects' : 'Go to home'}
        >
          <span className="font-serif text-[0.7rem] uppercase tracking-[0.35em]">RS</span>
          <span className="absolute inset-2 rounded-full border border-[#B8960C]/20 watch-logo-ring" />
        </button>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-xs uppercase tracking-[0.24em] transition-colors duration-200 border-b-2 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18] ${isActive ? 'border-[#B8960C] text-[#EEF2F9]' : 'border-transparent text-[#7A8EAB] hover:text-[#EEF2F9]'}`}
              >
                {item.label}
              </button>
            );
          })}
          <span className="font-mono text-[9px] tracking-[0.2em] select-none ml-4" style={{ color: 'rgba(138,163,199,0.4)' }}>
            #{(activeSection || 'home').slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Mobile right slot — visible only on mobile (< md) */}
        {isProjectOpen ? (
          /* Back arrow button — replaces hamburger when inside a project */
          <motion.button
            key="back-arrow"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            type="button"
            onClick={onBackFromProject}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-[#B8960C]/40 bg-[#B8960C]/10 text-[#B8960C] transition hover:bg-[#B8960C]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18]"
            aria-label="Back to projects"
          >
            <ArrowLeft className="h-4 w-4" />
          </motion.button>
        ) : (
          /* Hamburger button — normal mode */
          <button
            className="flex md:hidden items-center justify-center rounded-md border border-[#7A8EAB]/20 bg-[#0B1428]/60 p-2 text-[#EEF2F9] transition hover:bg-[#EEF2F9]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && !isProjectOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute w-full left-0 border-b border-[#1A2744] bg-[#050A18]/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col px-4 py-6 gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full rounded-lg border px-4 py-4 text-left text-sm uppercase tracking-[0.24em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18] ${
                      isActive
                        ? 'border-[#B8960C] text-[#EEF2F9] bg-[#B8960C]/5'
                        : 'border-[#1A2744] text-[#7A8EAB] hover:border-[#B8960C]/50 hover:text-[#EEF2F9]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
