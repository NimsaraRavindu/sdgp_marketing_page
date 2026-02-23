import React from 'react';
import { LogoIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy border-t border-brand-grey/20 relative overflow-hidden">
      <motion.div
        className="absolute -top-20 right-1/4 w-52 h-52 rounded-full bg-brand-grotto/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -8, 0], x: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container mx-auto px-4 py-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center md:h-16 gap-3 md:gap-6"
        >
          <div className="flex items-center space-x-2 mb-2 md:mb-0 text-white">
            <div className="logo-frame w-12 h-12 overflow-hidden flex-shrink-0">
              <LogoIcon />
            </div>
            <span className="text-brand-green font-bold text-lg">Linkara</span>
          </div>
          <p className="text-white/70 text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Linkara. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <motion.a href="#" whileHover={{ y: -2, scale: 1.08 }} className="text-white/70 hover:text-brand-grotto transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -2, scale: 1.08 }} className="text-white/70 hover:text-brand-grotto transition-colors" aria-label="Twitter">
              <TwitterIcon />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -2, scale: 1.08 }} className="text-white/70 hover:text-brand-grotto transition-colors" aria-label="LinkedIn">
              <LinkedInIcon />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;