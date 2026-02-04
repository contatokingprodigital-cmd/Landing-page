
import React, { createContext, useContext, useCallback } from 'react';

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

export interface ServiceItem {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProcessStep {
  icon: string;
  title: string;
  desc: string;
}

export interface Pixels {
  googlePixel: string;
  metaPixel: string;
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
  whatsappLink: string;
  contactEmail: string;
  instagramHandle: string;
  footerDescription: string;
  finalCtaQuestion: string;
  finalCtaOffer: string;
  finalCtaPath: string;
  finalCtaButton: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];
  transparencyTitle: string;
  transparencySubtitle: string;
  transparencyItem1Title: string;
  transparencyItem1Desc: string;
  transparencyItem2Title: string;
  transparencyItem2Desc: string;
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactButtonText: string;
}

const content: SiteContent = {
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
    { 
      title: "Gestão Estratégica de Tráfego", 
      description: "Configuramos e otimizamos suas campanhas no Meta Ads (Instagram/Facebook) e Google Ads com foco total em ROI e CPA baixo.",
      imageUrl: "https://i.ibb.co/0pYFWGYP/Sem-nome-1000-x-800-px.png"
    },
    { 
      title: "Criação de Criativos", 
      description: "Desenvolvemos anúncios magnéticos com copy persuasiva e design focado em reter a atenção do cliente.",
      imageUrl: "https://i.ibb.co/r2Ndyr8x/Gemini-Generated-Image-jhk8u3jhk8u3jhk8.png" 
    },
    { 
      title: "Landing Pages", 
      description: "Criamos páginas para anúncios com alta captura de leads e conversões",
      imageUrl: "https://i.ibb.co/1YzMSN1M/Gemini-Generated-Image-b01arab01arab01a.png"
    },
    { 
      title: "Relatórios Automatizados", 
      description: "Transparencia total dos resultados para que você saiba exatamente seu lucro.",
      imageUrl: "https://i.ibb.co/GNJjyF1/Design-sem-nome.png"
    }
  ],
  instagramSectionTitle: "King Pro em Ação",
  instagramSectionSubtitle: "Acompanhe nossos bastidores e estratégias exclusivas.",
  instagramVideoUrls: ["https://www.instagram.com/p/DBitf15R-6P/"],
  feedbackSectionTitle: "A Voz de quem Cresce Conosco",
  feedbackSectionSubtitle: "Veja abaixo conversas diretas com nossos clientes.",
  feedbackButtonText: "QUERO RESULTADOS ASSIM NO MEU NEGÓCIO",
  feedbacks: [
    { url: "https://i.ibb.co/93YW9FSR/1.png", caption: "Representação de 30% do faturamento", alt: "Feedback 1" },
    { url: "https://i.ibb.co/BHGbw8cM/2.png", caption: "R$ 41.229,00 em Vendas Brutas", alt: "Feedback 2" },
    { url: "https://i.ibb.co/DHmPzcvt/3.png", caption: "Relatório Mensal: R$ 16.569,00", alt: "Feedback 3" }
  ],
  whatsappLink: "https://wa.me/5551993781978",
  contactEmail: "contatokingprodigital@gmail.com",
  instagramHandle: "kingprodigital",
  footerDescription: "Transformando negócios em autoridades digitais através do tráfego pago de alta performance.",
  finalCtaQuestion: "Quer saber se funciona para você?",
  finalCtaOffer: "Análise estratégica gratuita.",
  finalCtaPath: "Mostramos o caminho mais curto até as vendas.",
  finalCtaButton: "Quero agendar minha análise",
  processTitle: "Processo King Pro de Dominação",
  processSubtitle: "Três etapas simples para escalar seu faturamento com previsibilidade.",
  processSteps: [
    { icon: "🔎", title: "Diagnóstico", desc: "Analisamos seu mercado e concorrentes." },
    { icon: "⚙️", title: "Engenharia", desc: "Configuramos suas campanhas e ferramentas de rastreio." },
    { icon: "📈", title: "Escalabilidade", desc: "Otimização diária para baixar seu custo por venda." }
  ],
  transparencyTitle: "Total Transparência",
  transparencySubtitle: "Relacionamento baseado em resultados reais, sem letras miúdas.",
  transparencyItem1Title: "Acesso à Conta",
  transparencyItem1Desc: "Você tem controle total sobre seu investimento e contas.",
  transparencyItem2Title: "Relatórios de Lucro",
  transparencyItem2Desc: "Focamos em métricas que realmente importam: ROI e ROAS.",
  contactSectionTitle: "Pronto para ser o próximo Líder?",
  contactSectionSubtitle: "Deixe seus dados e nossa equipe entrará em contato.",
  contactButtonText: "Quero uma Consultoria",
};

interface SiteContextType {
  content: SiteContent;
  pixels: Pixels;
  trackEvent: (eventName: string) => void;
  addLead: (lead: any) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const addLead = useCallback((lead: any) => {
    console.log(`[King Pro Lead]:`, lead);
  }, []);

  const trackEvent = useCallback((eventName: string) => {
    console.log(`[King Pro Analytics]: ${eventName}`);
  }, []);

  const pixels: Pixels = {
    googlePixel: "",
    metaPixel: ""
  };

  return (
    <SiteContext.Provider value={{ content, pixels, trackEvent, addLead }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
