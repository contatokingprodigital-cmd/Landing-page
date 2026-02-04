import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface FeedbackItem {
  url: string;
  caption: string;
  alt: string;
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
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  
  // Methodology
  methodologyTitle: string;
  methodologySubtitle: string;
  methodologyPersuasiveText: string;
  
  // Partners
  partnersTitle: string;
  partnerLogos: string[];
  
  // Plans
  plansSectionTitle: string;
  plansSectionSubtitle: string;
  plans: Plan[];
  
  // Feedback
  feedbackSectionTitle: string;
  feedbackSectionSubtitle: string;
  feedbacks: FeedbackItem[];
  feedbackButtonText: string;
  
  // Contact & Final CTA
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactButtonText: string;
  finalCtaQuestion: string;
  finalCtaOffer: string;
  finalCtaPath: string;
  finalCtaButton: string;
  
  // Links & Global
  whatsappLink: string;
  contactEmail: string;
  instagramHandle: string;
  footerDescription: string;
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
  heroTitle: "Mais clientes mais vendas. Tráfego pago com estratégia.",
  heroSubtitle: "Na King Pro Digital, não apertamos botões. Construímos máquinas de vendas previsíveis através de tráfego pago estratégico e inteligência de dados.",
  heroImage: "https://i.ibb.co/jZy4rCHY/king-logo.png",
  
  methodologyTitle: "A Metodologia de Elite da King Pro.",
  methodologySubtitle: "Estratégia, Escala e Lucratividade.",
  methodologyPersuasiveText: "Enquanto amadores focam em cliques, nós focamos em faturamento. Nossa abordagem estratégica garante que cada centavo investido retorne com lucro para sua operação.",
  
  partnersTitle: "Empresas que escalam com nossa gestão",
  partnerLogos: [
    "https://i.ibb.co/V0NNG69z/IMG-0559.png",
    "https://i.ibb.co/PZyKvyt9/qmoveis.png",
    "https://i.ibb.co/3yC820sG/A1-removebg-preview.png",
    "https://i.ibb.co/bR7CKrGd/290010175-3186303611586221-5368347137890691665-n-removebg-preview.png",
    "https://i.ibb.co/FLBv7Mq5/12-removebg-preview.png",
    "https://i.ibb.co/1tnd86WN/Design-sem-nome-1-removebg-preview.png",
    "https://i.ibb.co/dw8SK2sz/Design-sem-nome-3.png",
    "https://i.ibb.co/WvrNbsX2/cockpit.png",
    "https://i.ibb.co/53sYPMf/Design-sem-nome.png"
  ],
  
  plansSectionTitle: "Planos de Dominação Digital",
  plansSectionSubtitle: "Escolha o nível de aceleração que seu negócio precisa para escalar com lucro.",
  plans: [
    { 
      name: "King Start", 
      description: "Ideal para empresas que querem começar com anúncios de forma estratégica.",
      contract: "12 meses",
      price: "Sob Consulta",
      popular: false, 
      features: ["Gestão Meta Ads ou Google Ads", "Planejamento Estratégico", "Otimizações Contínuas"] 
    },
    { 
      name: "King Pro", 
      description: "Para negócios que querem estrutura, automação e presença digital sólida.",
      contract: "6 meses",
      price: "Sob Consulta",
      popular: true, 
      features: ["Inclui King Start +", "Landing Page Profissional", "Atendente Virtual WhatsApp"] 
    },
    { 
      name: "King Master", 
      description: "Solução completa para escalar vendas com tráfego e automação.",
      contract: "6 meses",
      price: "Sob Consulta",
      popular: false, 
      features: ["Inclui King Pro +", "Meta + Google Ads", "Funil e Script de Vendas"] 
    },
  ],
  
  feedbackSectionTitle: "A Voz de quem Cresce Conosco",
  feedbackSectionSubtitle: "Não vendemos promessas, entregamos faturamento real. Veja abaixo conversas diretas com nossos clientes.",
  feedbackButtonText: "QUERO RESULTADOS ASSIM NO MEU NEGÓCIO",
  feedbacks: [
    { url: "https://i.ibb.co/93YW9FSR/1.png", caption: "ROI Exponencial em 30 dias", alt: "Feedback 1" },
    { url: "https://i.ibb.co/BHGbw8cM/2.png", caption: "R$ 41.229,00 em Vendas Brutas", alt: "Feedback 2" },
    { url: "https://i.ibb.co/DHmPzcvt/3.png", caption: "Relatório Mensal: R$ 16.569,00", alt: "Feedback 3" }
  ],
  
  contactSectionTitle: "Pronto para ser o próximo Líder do seu nicho?",
  contactSectionSubtitle: "Deixe seus dados abaixo e nossa equipe entrará em contato para agendar seu briefing.",
  contactButtonText: "Quero uma Consultoria",

  finalCtaQuestion: "Quer saber se o tráfego pago funciona para o seu negócio?",
  finalCtaOffer: "Agende agora uma análise estratégica gratuita.",
  finalCtaPath: "Vamos olhar seus números, seu mercado e te mostrar o caminho mais curto até mais vendas.",
  finalCtaButton: "Quero agendar minha análise gratuita",
  
  whatsappLink: "https://wa.me/5551993781978",
  contactEmail: "contatokingprodigital@gmail.com",
  instagramHandle: "kingprodigital",
  footerDescription: "Transformando negócios em autoridades digitais através do tráfego pago de alta performance. Sua presença online levada ao nível máximo.",
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('kingpro_content_v40');
    if (saved) return { ...defaultContent, ...JSON.parse(saved) };
    return defaultContent;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('kingpro_leads');
    return saved ? JSON.parse(saved) : [];
  });

  const [analytics, setAnalytics] = useState<Analytics>(() => {
    const saved = localStorage.getItem('kingpro_analytics');
    return saved ? JSON.parse(saved) : { pageViews: 0, buttonClicks: {} };
  });

  const [pixels, setPixels] = useState<Pixels>(() => {
    const saved = localStorage.getItem('kingpro_pixels');
    return saved ? JSON.parse(saved) : { googlePixel: '', metaPixel: '' };
  });

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('kingpro_content_v40', JSON.stringify(newContent));
  };

  const updatePixels = (newPixels: Pixels) => {
    setPixels(newPixels);
    localStorage.setItem('kingpro_pixels', JSON.stringify(newPixels));
  };

  const resetToDefault = () => {
    if(confirm("Deseja realmente resetar tudo para o padrão?")) {
      localStorage.removeItem('kingpro_content_v40');
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