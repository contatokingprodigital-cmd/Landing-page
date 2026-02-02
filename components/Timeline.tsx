import React from 'react';
import { useSite } from '../SiteContext';

const Methodology: React.FC = () => {
  const { content } = useSite();

  const pillars = content.pillars || [
    {
      icon: "📊",
      title: "Inteligência de Dados",
      desc: "Não operamos no escuro. Nossas decisões são baseadas em métricas reais e ferramentas de tracking avançadas para maximizar seu ROI."
    },
    {
      icon: "🎯",
      title: "Criativos de Alta Retenção",
      desc: "Desenvolvemos anúncios que param o scroll e obrigam o seu cliente ideal a clicar através de gatilhos psicológicos validados."
    },
    {
      icon: "🚀",
      title: "Escala Previsível",
      desc: "Estruturamos funis de vendas preparados para receber investimento agressivo e gerar lucro constante e sustentável."
    },
    {
      icon: "👑",
      title: "Gestão de Elite",
      desc: "Acompanhamento diário por especialistas que entendem de estratégia de negócio, não apenas de ferramentas."
    }
  ];

  return (
    <section id="metodo" className="py-24 relative overflow-hidden bg-black scroll-mt-20">
      {/* Elementos Decorativos */}
      <div className="absolute -left-20 top-0 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Lado Esquerdo: Texto Persuasivo */}
          <div className="lg:w-1/2 text-left space-y-8">
            <div className="inline-block px-4 py-1 border border-amber-500/30 rounded-full text-amber-500 text-xs font-bold uppercase tracking-[0.3em]">
              {content.methodologyLabel || "O Método King Pro"}
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-white">
              {content.methodologyTitle.split('.').map((line, i) => (
                <React.Fragment key={i}>
                  {i === 0 ? line + '.' : <span className="gold-gradient">{line}</span>}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              {content.methodologyPersuasiveText}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gold-bg flex items-center justify-center text-black font-black text-xl shadow-lg">
                  100%
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 leading-tight">Foco em <br/> Performance</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-amber-500 flex items-center justify-center text-amber-500 font-black text-xl">
                  24h
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 leading-tight">Monitoramento <br/> Estratégico</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Pilares Estratégicos */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="glass-card p-8 rounded-[2rem] border-white/5 group hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="text-3xl mb-4 bg-zinc-900 w-14 h-14 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{pillar.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black">{content.methodologySubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;