import React from 'react';
import { useSite } from './SiteContext';

const Hero: React.FC = () => {
  const { content, trackEvent } = useSite();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="mb-8 inline-block">
          <img 
            src={content.heroImage} 
            alt="Logo King Pro Digital" 
            className="w-48 md:w-64 mx-auto drop-shadow-[0_0_25px_rgba(191,149,63,0.6)]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/300/300?random=logo';
            }}
          />
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
          {content.heroTitle.split(',').map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {part.includes('Certo') ? (
                <>
                  {part.replace(/Certo/g, '')}
                  <span className="gold-gradient">Certo</span>
                </>
              ) : part}
            </React.Fragment>
          ))}
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
          {content.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={content.whatsappLink} 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_whatsapp_hero')}
            className="gold-bg text-black text-lg font-bold px-10 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(191,149,63,0.5)] transition-all transform hover:-translate-y-1 inline-flex items-center justify-center min-w-[280px]"
          >
            ENTRAR EM CONTATO
          </a>
          <a 
            href={content.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_specialist_hero')}
            className="border-2 border-amber-500/50 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-amber-500/10 transition-all inline-flex items-center justify-center min-w-[280px]"
          >
            FALE COM ESPECIALISTA
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;