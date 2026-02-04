
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import WhatWeDo from './components/WhatWeDo';
import InstagramGallery from './components/InstagramGallery';
import Feedback from './components/Feedback';
import PartnersCarousel from './components/PartnersCarousel';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminDashboard from './AdminDashboard';
import { SiteProvider, useSite } from './SiteContext';
import PixelInjector from './PixelInjector';

const SEOUpdater: React.FC = () => {
  const { content } = useSite();
  
  useEffect(() => {
    if (content.seoTitle) {
      document.title = content.seoTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && content.seoDescription) {
      metaDesc.setAttribute('content', content.seoDescription);
    }
  }, [content.seoTitle, content.seoDescription]);

  return null;
};

const MainLandingPage: React.FC = () => {
  const { trackEvent } = useSite();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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
        <FinalCTA />
      </main>
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
      
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
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
