import React from 'react';
import { motion } from 'framer-motion';

const Feedback: React.FC = () => {
  return (
    <section className="py-12 bg-brand-white border-t border-brand-grey/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-brand-baby/10 border border-brand-baby/30 shadow-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-grotto/10 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-navy mb-4">
              We Value Your Feedback
            </h2>
            <p className="text-brand-navy/80 text-lg mb-8 max-w-2xl mx-auto">
              Help us shape the future of Linkara. Your insights allow us to build a better ecosystem for volunteers, communities, and sponsors.
            </p>
            
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeRcTAC-8abF9C3qEaaZruZs2-wu8vZvPWsyHC5W6cwn6GIgw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-brand-green text-brand-navy font-bold rounded-full shadow-lg hover:shadow-brand-green/30 transition-all duration-300 text-lg"
            >
              <span>Take Our Survey</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feedback;