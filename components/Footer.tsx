import React from 'react';
import { LogoIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy border-t border-brand-grey/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:h-16 gap-3 md:gap-6">
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
            <a href="#" className="text-white/70 hover:text-brand-green transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" className="text-white/70 hover:text-brand-green transition-colors" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="#" className="text-white/70 hover:text-brand-green transition-colors" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;