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

              {/* SECTION: METHODOLOGY */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">2. Metodologia & Pilares</h2>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Tag/Label Seção</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.methodologyLabel} onChange={e => setTempContent({...tempContent, methodologyLabel: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Tagline (Final)</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.methodologySubtitle} onChange={e => setTempContent({...tempContent, methodologySubtitle: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Título da Seção</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-bold" value={tempContent.methodologyTitle} onChange={e => setTempContent({...tempContent, methodologyTitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Texto Persuasivo</label>
                    <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm h-32 leading-relaxed" value={tempContent.methodologyPersuasiveText} onChange={e => setTempContent({...tempContent, methodologyPersuasiveText: e.target.value})} />
                  </div>
                  
                  <h3 className="text-amber-500 font-black text-xs uppercase tracking-widest border-b border-white/5 pb-2">Configurar os 4 Pilares</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {tempContent.pillars.map((pillar, idx) => (
                      <div key={idx} className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex gap-4">
                          <input type="text" placeholder="Emoji/Icon" className="w-16 bg-black/60 p-3 rounded-lg text-lg text-center" value={pillar.icon} onChange={e => handleUpdatePillar(idx, 'icon', e.target.value)} />
                          <input type="text" placeholder="Título do Pilar" className="flex-1 bg-black/60 p-3 rounded-lg text-xs text-white font-bold" value={pillar.title} onChange={e => handleUpdatePillar(idx, 'title', e.target.value)} />
                        </div>
                        <textarea placeholder="Descrição curta" className="w-full bg-black/60 p-3 rounded-lg text-[10px] text-gray-400 h-20" value={pillar.desc} onChange={e => handleUpdatePillar(idx, 'desc', e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION: PARTNERS */}
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-black uppercase gold-gradient font-title">3. Parceiros Confiaveis</h2>
                   <button onClick={handleAddPartner} className="text-[10px] bg-amber-500/10 border border-amber-500 text-amber-500 px-5 py-2 rounded-xl font-black hover:bg-amber-500 hover:text-black transition-all">+ ADICIONAR LOGO</button>
                </div>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-6">
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Título do Carrossel</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.partnersTitle} onChange={e => setTempContent({...tempContent, partnersTitle: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tempContent.partnerLogos.map((logo, idx) => (
                      <div key={idx} className="relative space-y-2 group p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all">
                        <button onClick={() => handleRemovePartner(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center shadow-xl">✕</button>
                        <div className="h-16 bg-black/60 flex items-center justify-center p-3 rounded-xl">
                          <img src={logo} className="max-h-full grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
                        </div>
                        <input type="text" className="w-full bg-black/40 text-[9px] p-2 rounded border border-white/5 text-white font-mono" value={logo} onChange={e => {
                          const n = [...tempContent.partnerLogos]; n[idx] = e.target.value; setTempContent({...tempContent, partnerLogos: n});
                        }} />
                        <input type="file" className="hidden" ref={el => { partnerInputRefs.current[idx] = el; }} onChange={e => handleFileChange(e, {type: 'partner', index: idx})} />
                        <button onClick={() => partnerInputRefs.current[idx]?.click()} className="w-full text-[8px] uppercase bg-white/5 py-1.5 rounded-lg font-bold hover:bg-white/10 tracking-widest">Upload</button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION: PROCESS */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">4. Processo de Entrega</h2>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Título Processo</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-bold" value={tempContent.processTitle} onChange={e => setTempContent({...tempContent, processTitle: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Subtítulo Processo</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.processSubtitle} onChange={e => setTempContent({...tempContent, processSubtitle: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {tempContent.processSteps.map((step, idx) => (
                      <div key={idx} className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex gap-4">
                          <input type="text" placeholder="Icon" className="w-16 bg-black/60 p-3 rounded-lg text-lg text-center" value={step.icon} onChange={e => handleUpdateProcessStep(idx, 'icon', e.target.value)} />
                          <input type="text" placeholder="Título" className="flex-1 bg-black/60 p-3 rounded-lg text-xs text-white font-bold" value={step.title} onChange={e => handleUpdateProcessStep(idx, 'title', e.target.value)} />
                        </div>
                        <textarea placeholder="Descrição" className="w-full bg-black/60 p-3 rounded-lg text-[10px] text-gray-400 h-20" value={step.desc} onChange={e => handleUpdateProcessStep(idx, 'desc', e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION: TRANSPARENCY */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">5. Transparência & Capital</h2>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-8">
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Título Transparência</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-bold" value={tempContent.transparencyTitle} onChange={e => setTempContent({...tempContent, transparencyTitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Descrição Transparência</label>
                    <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm h-32 leading-relaxed" value={tempContent.transparencySubtitle} onChange={e => setTempContent({...tempContent, transparencySubtitle: e.target.value})} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                    <div className="space-y-4 p-6 bg-black/20 rounded-2xl">
                       <label className="text-[10px] uppercase text-amber-500 font-black tracking-widest">Pilar 1</label>
                       <input type="text" className="w-full bg-black/60 p-3 rounded-lg text-xs text-white font-bold" value={tempContent.transparencyItem1Title} onChange={e => setTempContent({...tempContent, transparencyItem1Title: e.target.value})} />
                       <textarea className="w-full bg-black/60 p-3 rounded-lg text-[10px] text-gray-400 h-20" value={tempContent.transparencyItem1Desc} onChange={e => setTempContent({...tempContent, transparencyItem1Desc: e.target.value})} />
                    </div>
                    <div className="space-y-4 p-6 bg-black/20 rounded-2xl">
                       <label className="text-[10px] uppercase text-amber-500 font-black tracking-widest">Pilar 2</label>
                       <input type="text" className="w-full bg-black/60 p-3 rounded-lg text-xs text-white font-bold" value={tempContent.transparencyItem2Title} onChange={e => setTempContent({...tempContent, transparencyItem2Title: e.target.value})} />
                       <textarea className="w-full bg-black/60 p-3 rounded-lg text-[10px] text-gray-400 h-20" value={tempContent.transparencyItem2Desc} onChange={e => setTempContent({...tempContent, transparencyItem2Desc: e.target.value})} />
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: PLANS */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">6. Gestão de Planos</h2>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-10">
                   <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Label Superior</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs" value={tempContent.plansSectionLabel} onChange={e => setTempContent({...tempContent, plansSectionLabel: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Título da Seção</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-bold" value={tempContent.plansSectionTitle} onChange={e => setTempContent({...tempContent, plansSectionTitle: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-12">
                    {tempContent.plans.map((plan, pIdx) => (
                      <div key={pIdx} className={`p-8 rounded-[2rem] border-2 transition-all ${plan.popular ? 'bg-zinc-900/60 border-amber-500/50' : 'bg-black/40 border-white/5'} space-y-6`}>
                        <div className="flex justify-between items-center">
                          <h4 className="font-black text-amber-500 uppercase tracking-widest text-xs">CARTÃO DO PLANO: {plan.name}</h4>
                          <label className="flex items-center gap-3 text-white text-[10px] font-bold cursor-pointer uppercase tracking-widest">
                            <input type="checkbox" className="w-4 h-4 rounded accent-amber-500" checked={plan.popular} onChange={e => handlePlanChange(pIdx, 'popular', e.target.checked)} /> Mais Popular
                          </label>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <input type="text" placeholder="Nome Comercial" className="bg-black/60 p-4 rounded-xl text-xs text-white font-bold" value={plan.name} onChange={e => handlePlanChange(pIdx, 'name', e.target.value)} />
                          <input type="text" placeholder="Preço Exibido" className="bg-black/60 p-4 rounded-xl text-xs text-amber-500 font-black" value={plan.price} onChange={e => handlePlanChange(pIdx, 'price', e.target.value)} />
                          <input type="text" placeholder="Comprometimento/Contrato" className="bg-black/60 p-4 rounded-xl text-xs text-white/50" value={plan.contract} onChange={e => handlePlanChange(pIdx, 'contract', e.target.value)} />
                          <input type="text" placeholder="Descrição Curta" className="bg-black/60 p-4 rounded-xl text-xs text-white" value={plan.description} onChange={e => handlePlanChange(pIdx, 'description', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase text-gray-600 font-black tracking-widest block mb-2">Lista de Benefícios (Separe por vírgula)</label>
                          <textarea className="w-full bg-black/60 p-4 rounded-xl text-xs text-white h-24 font-sans leading-relaxed" value={plan.features.join(', ')} onChange={e => handlePlanChange(pIdx, 'features', e.target.value.split(',').map(s => s.trim()))} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION: FEEDBACK */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">7. Resultados & Prova Social</h2>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-10">
                   <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Título Resultados" className="bg-black/40 p-4 rounded-xl text-sm text-white font-bold border border-white/5" value={tempContent.feedbackSectionTitle} onChange={e => setTempContent({...tempContent, feedbackSectionTitle: e.target.value})} />
                    <input type="text" placeholder="Subtítulo Explicativo" className="bg-black/40 p-4 rounded-xl text-xs text-white/60 border border-white/5" value={tempContent.feedbackSectionSubtitle} onChange={e => setTempContent({...tempContent, feedbackSectionSubtitle: e.target.value})} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {tempContent.feedbacks.map((f, idx) => (
                      <div key={idx} className="space-y-4 bg-black/40 p-5 rounded-3xl border border-white/5 group hover:border-amber-500/20 transition-all">
                        <div className="aspect-[3/4] bg-black/60 rounded-2xl overflow-hidden mb-2 relative">
                          <img src={f.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          <button onClick={() => feedbackInputRefs.current[idx]?.click()} className="absolute inset-0 m-auto w-fit h-fit gold-bg text-black text-[9px] font-black px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Trocar Print</button>
                        </div>
                        <div className="space-y-3">
                          <input type="text" className="w-full bg-black/60 p-2.5 text-[10px] text-white/50 rounded-lg border border-white/5 font-mono" value={f.url} onChange={e => {
                            const n = [...tempContent.feedbacks]; n[idx].url = e.target.value; setTempContent({...tempContent, feedbacks: n});
                          }} placeholder="URL do Print" />
                          <input type="text" className="w-full bg-black/60 p-2.5 text-[10px] text-white rounded-lg border border-white/5 font-bold" value={f.caption} onChange={e => {
                            const n = [...tempContent.feedbacks]; n[idx].caption = e.target.value; setTempContent({...tempContent, feedbacks: n});
                          }} placeholder="Título do Resultado" />
                        </div>
                        <input type="file" className="hidden" ref={el => { feedbackInputRefs.current[idx] = el; }} onChange={e => handleFileChange(e, {type: 'feedback', index: idx})} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Texto do Botão Call-to-Action</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs font-black uppercase tracking-widest" value={tempContent.feedbackButtonText} onChange={e => setTempContent({...tempContent, feedbackButtonText: e.target.value})} />
                  </div>
                </div>
              </section>

              {/* SECTION: FOOTER & LINKS */}
              <section className="space-y-6">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">8. Rodapé & Global</h2>
                <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-8">
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Bio/Descrição Curta do Rodapé</label>
                    <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm h-32 leading-relaxed" value={tempContent.footerDescription} onChange={e => setTempContent({...tempContent, footerDescription: e.target.value})} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Instagram (apenas o @handle)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">@</span>
                        <input type="text" className="w-full bg-black/40 border border-white/10 p-4 pl-8 rounded-xl text-white text-sm font-bold" value={tempContent.instagramHandle} onChange={e => setTempContent({...tempContent, instagramHandle: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">E-mail Corporativo</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm font-bold" value={tempContent.contactEmail} onChange={e => setTempContent({...tempContent, contactEmail: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-2">Link Direto WhatsApp (URL)</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs font-mono" value={tempContent.whatsappLink} onChange={e => setTempContent({...tempContent, whatsappLink: e.target.value})} />
                  </div>
                </div>
              </section>

              <div className="sticky bottom-6 z-30">
                <button onClick={handleSave} disabled={isSaving} className="w-full gold-bg text-black font-black py-7 rounded-[2rem] shadow-[0_20px_50px_rgba(191,149,63,0.4)] uppercase tracking-widest text-xl transition-all active:scale-95 font-title">
                  {isSaving ? 'SALVANDO ALTERAÇÕES...' : '🚀 PUBLICAR AGORA'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-black uppercase gold-gradient font-title mb-6">Leads Capturados</h2>
              {leads.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900 rounded-[2rem] border border-white/5 shadow-inner">
                  <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">Nenhum lead recebido ainda no sistema.</p>
                </div>
              ) : (
                leads.map(lead => (
                  <div key={lead.id} className="glass-card p-8 rounded-[2rem] flex flex-col md:flex-row justify-between md:items-center gap-6 group border-white/5 hover:border-amber-500/30 transition-all shadow-xl">
                    <div className="space-y-1">
                      <h3 className="font-black text-xl text-white font-title">{lead.name}</h3>
                      <p className="text-amber-500 text-sm font-bold tracking-wider">{lead.email}</p>
                      <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-gray-400 text-xs italic leading-relaxed">"{lead.message}"</p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end">
                      <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{lead.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'pixels' && (
            <div className="space-y-10 animate-fade-in">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-black uppercase gold-gradient font-title">Scripts & SEO</h2>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest">Cole seus scripts de rastreamento para Facebook, Google e outras ferramentas de inteligência.</p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase text-gray-500 font-black tracking-widest block">Meta Pixel (Facebook Ads)</label>
                  <textarea className="w-full bg-black/60 border border-white/10 rounded-3xl p-8 h-64 font-mono text-xs text-amber-100/60 focus:border-amber-500 outline-none transition-all shadow-2xl" placeholder="<!-- Meta Pixel Code -->..." value={tempPixels.metaPixel} onChange={e => setTempPixels({...tempPixels, metaPixel: e.target.value})} />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase text-gray-500 font-black tracking-widest block">Google Tag Manager / Analytics</label>
                  <textarea className="w-full bg-black/60 border border-white/10 rounded-3xl p-8 h-64 font-mono text-xs text-amber-100/60 focus:border-amber-500 outline-none transition-all shadow-2xl" placeholder="<!-- Google tag (gtag.js) -->..." value={tempPixels.googlePixel} onChange={e => setTempPixels({...tempPixels, googlePixel: e.target.value})} />
                </div>
                
                <button onClick={() => { updatePixels(tempPixels); alert('✅ Pixels atualizados com sucesso!'); }} className="w-full gold-bg text-black font-black py-6 rounded-[2rem] uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-transform font-title text-lg">ATUALIZAR RASTREAMENTO</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;