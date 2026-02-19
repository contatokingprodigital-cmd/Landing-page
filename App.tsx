
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
import AdminDashboard from './components/AdminDashboard';
import { SiteProvider, useSite } from './SiteContext';
import PixelInjector from './components/PixelInjector';

const SEOUpdater: React.FC = () => {
  const { content } = useSite();
  
  useEffect(() => {
    // Título
    if (content.seoTitle) {
      document.title = content.seoTitle;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', content.seoTitle);
    }

    // Descrição
    if (content.seoDescription) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', content.seoDescription);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', content.seoDescription);
    }

    // Keywords
    if (content.seoKeywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', content.seoKeywords);
    }

    // Imagem OG (Social)
    if (content.heroImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', content.heroImage);
    }
  }, [content.seoTitle, content.seoDescription, content.seoKeywords, content.heroImage]);

  return null;
};

const MainLandingPage: React.FC = () => {
  const { trackEvent } = useSite();
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    trackEvent('page_view');

    // Atalho secreto para o dashboard: Ctrl+Alt+K
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
