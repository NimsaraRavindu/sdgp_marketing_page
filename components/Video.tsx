import React from 'react';

const VIDEO_SRC = new URL('../assets/videos/Project_Linkara_Blueprint.mp4', import.meta.url).href;

const Video: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4" aria-labelledby="video-section-title">
      <div className="bg-white/5 rounded-lg p-6 shadow-sm">
        <h2 id="video-section-title" className="text-2xl font-semibold mb-4">Platform Overview</h2>
        <p className="text-sm text-slate-300 mb-4">Watch this short walkthrough to learn how Linkara supports partnerships, volunteering and sponsorship management.</p>

        <div className="w-full aspect-video bg-brand-baby/10 border border-brand-baby/30 rounded overflow-hidden shadow-md">
          <video
            src={VIDEO_SRC}
            controls
            playsInline
            className="w-full h-full object-cover"
            aria-label="Linkara platform walkthrough video"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <a href={VIDEO_SRC} className="text-sm text-brand-green hover:underline" download>
            Download video
          </a>
          <span className="text-xs text-slate-400">Length: ~2 mins</span>
        </div>
      </div>
    </section>
  );
};

export default Video;
