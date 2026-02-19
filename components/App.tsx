
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Timeline from './Timeline';
import WhatWeDo from './WhatWeDo';
import InstagramGallery from './InstagramGallery';
import Feedback from './Feedback';
import PartnersCarousel from './PartnersCarousel';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import AdminDashboard from './AdminDashboard';
import { SiteProvider, useSite } from '../SiteContext';
import PixelInjector from './PixelInjector';

const SEOUpdater: React.FC = () => {
  const { content } = useSite();
  
  useEffect(() => {
    if (content.seoTitle) {
      document.title = content.seoTitle;
    }
    if (content.seoDescription) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', content.seoDescription);
    }
  }, [content.seoTitle, content.seoDescription]);

  return null;
};

const MainLandingPage: React.FC = () => {
  const { trackEvent } = useSite();
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    trackEvent('page_view');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'k') {
        setShowAdmin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trackEvent]);

  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-hidden bg-black text-white selection:bg-amber-500 selection:text-black">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <PartnersCarousel />
        <WhatWeDo />
        <InstagramGallery />
        <Feedback />
        <FinalCTA />
      </main>
      <Footer />
      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <PixelInjector />
      <SEOUpdater />
      <MainLandingPage />
    </SiteProvider>
  );
};

export default App;
