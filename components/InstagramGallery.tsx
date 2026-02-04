import React from 'react';
import { useSite } from '../SiteContext';

const InstagramGallery: React.FC = () => {
  const { content } = useSite();

  return (
    <section id="instagram" className="py-24 bg-zinc-950 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-amber-500/30 rounded-full text-amber-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em]">
            Estratégia em Foco
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-title text-white">{content.instagramSectionTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">{content.instagramSectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.instagramVideoUrls.map((url, idx) => {
            // Constrói a URL de embed do Instagram
            const embedUrl = url.endsWith('/') ? `${url}embed` : `${url}/embed`;
            
            return (
              <div key={idx} className="relative group bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-700 shadow-2xl flex flex-col h-full">
                {/* Container do Video Iframe */}
                <div className="w-full aspect-[9/16] relative">
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    allow="encrypted-media"
                    title={`Instagram Video ${idx + 1}`}
                  ></iframe>
                </div>

                {/* Footer do Card */}
                <div className="p-6 bg-black/40 backdrop-blur-md border-t border-white/5 flex flex-col items-center justify-center gap-4 flex-1">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                      <span className="text-amber-500 text-[9px] font-black uppercase tracking-widest">Vídeo em Destaque</span>
                   </div>
                   <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full gold-bg text-black text-[10px] font-black py-3 px-6 rounded-xl transition-all uppercase tracking-widest text-center hover:shadow-[0_0_20px_rgba(191,149,63,0.3)] active:scale-95"
                  >
                    Ver no Instagram
                  </a>
                </div>

                {/* Overlay decorativo de hover */}
                <div className="absolute top-4 right-4 text-amber-500/50 pointer-events-none group-hover:text-amber-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;