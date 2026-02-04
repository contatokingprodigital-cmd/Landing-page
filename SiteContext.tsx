
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface FeedbackItem {
  url: string;
  caption: string;
  alt: string;
}

export interface Pillar {
  icon: string;
  title: string;
  desc: string;
}

export interface ProcessStep {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface Plan {
  name: string;
  description: string;
  features: string[];
  contract: string;
  price: string;
  popular: boolean;
}

export interface SiteContent {
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  methodologyLabel: string;
  methodologyTitle: string;
  methodologyPersuasiveText: string;
  methodologySubtitle: string;
  pillars: Pillar[];
  partnersTitle: string;
  partnerLogos: string[];
  servicesTitle: string;
  servicesSubtitle: string;
  services: ServiceItem[];
  instagramSectionTitle: string;
  instagramSectionSubtitle: string;
  instagramVideoUrls: string[];
  feedbackSectionTitle: string;
  feedbackSectionSubtitle: string;
  feedbacks: FeedbackItem[];
  feedbackButtonText: string;
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactButtonText: string;
  whatsappLink: string;
  contactEmail: string;
  instagramHandle: string;
  footerDescription: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];
  transparencyTitle: string;
  transparencySubtitle: string;
  transparencyItem1Title: string;
  transparencyItem1Desc: string;
  transparencyItem2Title: string;
  transparencyItem2Desc: string;
  plansSectionLabel: string;
  plansSectionTitle: string;
  plansSectionSubtitle: string;
  plans: Plan[];
  finalCtaQuestion: string;
  finalCtaOffer: string;
  finalCtaPath: string;
  finalCtaButton: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface Analytics {
  pageViews: number;
  buttonClicks: Record<string, number>;
}

export interface Pixels {
  googlePixel: string;
  metaPixel: string;
}

interface SiteContextType {
  content: SiteContent;
  leads: Lead[];
  analytics: Analytics;
  pixels: Pixels;
  updateContent: (newContent: SiteContent) => void;
  updatePixels: (newPixels: Pixels) => void;
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  trackEvent: (eventName: string) => void;
  clearAnalytics: () => void;
  resetToDefault: () => void;
}

const defaultContent: SiteContent = {
  seoTitle: "King Pro Digital | Tráfego Pago Estratégico e Performance",
  seoDescription: "Pare de depender da sorte. Na King Pro Digital, construímos máquinas de vendas previsíveis através de tráfego pago estratégico e inteligência de dados.",
  heroTitle: "Mais clientes mais vendas. Tráfego pago com estratégia.",
  heroSubtitle: "Pare de depender da sorte. Na King Pro Digital, Nós não vendemos cliques. Criamos estratégias de tráfego pago focadas em faturamento previsível para negócios que querem crescer de verdade.",
  heroImage: "https://i.ibb.co/jZy4rCHY/king-logo.png",
  methodologyLabel: "O Método King Pro",
  methodologyTitle: "A Metodologia que Separa Amadores de Profissionais.",
  methodologyPersuasiveText: "Enquanto outros focam em 'cliques', nós focamos em lucro. Nossa estratégia é desenhada para negócios que não aceitam resultados medianos e buscam escala real no faturamento.",
  methodologySubtitle: "Os 4 Pilares da Dominação Digital King Pro.",
  pillars: [
    { icon: "📊", title: "Inteligência de Dados", desc: "Não operamos no escuro. Nossas decisões são baseadas em métricas reais e tracking avançado." },
    { icon: "🎯", title: "Criativos de Alta Retenção", desc: "Desenvolvemos anúncios que param a rolagem e obrigam o seu cliente ideal a clicar." },
    { icon: "🚀", title: "Escala Previsível", desc: "Estruturamos campanhas de vendas preparadas para receber investimento agressivo e gerar lucro." },
    { icon: "👑", title: "Gestão de Elite", desc: "Acompanhamento e otimizações diárias por especialistas que entendem de estratégia de negócio." }
  ],
  partnersTitle: "Empresas que confiam na nossa gestão",
  partnerLogos: [
    "https://i.ibb.co/V0NNG69z/IMG-0559.png",
    "https://i.ibb.co/PZyKvyt9/qmoveis.png",
    "https://i.ibb.co/3yC820sG/A1-removebg-preview.png",
    "https://i.ibb.co/bR7CKrGd/290010175-3186303611586221-5368347137890691665-n-removebg-preview.png",
    "https://i.ibb.co/FLBv7Mq5/12-removebg-preview.png",
    "https://i.ibb.co/1tnd86WN/Design-sem-nome-1-removebg-preview.png",
    "https://i.ibb.co/dw8SK2sz/Design-sem-nome-3.png",
    "https://i.ibb.co/WvrNbsX2/cockpit.png",
    "https://i.ibb.co/53sYPMf/Design-sem-nome.png",
    "https://i.ibb.co/67Jjcc3B/atacado-mr.png",
    "https://i.ibb.co/MDhX3dQm/mundi-m-veis.png"
  ],
  servicesTitle: "O que fazemos pelo seu negócio",
  servicesSubtitle: "Nossa atuação vai muito além de apertar botões. Construímos o ecossistema necessário para sua escala.",
  services: [
    { title: "Gestão Estratégica de Tráfego", description: "Configuramos e otimizamos suas campanhas no Meta Ads (Instagram/Facebook) e Google Ads com foco total em ROI e CPA baixo." },
    { title: "Criação de Criativos", description: "Desenvolvemos anúncios magnéticos com copy persuasiva e design focado em reter a atenção do cliente." },
    { title: "Landing Pages", description: "Estruturamos a jornada do cliente desde o clique até a conversão final." },
    { title: "Relatórios Automatizados", description: "Transparencia total dos resultados para que você saiba exatamente seu lucro." }
  ],
  instagramSectionTitle: "King Pro em Ação",
  instagramSectionSubtitle: "Acompanhe nossos bastidores e estratégias exclusivas.",
  instagramVideoUrls: ["https://www.instagram.com/p/DQMpHg5kff6/", "https://www.instagram.com/p/DPtypF4ABnG", "https://www.instagram.com/p/DUD8sTUAK5W/"],
  feedbackSectionTitle: "A Voz de quem Cresce Conosco",
  feedbackSectionSubtitle: "Veja abaixo conversas diretas com nossos clientes.",
  feedbackButtonText: "QUERO RESULTADOS ASSIM NO MEU NEGÓCIO",
  feedbacks: [
    { url: "https://i.ibb.co/93YW9FSR/1.png", caption: "Representação de 30% do faturamento", alt: "Feedback 1" },
    { url: "https://i.ibb.co/BHGbw8cM/2.png", caption: "R$ 41.229,00 em Vendas Brutas", alt: "Feedback 2" },
    { url: "https://i.ibb.co/DHmPzcvt/3.png", caption: "Relatório Mensal: R$ 16.569,00", alt: "Feedback 3" }
  ],
  contactSectionTitle: "Pronto para ser o próximo Líder?",
  contactSectionSubtitle: "Deixe seus dados e nossa equipe entrará em contato.",
  contactButtonText: "Quero uma Consultoria",
  whatsappLink: "https://wa.me/5551993781978",
  contactEmail: "contatokingprodigital@gmail.com",
  instagramHandle: "kingprodigital",
  footerDescription: "Transformando negócios em autoridades digitais através do tráfego pago de alta performance.",
  processTitle: "Nosso Processo King Pro",
  processSubtitle: "Como levamos sua empresa ao próximo nível.",
  processSteps: [
    { icon: "🔍", title: "Análise", desc: "Entendemos seu público e suas métricas." },
    { icon: "🛠️", title: "Estratégia", desc: "Preparamos as contas para a escala." },
    { icon: "🚀", title: "Escala", desc: "Otimizamos diariamente para lucro." }
  ],
  transparencyTitle: "100% Transparência",
  transparencySubtitle: "Controle total sobre seu investimento.",
  transparencyItem1Title: "Acesso Direto",
  transparencyItem1Desc: "Contas de anúncios são suas.",
  transparencyItem2Title: "Relatórios Claros",
  transparencyItem2Desc: "Focamos em Leads e Vendas.",
  plansSectionLabel: "Planos de Dominação",
  plansSectionTitle: "Planos de Dominação Digital",
  plansSectionSubtitle: "Escolha o nível de aceleração ideal.",
  plans: [
    { name: "King Start", description: "Início estratégico.", contract: "12 meses", price: "Sob Consulta", popular: false, features: ["Gestão Meta Ads", "Planejamento"] },
    { name: "King Pro", description: "Estrutura completa.", contract: "6 meses", price: "Sob Consulta", popular: true, features: ["King Start +", "Landing Page"] },
    { name: "King Master", description: "Escala agressiva.", contract: "6 meses", price: "Sob Consulta", popular: false, features: ["King Pro +", "Meta + Google"] },
  ],
  finalCtaQuestion: "Quer saber se funciona para você?",
  finalCtaOffer: "Análise estratégica gratuita.",
  finalCtaPath: "Mostramos o caminho mais curto até as vendas.",
  finalCtaButton: "Quero agendar minha análise",
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('kingpro_content_v12');
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('kingpro_leads');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [analytics, setAnalytics] = useState<Analytics>(() => {
    try {
      const saved = localStorage.getItem('kingpro_analytics');
      return saved ? JSON.parse(saved) : { pageViews: 0, buttonClicks: {} };
    } catch { return { pageViews: 0, buttonClicks: {} }; }
  });

  const [pixels, setPixels] = useState<Pixels>(() => {
    try {
      const saved = localStorage.getItem('kingpro_pixels');
      return saved ? JSON.parse(saved) : { googlePixel: '', metaPixel: '' };
    } catch { return { googlePixel: '', metaPixel: '' }; }
  });

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('kingpro_content_v12', JSON.stringify(newContent));
  };

