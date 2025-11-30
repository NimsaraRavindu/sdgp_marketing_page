import React, { useState } from 'react';
import { HOW_IT_WORKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'volunteers' | 'communities' | 'sponsors';

const HowItWorks: React.FC = () => {
  const [activeRole, setActiveRole] = useState<Role>('volunteers');

  const roles = [
    { id: 'volunteers', label: 'For Volunteers' },
    { id: 'communities', label: 'For Communities' },
    { id: 'sponsors', label: 'For Sponsors' },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-grotto/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-brand-navy">How It Works</h2>
          <p className="text-brand-navy/80 max-w-2xl mx-auto text-lg">
            Whether you're looking to give back, organize events, or sponsor the next big thing, Linkara makes it simple.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-brand-white p-1 rounded-full inline-flex backdrop-blur-sm border border-brand-grey/30">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id as Role)}
                className={`relative px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-300 ${
                  activeRole === role.id ? 'text-brand-navy' : 'text-brand-baby/70 hover:text-brand-baby'
                }`}
              >
                {activeRole === role.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-green rounded-full shadow-lg"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-bold">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {HOW_IT_WORKS[activeRole].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-white border border-brand-grey/30 p-8 rounded-2xl relative group hover:border-brand-green/50 hover:bg-brand-green/10 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-white rounded-full border border-brand-grey flex items-center justify-center text-xl font-bold text-brand-green shadow-xl">
                  {step.step}
                </div>
                
                <div className="mb-6 text-brand-grotto group-hover:text-brand-green transition-colors">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-brand-navy mb-3">{step.title}</h3>
                <p className="text-brand-navy/80 leading-relaxed">
                  {step.desc}
                </p>

                {/* Connecting Line (Desktop only) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-brand-grotto/50 to-transparent transform translate-x-full"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowItWorks;