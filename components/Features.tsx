import React from 'react';
import { FEATURES } from '../constants';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="bg-brand-baby/10 p-6 rounded-xl border border-brand-baby/30 shadow-lg hover:border-brand-green/50 hover:shadow-brand-green/10 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-brand-baby/10 rounded-lg text-brand-green border border-brand-baby/30">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-brand-navy">{title}</h3>
      <p className="text-brand-navy/80">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-brand-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-brand-navy">
            An Ecosystem Built for Growth
          </h2>
          <p className="text-lg text-brand-navy/80 max-w-2xl mx-auto">
            Explore the powerful, AI-driven features that make Linkara the premier platform for community engagement.
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;