  const updatePixels = (newPixels: Pixels) => {
    setPixels(newPixels);
    localStorage.setItem('kingpro_pixels', JSON.stringify(newPixels));
  };

  const resetToDefault = () => {
    if(confirm("Resetar site?")) {
      localStorage.removeItem('kingpro_content_v12');
      window.location.reload();
    }
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'date'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString('pt-BR'),
    };
    setLeads(prev => {
      const updated = [newLead, ...prev];
      localStorage.setItem('kingpro_leads', JSON.stringify(updated));
      return updated;
    });
  };

  const trackEvent = useCallback((eventName: string) => {
    setAnalytics(prev => {
      const updated = eventName === 'page_view' 
        ? { ...prev, pageViews: prev.pageViews + 1 }
        : { ...prev, buttonClicks: { ...prev.buttonClicks, [eventName]: (prev.buttonClicks[eventName] || 0) + 1 } };
      localStorage.setItem('kingpro_analytics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearAnalytics = () => {
    const reset = { pageViews: 0, buttonClicks: {} };
    setAnalytics(reset);
    localStorage.setItem('kingpro_analytics', JSON.stringify(reset));
  };

  return (
    <SiteContext.Provider value={{ content, leads, analytics, pixels, updateContent, updatePixels, addLead, trackEvent, clearAnalytics, resetToDefault }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
