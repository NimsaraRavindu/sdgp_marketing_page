import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm pointer-events-none"></div>
      <div 
        className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)] pointer-events-none"
      ></div>
      <motion.div 
        className="absolute top-0 left-0 w-72 h-72 bg-brand-grotto/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-72 h-72 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-6 relative z-20">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span 
            className="bg-clip-text text-transparent bg-gradient-to-r from-brand-baby to-brand-green inline-block"
            style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}
          >
            Connect. Collaborate. Create Impact.
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-brand-baby/80 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Linkara is the ultimate ecosystem for volunteers, communities, and sponsors. Discover opportunities, manage events, and build meaningful partnerships, all in one place.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="#demo"
            className="w-full sm:w-auto bg-brand-grotto hover:bg-brand-white hover:text-brand-navy text-brand-navy font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-brand-grotto/50 transition-all duration-300 block cursor-pointer relative z-30 transform hover:scale-105 active:scale-95"
          >
            Get Started
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto bg-brand-navy border border-brand-grotto/50 hover:bg-brand-grotto/10 text-brand-baby font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 block cursor-pointer relative z-30 transform hover:scale-105 active:scale-95"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;