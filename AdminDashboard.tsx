
import React, { useState, useEffect, useRef } from 'react';
import { useSite, SiteContent, Pixels, Plan, Pillar, ProcessStep } from './SiteContext';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { content, leads, analytics, pixels, updateContent, updatePixels, resetToDefault } = useSite();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'leads' | 'pixels'>('analytics');
  
  const [tempContent, setTempContent] = useState<SiteContent>(content);
  const [tempPixels, setTempPixels] = useState<Pixels>(pixels);
  const [isSaving, setIsSaving] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const partnerInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setTempContent(content);
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '@Vikod2012') setIsAuthorized(true);
    else alert('Senha incorreta!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'logo' | { type: 'feedback' | 'partner', index: number }) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { return alert("Arquivo muito grande! Máximo 2MB."); }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (target === 'logo') setTempContent({ ...tempContent, heroImage: base64 });
        else if (target.type === 'feedback') {
          const n = [...tempContent.feedbacks];
          n[target.index] = { ...n[target.index], url: base64 };
          setTempContent({ ...tempContent, feedbacks: n });
        } else if (target.type === 'partner') {
          const n = [...tempContent.partnerLogos];
          n[target.index] = base64;
          setTempContent({ ...tempContent, partnerLogos: n });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPartner = () => {
    setTempContent({
      ...tempContent,
      partnerLogos: [...tempContent.partnerLogos, "https://via.placeholder.com/150?text=Logo"]
    });
  };

  const handleRemovePartner = (index: number) => {
    const newLogos = tempContent.partnerLogos.filter((_, i) => i !== index);
    setTempContent({ ...tempContent, partnerLogos: newLogos });
  };

  const handleUpdatePillar = (index: number, field: keyof Pillar, value: string) => {
    const n = [...tempContent.pillars];
    n[index] = { ...n[index], [field]: value };
    setTempContent({ ...tempContent, pillars: n });
  };

  const handleUpdateProcessStep = (index: number, field: keyof ProcessStep, value: string) => {
    const n = [...tempContent.processSteps];
    n[index] = { ...n[index], [field]: value };
    setTempContent({ ...tempContent, processSteps: n });
  };

  const handlePlanChange = (idx: number, field: keyof Plan, value: any) => {
    const n = [...tempContent.plans];
    n[idx] = { ...n[idx], [field]: value };
    setTempContent({ ...tempContent, plans: n });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateContent(tempContent);
      setIsSaving(false);
      alert('✅ Alterações publicadas com sucesso!');
    }, 500);
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center p-4">
        <div className="glass-card p-10 rounded-[2.5rem] w-full max-w-md text-center border-amber-500/30">
          <h2 className="text-3xl font-black mb-2 gold-gradient uppercase tracking-widest font-title">King Admin</h2>
          <form onSubmit={handleLogin} className="space-y-5 mt-8">
            <input type="password" placeholder="Senha Master" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-amber-500 outline-none text-center text-white tracking-widest" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
            <button type="submit" className="w-full gold-bg text-black font-black py-5 rounded-2xl shadow-xl uppercase tracking-widest hover:scale-105 transition-transform">ENTRAR</button>
            <button type="button" onClick={onClose} className="text-gray-600 text-xs uppercase hover:text-white mt-4 block mx-auto tracking-widest">Sair</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col font-sans overflow-hidden">
      <div className="bg-zinc-900 border-b border-white/10 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-black gold-gradient uppercase tracking-widest font-title">Editor King Pro</h1>
          <nav className="flex gap-2 bg-black/40 p-1 rounded-xl">
            {(['analytics', 'content', 'leads', 'pixels'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all tracking-widest ${activeTab === tab ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}>
                {tab === 'analytics' ? 'Dashboard' : tab === 'content' ? 'Site' : tab === 'leads' ? 'Leads' : 'SEO/Pixel'}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={resetToDefault} className="text-[10px] text-red-500/50 hover:text-red-500 uppercase tracking-widest font-bold">Reset Padrão</button>
          <button onClick={onClose} className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-zinc-950 scroll-smooth">
        <div className="max-w-5xl mx-auto space-y-12 pb-40">
          
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="glass-card p-10 rounded-[2rem] text-center border-white/5 shadow-2xl"><p className="text-gray-500 text-[10px] uppercase mb-4 tracking-widest font-bold">Visitas Totais</p><p className="text-7xl font-black font-title leading-none">{analytics.pageViews}</p></div>
              <div className="glass-card p-10 rounded-[2rem] text-center border-amber-500/20 shadow-2xl"><p className="text-amber-500/50 text-[10px] uppercase mb-4 tracking-widest font-bold">Conversões WhatsApp</p><p className="text-7xl font-black font-title text-amber-500 leading-none">{analytics.buttonClicks['whatsapp_click'] || analytics.buttonClicks['whatsapp_floating_click'] || 0}</p></div>
              <div className="glass-card p-10 rounded-[2rem] text-center border-white/5 shadow-2xl"><p className="text-gray-500 text-[10px] uppercase mb-4 tracking-widest font-bold">Leads Formulário</p><p className="text-7xl font-black font-title leading-none">{leads.length}</p></div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-20 animate-fade-in">
              {/* SECTION: HERO */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">1. Seção de Impacto (Hero)</h2>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-48 h-48 bg-black/60 border border-white/10 rounded-3xl flex items-center justify-center p-6 overflow-hidden relative group">
                      <img src={tempContent.heroImage} className="max-h-full max-w-full object-contain" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <button onClick={() => logoInputRef.current?.click()} className="text-[10px] font-black uppercase gold-bg text-black px-4 py-2 rounded-lg">Trocar</button>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div>
                        <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">URL do Logo</label>
                        <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs font-mono" value={tempContent.heroImage} onChange={e => setTempContent({...tempContent, heroImage: e.target.value})} />
                      </div>
                      <input type="file" className="hidden" ref={logoInputRef} onChange={e => handleFileChange(e, 'logo')} />
                    </div>
                  </div>
                  <div className="grid gap-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Título Principal (Hero)</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-bold" value={tempContent.heroTitle} onChange={e => setTempContent({...tempContent, heroTitle: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Subtítulo Hero</label>
                      <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm h-32 leading-relaxed" value={tempContent.heroSubtitle} onChange={e => setTempContent({...tempContent, heroSubtitle: e.target.value})} />
                    </div>
                  </div>
                </div>
              </section>

              {/* ... Outras seções continuam iguais ... */}
              <div className="sticky bottom-6 z-30">
                <button onClick={handleSave} disabled={isSaving} className="w-full gold-bg text-black font-black py-7 rounded-[2rem] shadow-[0_20px_50px_rgba(191,149,63,0.4)] uppercase tracking-widest text-xl transition-all active:scale-95 font-title">
                  {isSaving ? 'SALVANDO ALTERAÇÕES...' : '🚀 PUBLICAR AGORA'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'pixels' && (
            <div className="space-y-10 animate-fade-in">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">Configurações de SEO</h2>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest">Controle como sua agência aparece no Google e nas redes sociais.</p>
              </div>

              <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-6">
                <div>
                  <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Título da Página (Meta Title)</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.seoTitle} onChange={e => setTempContent({...tempContent, seoTitle: e.target.value})} placeholder="Ex: King Pro Digital | Tráfego Pago de Elite" />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Descrição SEO (Meta Description)</label>
                  <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm h-24" value={tempContent.seoDescription} onChange={e => setTempContent({...tempContent, seoDescription: e.target.value})} placeholder="Resumo de 160 caracteres para o Google..." />
                </div>
              </div>
              
              <div className="text-center max-w-2xl mx-auto space-y-4 mt-12">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">Scripts de Rastreamento</h2>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest">Cole seus scripts de Facebook Pixel e Google Analytics abaixo.</p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase text-gray-500 font-black tracking-widest block">Meta Pixel (Facebook Ads)</label>
                  <textarea className="w-full bg-black/60 border border-white/10 rounded-3xl p-8 h-48 font-mono text-xs text-amber-100/60 focus:border-amber-500 outline-none transition-all shadow-2xl" placeholder="<!-- Meta Pixel Code -->..." value={tempPixels.metaPixel} onChange={e => setTempPixels({...tempPixels, metaPixel: e.target.value})} />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase text-gray-500 font-black tracking-widest block">Google Tag Manager / Analytics</label>
                  <textarea className="w-full bg-black/60 border border-white/10 rounded-3xl p-8 h-48 font-mono text-xs text-amber-100/60 focus:border-amber-500 outline-none transition-all shadow-2xl" placeholder="<!-- Google tag (gtag.js) -->..." value={tempPixels.googlePixel} onChange={e => setTempPixels({...tempPixels, googlePixel: e.target.value})} />
                </div>
                
                <button onClick={() => { updatePixels(tempPixels); handleSave(); }} className="w-full gold-bg text-black font-black py-6 rounded-[2rem] uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-transform font-title text-lg">ATUALIZAR SEO E RASTREAMENTO</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
