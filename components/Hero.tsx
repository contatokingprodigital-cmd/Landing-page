import React from 'react';
import { useSite } from '../SiteContext';

const Hero: React.FC = () => {
  const { content, trackEvent } = useSite();

  // Função para renderizar o título exatamente como solicitado
  const renderTitle = () => {
    // "Mais clientes mais vendas. Tráfego pago com estratégia."
    const parts = content.heroTitle.split('.');
    return parts.map((part, i) => {
      const text = part.trim();
      if (!text) return null;

      const isStrategic = text.toLowerCase().includes('tráfego pago');
      
      return (
        <React.Fragment key={i}>
          {i > 0 && <br className="hidden md:block" />}
          <span className={`${isStrategic ? 'gold-gradient' : 'text-white'} block md:inline uppercase font-extrabold tracking-tighter`}>
            {text}.
            &nbsp;
          </span>
        </React.Fragment>
      );
    });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-amber-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-amber-200/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="mb-12 inline-block animate-fade-in">
          <img 
            src={content.heroImage} 
            alt="Logo King Pro Digital" 
            className="w-56 md:w-72 mx-auto drop-shadow-[0_0_35px_rgba(191,149,63,0.4)] transition-transform hover:scale-105 duration-700"
          />
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold mb-10 leading-[1.05] font-title">
          {renderTitle()}
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto mb-14 font-light leading-relaxed">
          {content.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href={content.whatsappLink} 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_whatsapp_hero')}
            className="gold-bg text-black text-lg font-black px-12 py-5 rounded-2xl hover:shadow-[0_0_50px_rgba(191,149,63,0.6)] transition-all transform hover:-translate-y-1 inline-flex items-center justify-center min-w-[320px] uppercase tracking-widest"
          >
            Entrar em Contato
          </a>
          <a 
            href={content.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_specialist_hero')}
            className="border-2 border-white/20 text-white text-lg font-bold px-12 py-5 rounded-2xl hover:bg-white/5 transition-all inline-flex items-center justify-center min-w-[320px] uppercase tracking-widest"
          >
            Falar com um especialista
          </a>
        </div>

        <div className="mt-20 animate-bounce opacity-20">
            <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" />
            </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;