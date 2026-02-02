import React from 'react';
import { useSite } from '../SiteContext';

const WhatWeDo: React.FC = () => {
  const { content } = useSite();

  return (
    <section id="servicos" className="py-24 bg-black scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-amber-500/30 rounded-full text-amber-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em]">
            Expertise de Elite
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-title text-white">{content.servicesTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">{content.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {content.services.map((service, idx) => (
            <div 
              key={idx} 
              className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-amber-500/40 transition-all duration-500 group flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gold-bg flex items-center justify-center text-black font-black text-xl shadow-lg shrink-0">
                  {idx + 1}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:gold-gradient transition-all uppercase tracking-tight font-title">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;