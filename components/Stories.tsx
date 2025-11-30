import React from 'react';
import { TESTIMONIALS } from '../constants';
import { motion } from 'framer-motion';

const Stories: React.FC = () => {
  return (
    <section id="stories" className="py-24 bg-brand-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-brand-navy">Success Stories</h2>
          <p className="text-brand-navy/80 max-w-2xl mx-auto">
            Hear from the people and organizations who are making a difference with Linkara.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-brand-baby/10 p-8 rounded-2xl border border-brand-baby/30 shadow-xl"
            >
              <div className="mb-6 text-brand-green">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.0547 14.3301 15.1895 14.9385 14.25C15.7012 13.1328 17.0908 12.1934 19.5527 12.1934L19.6172 12.1934V6.19336C13.0078 6.19336 10.4131 11.8105 10.4131 16.3672L10.4131 21L14.017 21ZM5.0166 21L5.0166 18C5.0166 16.0547 5.3291 15.1895 5.9375 14.25C6.7002 13.1328 8.08984 12.1934 10.5518 12.1934L10.6162 12.1934V6.19336C4.00684 6.19336 1.41211 11.8105 1.41211 16.3672L1.41211 21L5.0166 21Z" />
                </svg>
              </div>
              <p className="text-brand-navy mb-6 italic leading-relaxed text-lg">"{story.quote}"</p>
              <div className="flex items-center space-x-4">
                <img 
                  src={story.image} 
                  alt={story.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-grotto" 
                />
                <div>
                  <h4 className="text-brand-navy font-bold">{story.author}</h4>
                  <p className="text-sm text-brand-green/80">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;