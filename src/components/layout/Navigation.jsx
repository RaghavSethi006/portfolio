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

  // Close mobile menu whenever view changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [isProjectOpen]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-[#1A2744] bg-[#050A18]/95 backdrop-blur-xl"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* ── Main bar ── */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo / RS */}
        <button
          type="button"
          onClick={() => isProjectOpen ? onBackFromProject?.() : handleNavClick('home')}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C8D8F0]/20 bg-[#0B1428] text-[#EEF2F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A18]"
          aria-label={isProjectOpen ? 'Back to projects' : 'Go to home'}
        >
          <span className="font-serif text-[0.7rem] uppercase tracking-[0.35em]">RS</span>
          <span className="absolute inset-2 rounded-full border border-[#B8960C]/20 watch-logo-ring" />
        </button>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative whitespace-nowrap text-xs uppercase tracking-[0.24em] transition-colors duration-200 border-b-2 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] ${
                  isActive
                    ? 'border-[#B8960C] text-[#EEF2F9]'
                    : 'border-transparent text-[#7A8EAB] hover:text-[#EEF2F9]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <span
            className="hidden md:inline font-mono text-[9px] tracking-[0.2em] select-none ml-4 shrink-0"
            style={{ color: 'rgba(138,163,199,0.4)' }}
          >
            #{(activeSection || 'home').slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* ── Mobile right slot — ONLY visible on mobile (< md) ── */}
        <div className="flex items-center md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isProjectOpen ? (
              /* Back arrow — shown inside a project detail page */
              <motion.button
                key="back-btn"
                type="button"
                onClick={onBackFromProject}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B8960C]/40 bg-[#B8960C]/10 text-[#B8960C] transition-colors hover:bg-[#B8960C]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C]"
                aria-label="Back to projects"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18 }}
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.button>
            ) : (
              /* Hamburger — shown on the main website */
              <motion.button
                key="menu-btn"
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#7A8EAB]/25 bg-[#0B1428]/70 text-[#EEF2F9] transition-colors hover:bg-[#EEF2F9]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C]"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {isMenuOpen && !isProjectOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#1A2744] bg-[#050A18]/98 md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full rounded-lg border px-4 py-4 text-left text-sm uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8960C] ${
                      isActive
                        ? 'border-[#B8960C] bg-[#B8960C]/8 text-[#EEF2F9]'
                        : 'border-[#1A2744] text-[#7A8EAB] hover:border-[#B8960C]/40 hover:text-[#EEF2F9]'
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
