import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Selected Work' },
  { id: 'resume', label: 'Resume' },
  { id: 'skills', label: 'Skills' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#C8D8F0]/20 bg-[#0B1428] text-[#EEF2F9]"
          aria-label="Go to home"
        >
          <span className="font-serif text-[0.7rem] uppercase tracking-[0.35em]">RS</span>
          <span className="absolute inset-2 rounded-full border border-[#B8960C]/20 watch-logo-ring" />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-sm uppercase tracking-[0.35em] transition-colors duration-200 border-b-2 pb-1 ${isActive ? 'border-[#B8960C] text-[#EEF2F9]' : 'border-transparent text-[#7A8EAB] hover:text-[#EEF2F9]'}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          className="md:hidden rounded-md border border-[#7A8EAB]/20 p-2 text-[#EEF2F9] transition hover:bg-[#EEF2F9]/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-[#1A2744] bg-[#050A18]/95"
          >
            <div className="space-y-2 px-4 py-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full rounded-xl border px-4 py-3 text-left text-sm uppercase tracking-[0.35em] transition ${isActive ? 'border-[#B8960C] text-[#EEF2F9]' : 'border-[#1A2744] text-[#7A8EAB] hover:border-[#B8960C] hover:text-[#EEF2F9]'}`}
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
