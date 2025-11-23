import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Discover', href: '#discover' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Stories', href: '#stories' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  // Handle scroll effect for background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg border-b border-brand-grotto/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-white z-50">
          <LogoIcon />
          <span className="font-serif tracking-wide text-white">Linkara</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-brand-baby hover:text-brand-green transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Login Button (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
            <a href="#contact" className="px-5 py-2 bg-brand-grotto hover:bg-brand-green text-brand-navy text-sm uppercase tracking-wider font-bold rounded-full transition-colors duration-300 shadow-lg shadow-brand-grotto/20">
                Login
            </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-brand-baby hover:text-brand-green focus:outline-none p-2 relative z-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 sm:w-80 bg-brand-navy border-l border-brand-grotto/30 z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-6 flex justify-between items-center border-b border-brand-grotto/20">
                <span className="text-xl font-bold font-serif text-white">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brand-baby hover:text-brand-green transition-colors p-1"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-brand-baby hover:text-brand-green text-lg font-medium block py-3 border-b border-brand-grotto/20 last:border-0"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6"
                >
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-5 py-3 bg-brand-grotto hover:bg-brand-green text-brand-navy font-bold rounded-lg transition-colors shadow-lg hover:shadow-brand-green/30"
                  >
                    Login
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;