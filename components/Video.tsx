import React from 'react';
import { motion } from 'framer-motion';

const VIDEO_SRC = new URL('../assets/videos/Project_Linkara_Blueprint.mp4', import.meta.url).href;

const Video: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4 relative" aria-labelledby="video-section-title">
      <motion.div
        className="absolute -top-16 -left-8 w-64 h-64 rounded-full bg-brand-grotto/10 blur-3xl pointer-events-none"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-brand-green/10 blur-3xl pointer-events-none"
        animate={{ x: [0, -25, 0], y: [0, 16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative bg-brand-baby/10 border border-brand-baby/30 rounded-2xl p-6 shadow-xl"
      >
        <h2 id="video-section-title" className="text-2xl font-semibold mb-4 text-brand-navy">Platform Overview</h2>
        <p className="text-sm text-brand-navy/80 mb-4">Watch this short walkthrough to learn how Linkara supports partnerships, volunteering and sponsorship management.</p>

        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ duration: 0.25 }}
          className="w-full aspect-video bg-brand-baby/10 border border-brand-baby/30 rounded overflow-hidden shadow-md"
        >
          <video
            src={VIDEO_SRC}
            controls
            playsInline
            className="w-full h-full object-cover"
            aria-label="Linkara platform walkthrough video"
          />
        </motion.div>

        <div className="mt-3 flex items-center justify-between">
          <a href={VIDEO_SRC} className="inline-flex items-center text-sm text-brand-grotto hover:text-brand-grotto/80 transition-colors" download>
            Download video
            <span className="ml-2">↗</span>
          </a>
          <span className="text-xs text-brand-navy/60">Length: ~2 mins</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Video;
