import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';

interface TeamMemberCardProps {
  imageUrl: string;
  name: string;
  title: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ imageUrl, name, title }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
      }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="text-center bg-brand-white p-6 rounded-xl border border-brand-grey/30 shadow-lg group hover:border-brand-green/50 hover:shadow-brand-green/10"
    >
      <div className="relative w-32 h-32 mx-auto mb-4">
         <motion.img
            src={imageUrl}
            alt={name}
            className="w-32 h-32 rounded-full object-cover border-4 border-brand-grotto/50 group-hover:border-brand-green transition-all duration-300 relative z-10"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 rounded-full bg-brand-grotto/20 blur-md transform scale-0 group-hover:scale-110 transition-transform duration-300"></div>
      </div>
     
      <h3 className="text-xl font-bold text-brand-navy">{name}</h3>
      <p className="text-brand-grotto font-medium">{title}</p>
    </motion.div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-brand-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-brand-navy">
            Meet the Visionaries
          </h2>
          <p className="text-lg text-brand-navy/80 max-w-2xl mx-auto">
            The passionate team dedicated to building the future of community and corporate partnerships.
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard
              key={index}
              imageUrl={member.imageUrl}
              name={member.name}
              title={member.title}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;