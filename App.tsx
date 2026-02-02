import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import WhatWeDo from './components/WhatWeDo';
import InstagramGallery from './components/InstagramGallery';
import Feedback from './components/Feedback';
import PartnersCarousel from './components/PartnersCarousel';
import Footer from './components/Footer';
import { SiteProvider, useSite } from './SiteContext';
import PixelInjector from './PixelInjector';

const MainLandingPage: React.FC = () => {
  const { trackEvent } = useSite();

  useEffect(() => {
    trackEvent('page_view');
  }, [trackEvent]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <PartnersCarousel />
        <WhatWeDo />
        <InstagramGallery />
        <Feedback />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <PixelInjector />
      <MainLandingPage />
    </SiteProvider>
  );
};

export default App;