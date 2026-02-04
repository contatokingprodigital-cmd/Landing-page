
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
  // Fix: Added missing Final CTA fields to SiteContent interface to satisfy components/FinalCTA.tsx requirements
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
    { title: "Criação de Criativos ou Scripts de Alta Conversão", description: "Desenvolvemos anúncios magnéticos com copy persuasiva e design focado em reter a atenção do cliente." },
    { title: "Landing Pages", description: "Estruturamos a jornada do cliente desde o clique até a conversão final." },
    { title: "Relatórios Automatizados", description: "Transparencia total dos resultados, para que você saiba exatamente de onde vem cada centavo de lucro." }
  ],

  instagramSectionTitle: "King Pro em Ação",
  instagramSectionSubtitle: "Acompanhe nossos bastidores, estratégias exclusivas e o lifestyle da agência que domina o tráfego pago.",
  instagramVideoUrls: [
    "https://www.instagram.com/p/DQMpHg5kff6/",
    "https://www.instagram.com/p/DPtypF4ABnG",
    "https://www.instagram.com/p/DUD8sTUAK5W/"
  ],

  feedbackSectionTitle: "A Voz de quem Cresce Conosco",
  feedbackSectionSubtitle: "Não vendemos promessas, entregamos faturamento real. Veja abaixo conversas diretas com nossos clientes.",
  feedbackButtonText: "QUERO RESULTADOS ASSIM NO MEU NEGÓCIO",
  feedbacks: [
    { url: "https://i.ibb.co/93YW9FSR/1.png", caption: "Representação de 30% do faturamento", alt: "Feedback 1" },
    { url: "https://i.ibb.co/BHGbw8cM/2.png", caption: "R$ 41.229,00 em Vendas Brutas", alt: "Feedback 2" },
    { url: "https://i.ibb.co/DHmPzcvt/3.png", caption: "Relatório Mensal: R$ 16.569,00", alt: "Feedback 3" }
  ],
  
  contactSectionTitle: "Pronto para ser o próximo Líder do seu nicho?",
  contactSectionSubtitle: "Deixe seus dados abaixo e nossa equipe entrará em contato para agendar seu briefing.",
  contactButtonText: "Quero uma Consultoria",
  
  whatsappLink: "https://wa.me/5551993781978",
  contactEmail: "contatokingprodigital@gmail.com",
  instagramHandle: "kingprodigital",
  footerDescription: "Transformando negócios em autoridades digitais através do tráfego pago de alta performance. Sua presença online levada ao nível máximo.",

  processTitle: "Nosso Processo King Pro",
  processSubtitle: "Como levamos sua empresa ao próximo nível.",
  processSteps: [
    { icon: "🔍", title: "Análise e Diagnóstico", desc: "Mergulhamos no seu negócio para entender seu público e suas métricas atuais." },
    { icon: "🛠️", title: "Configuração Estratégica", desc: "Implementamos rastreamento e preparamos as contas para a escala." },
    { icon: "🚀", title: "Lançamento e Escala", desc: "Ativamos as campanhas e otimizamos diariamente para buscar o melhor lucro." }
  ],

  transparencyTitle: "100% Transparência com Seu Capital",
  transparencySubtitle: "Você sempre tem o controle total sobre onde e como seu dinheiro está sendo investido.",
  transparencyItem1Title: "Acesso Direto",
  transparencyItem1Desc: "As contas de anúncios são suas. Você visualiza cada centavo investido em tempo real.",
  transparencyItem2Title: "Relatórios Claros",
  transparencyItem2Desc: "Nada de métricas de vaidade. Focamos no que importa: Leads, Vendas e ROI.",

  plansSectionLabel: "Planos de Dominação Digital",
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
  // Fix: Added missing Final CTA default values to defaultContent to ensure compilation in FinalCTA component
  finalCtaQuestion: "Quer saber se o tráfego pago funciona para o seu negócio?",
  finalCtaOffer: "Agende agora uma análise estratégica gratuita.",
  finalCtaPath: "Vamos olhar seus números, seu mercado e te mostrar o caminho mais curto até mais vendas.",
  finalCtaButton: "Quero agendar minha análise gratuita",
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('kingpro_content_v11');
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
    localStorage.setItem('kingpro_content_v11', JSON.stringify(newContent));
  };

  const updatePixels = (newPixels: Pixels) => {
    setPixels(newPixels);
    localStorage.setItem('kingpro_pixels', JSON.stringify(newPixels));
  };

  const resetToDefault = () => {
    if(confirm("Deseja realmente resetar tudo para o padrão?")) {
      localStorage.removeItem('kingpro_content_v11');
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
