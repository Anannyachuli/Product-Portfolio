import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import AskAI from './AskAI';

const TAB_NAV = {
  Work: 'professional',
  Research: 'research',
  Projects: 'academic',
};

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#profile-tabs' },
  { label: 'Research', href: '#profile-tabs' },
  { label: 'Projects', href: '#profile-tabs' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: 'mailto:anannya.chuli@duke.edu' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.label === 'Contact') {
      window.location.href = item.href;
      return;
    }

    const tabId = TAB_NAV[item.label];
    if (tabId) {
      window.dispatchEvent(new CustomEvent('switch-tab', { detail: tabId }));
    }

    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#281e32] shadow-md'
          : 'bg-[#281e32]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => setIsAskAIOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-600/80 hover:bg-purple-500 text-white text-sm font-medium transition-all hover:scale-105"
            >
              <Sparkles size={14} />
              Ask Anannya
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsAskAIOpen(true)}
              className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
              aria-label="Ask AI"
            >
              <Sparkles size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#281e32] border-t border-white/20"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block text-base font-medium text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AskAI isOpen={isAskAIOpen} onClose={() => setIsAskAIOpen(false)} />
    </motion.nav>
  );
}
