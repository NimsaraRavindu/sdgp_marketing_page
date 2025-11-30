import React from 'react';
import { motion } from 'framer-motion';
import { FigmaIcon, RocketLaunchIcon } from '../constants';

const Demo: React.FC = () => {
  return (
    <section id="demo" className="py-24 bg-brand-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-grotto/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-brand-navy">Experience Linkara</h2>
          <p className="text-brand-navy/80 max-w-2xl mx-auto text-lg">
            See our vision come to life. Explore the design prototype or launch the live functional application.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Figma Prototype Card */}
          <motion.a
            href="https://www.figma.com/proto/your-figma-link-here" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-brand-baby/10 border border-brand-baby/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand-green/20 shadow-xl cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-grotto/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="bg-brand-baby/10 p-4 rounded-2xl mb-6 border border-brand-baby/30 group-hover:border-brand-green/50 transition-colors">
                <FigmaIcon />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy mb-2">Interactive Prototype</h3>
            <p className="text-brand-navy/80 mb-6">Explore the high-fidelity design vision, user flows, and interactions in Figma.</p>
            <span className="inline-flex items-center text-brand-green font-semibold group-hover:text-brand-grotto transition-colors">
              View Prototype 
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </motion.a>

          {/* Live App Card */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-brand-baby/10 border border-brand-baby/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-brand-grotto/50 transition-all duration-300 hover:shadow-brand-grotto/20 shadow-xl cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="bg-brand-baby/10 p-4 rounded-2xl mb-6 border border-brand-baby/30 group-hover:border-brand-grotto/50 transition-colors text-brand-grotto">
                <RocketLaunchIcon />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy mb-2">Live Platform</h3>
            <p className="text-brand-navy/80 mb-6">Experience the fully functional web application with real-time features.</p>
             <span className="inline-flex items-center text-brand-grotto font-semibold group-hover:text-brand-green transition-colors">
              Launch App 
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </motion.a>

        </div>
      </div>
    </section>
  );
};

export default Demo;