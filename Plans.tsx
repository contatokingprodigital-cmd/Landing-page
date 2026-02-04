import React from 'react';
import { useSite } from './SiteContext';

const Plans: React.FC = () => {
  const { content, trackEvent } = useSite();

  return (
    <section id="planos" className="py-24 bg-zinc-950 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-amber-500/30 rounded-full text-amber-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em]">
            {content.plansSectionLabel}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.plansSectionTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{content.plansSectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 group ${
                plan.popular 
                ? 'bg-zinc-900 border-2 border-amber-500 scale-105 shadow-[0_0_50px_rgba(191,149,63,0.1)] z-10' 
                : 'glass-card border-white/10 hover:border-amber-500/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gold-bg text-black text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                  RECOMENDADO
                </div>
              )}
              
              <div className="mb-8 text-center">
                <h3 className={`text-2xl font-black mb-2 ${plan.popular ? 'gold-gradient' : 'text-white'}`}>{plan.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed h-12 px-2">{plan.description}</p>
              </div>

              <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Modelo de Contratação</p>
                <p className="text-2xl font-black text-amber-500 mb-2">{plan.price}</p>
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Comprometimento: {plan.contract}</p>
              </div>
              
              <ul className="flex-1 space-y-4 mb-10">
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} className="text-xs text-gray-300 flex items-start gap-3">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`${content.whatsappLink}?text=Olá! Quero saber mais sobre o plano ${plan.name} da King Pro.`}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackEvent(`plan_click_${plan.name.toLowerCase().replace(/\s/g, '_')}`)}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-center transition-all shadow-xl ${
                  plan.popular ? 'gold-bg text-black hover:scale-[1.02] active:scale-95' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;