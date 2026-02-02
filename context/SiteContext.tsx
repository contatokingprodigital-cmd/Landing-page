
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
  
  // Contact
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactButtonText: string;
  
  // Links & Global
  whatsappLink: string;
  contactEmail: string;
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
  heroTitle: "Sua Empresa No Lugar Certo, No Momento Certo.",
  heroSubtitle: "Pare de depender da sorte. Na King Pro Digital, transformamos anúncios em máquinas de vendas através de tráfego pago estratégico e baseado em dados.",
  heroImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/king-pro-logo.png",
  
  methodologyTitle: "A Metodologia que Separa Amadores de Profissionais.",
  methodologySubtitle: "Os 4 Pilares da Dominação Digital King Pro.",
  methodologyPersuasiveText: "Enquanto outros focam em 'cliques', nós focamos em lucro. Nossa estratégia é desenhada para negócios que não aceitam resultados medianos e buscam escala real no faturamento.",
  
  partnersTitle: "Empresas que confiam na nossa gestão",
  partnerLogos: [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_logo_%282012%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
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
    { url: "https://picsum.photos/600/800?random=1", caption: "Representação de 30% do faturamento", alt: "Feedback 1" },
    { url: "https://picsum.photos/600/800?random=2", caption: "R$ 41.229,00 em Vendas Brutas", alt: "Feedback 2" },
    { url: "https://picsum.photos/600/800?random=3", caption: "Relatório Mensal: R$ 16.569,00", alt: "Feedback 3" }
  ],
  
  contactSectionTitle: "Pronto para ser o próximo Líder do seu nicho?",
  contactSectionSubtitle: "Deixe seus dados abaixo e nossa equipe entrará em contato para agendar seu briefing.",
  contactButtonText: "Quero uma Consultoria",
  
  whatsappLink: "https://wa.me/5551993781978",
  contactEmail: "contatokingprodigital@gmail.com",
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('kingpro_content_v5');
    if (saved) {
        const parsed = JSON.parse(saved);
        return {
            ...defaultContent,
            ...parsed
        };
    }
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
    localStorage.setItem('kingpro_content_v5', JSON.stringify(newContent));
  };

  const updatePixels = (newPixels: Pixels) => {
    setPixels(newPixels);
    localStorage.setItem('kingpro_pixels', JSON.stringify(newPixels));
  };

  const resetToDefault = () => {
    if(confirm("Deseja realmente resetar tudo para o padrão? Isso removerá suas personalizações.")) {
      localStorage.removeItem('kingpro_content_v5');
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
