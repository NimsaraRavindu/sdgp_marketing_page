import React from 'react';
import { CATEGORIES } from '../constants';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  title: string;
  description: string;
  bgImage: string;
  mainImage: string;
  subImage: string;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, bgImage, mainImage, subImage, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative w-full h-[450px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl border border-brand-grotto/30 hover:border-brand-green/50 hover:shadow-brand-grotto/20 bg-brand-navy"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img 
            src={bgImage} 
            alt={`${title} background`}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-100"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/40 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full p-6 md:p-10 flex flex-col justify-between">
        
        {/* Text Content */}
        <div className="max-w-md">
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {title}
          </h3>
          <p className="text-brand-baby text-sm md:text-base leading-relaxed mb-6 opacity-90">
            {description}
          </p>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: '#75E6DA', color: '#05445E' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-2 bg-brand-green text-brand-navy font-bold text-sm rounded-full transition-colors duration-300 shadow-md shadow-brand-green/20 cursor-pointer"
          >
            Join Now
          </motion.a>
        </div>

        {/* Floating Images Composition */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-end space-x-[-20px]">
           {/* Secondary Image (Back) */}
           <div className="relative z-0 transform translate-x-4 translate-y-2 transition-transform duration-500 group-hover:translate-x-0 w-24 h-32 md:w-32 md:h-40">
            <motion.img 
              src={subImage} 
              alt="Detail view" 
              className="w-full h-full object-cover rounded-xl border-2 border-brand-grotto/50 shadow-lg opacity-100"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
            />
          </div>
          
          {/* Main Image (Front) */}
          <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2 w-32 h-32 md:w-48 md:h-48">
            <motion.img 
              src={mainImage} 
              alt={`${title} highlight`} 
              className="w-full h-full object-cover rounded-2xl border-4 border-brand-grotto shadow-xl opacity-100"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const Discover: React.FC = () => {
  return (
    <section id="discover" className="py-20 bg-brand-navy">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <div 
                key={category.id} 
                className={`${
                    index === 3 ? 'lg:col-span-2 xl:col-span-1' : ''
                }`}
            >
                <CategoryCard
                  index={index}
                  title={category.title}
                  description={category.description}
                  bgImage={category.bgImage}
                  mainImage={category.mainImage}
                  subImage={category.subImage}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discover;