import React from 'react';
import { LogoIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy border-t border-brand-grey/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0 text-white">
            <div className="logo-frame w-16 h-16 overflow-hidden">
              <LogoIcon />
            </div>
            <span className="sr-only">Linkara</span>
          </div>
          <p className="text-white/70 text-sm mb-4 md:mb-0">
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