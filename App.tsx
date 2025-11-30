import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Demo from './components/Demo';
import HowItWorks from './components/HowItWorks';
import Video from './components/Video';
import Discover from './components/Discover';
import Features from './components/Features';
import Stories from './components/Stories';
import Team from './components/Team';
import Contact from './components/Contact';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import World from './components/World';

const App: React.FC = () => {
  return (
    <div className="bg-brand-white min-h-screen font-sans text-brand-navy selection:bg-brand-grotto/20 selection:text-brand-navy">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Demo />
        <Video />
        <Discover />
        <HowItWorks />
        <World />
        <Features />
        <Stories />
        <Team />
        <Feedback />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;