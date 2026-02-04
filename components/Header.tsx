import React, { useState, useEffect } from 'react';
import { useSite } from '../SiteContext';

const Header: React.FC = () => {
  const { content, trackEvent } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Método', href: '#metodo' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Bastidores', href: '#instagram' },
    { name: 'Resultados', href: '#feedback' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <img 
            src={content.heroImage} 
            alt="King Pro Logo" 
            className="h-10 md:h-12 w-auto transition-transform group-hover:scale-110"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a 
            href={content.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('header_cta_click')}
            className="gold-bg text-black text-[10px] font-black px-6 py-3 rounded-xl uppercase tracking-widest hover:shadow-[0_0_20px_rgba(191,149,63,0.4)] transition-all"
          >
            Fale com Especialista
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 z-[90] lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-widest gold-gradient"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={content.whatsappLink}
            className="gold-bg text-black font-black px-10 py-4 rounded-2xl uppercase tracking-widest mt-4"
          >
            Fale com Especialista
          </a>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-500 uppercase text-xs tracking-widest mt-10"
          >
            Fechar Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;