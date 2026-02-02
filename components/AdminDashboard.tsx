
import React, { useState, useEffect, useRef } from 'react';
import { useSite, SiteContent, Pixels, Plan } from '../context/SiteContext';

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
      alert('✅ Publicado!');
    }, 500);
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center p-4">
        <div className="glass-card p-10 rounded-[2.5rem] w-full max-w-md text-center border-amber-500/30">
          <h2 className="text-3xl font-black mb-2 gold-gradient uppercase tracking-widest">King Admin</h2>
          <form onSubmit={handleLogin} className="space-y-5 mt-8">
            <input type="password" placeholder="Senha Master" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-amber-500 outline-none text-center text-white tracking-widest" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
            <button type="submit" className="w-full gold-bg text-black font-black py-5 rounded-2xl shadow-xl uppercase tracking-widest">ENTRAR</button>
            <button type="button" onClick={onClose} className="text-gray-600 text-xs uppercase hover:text-white mt-4 block mx-auto">Sair</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col font-sans overflow-hidden">
      <div className="bg-zinc-900 border-b border-white/10 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-black gold-gradient uppercase tracking-widest">Editor King Pro</h1>
          <nav className="flex gap-2 bg-black/40 p-1 rounded-xl">
            {(['analytics', 'content', 'leads', 'pixels'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all tracking-widest ${activeTab === tab ? 'bg-amber-500 text-black' : 'text-gray-400'}`}>
                {tab === 'analytics' ? 'Dados' : tab === 'content' ? 'Site' : tab === 'leads' ? 'Leads' : 'Rastreio'}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={resetToDefault} className="text-[10px] text-red-500/50 hover:text-red-500 uppercase tracking-widest">Reset</button>
          <button onClick={onClose} className="bg-white/5 p-3 rounded-full hover:bg-white/10"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-zinc-950">
        <div className="max-w-4xl mx-auto space-y-12 pb-32">
          
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="glass-card p-10 rounded-3xl text-center border-white/5"><p className="text-gray-500 text-[10px] uppercase mb-4 tracking-widest">Visitas</p><p className="text-6xl font-black">{analytics.pageViews}</p></div>
              <div className="glass-card p-10 rounded-3xl text-center border-amber-500/20"><p className="text-gray-500 text-[10px] uppercase mb-4 tracking-widest text-amber-500">Cliques WhatsApp</p><p className="text-6xl font-black text-amber-500">{analytics.buttonClicks['whatsapp_click'] || 0}</p></div>
              <div className="glass-card p-10 rounded-3xl text-center border-white/5"><p className="text-gray-500 text-[10px] uppercase mb-4 tracking-widest">Leads</p><p className="text-6xl font-black">{leads.length}</p></div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-16 animate-fade-in">
              {/* Seção Identidade */}
              <section className="space-y-6">
                <h2 className="text-xl font-black uppercase gold-gradient">1. Identidade & Global</h2>
                <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5 grid gap-6">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-40 h-40 bg-black/60 border border-white/10 rounded-2xl flex items-center justify-center p-4">
                      <img src={tempContent.heroImage} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <label className="text-[10px] uppercase text-gray-500 font-bold">Logo (URL ou Upload)</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs" value={tempContent.heroImage} onChange={e => setTempContent({...tempContent, heroImage: e.target.value})} />
                      <input type="file" className="hidden" ref={logoInputRef} onChange={e => handleFileChange(e, 'logo')} />
                      <button onClick={() => logoInputRef.current?.click()} className="gold-bg text-black text-[10px] font-black px-6 py-3 rounded-xl uppercase w-full md:w-auto">Upload Novo Logo</button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold">WhatsApp Link</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs" value={tempContent.whatsappLink} onChange={e => setTempContent({...tempContent, whatsappLink: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold">E-mail de Contato</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-xs" value={tempContent.contactEmail} onChange={e => setTempContent({...tempContent, contactEmail: e.target.value})} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção Hero & Metodologia */}
              <section className="space-y-6">
                <h2 className="text-xl font-black uppercase gold-gradient">2. Textos do Hero & Metodologia</h2>
                <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5 space-y-6">
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold">Título Hero</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.heroTitle} onChange={e => setTempContent({...tempContent, heroTitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold">Subtítulo Hero</label>
                    <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm h-24" value={tempContent.heroSubtitle} onChange={e => setTempContent({...tempContent, heroSubtitle: e.target.value})} />
                  </div>
                  <div className="pt-6 border-t border-white/5 space-y-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold">Título Metodologia</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.methodologyTitle} onChange={e => setTempContent({...tempContent, methodologyTitle: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold">Texto Persuasivo Metodologia</label>
                      <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm h-32" value={tempContent.methodologyPersuasiveText} onChange={e => setTempContent({...tempContent, methodologyPersuasiveText: e.target.value})} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção Parceiros Dinâmica */}
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-xl font-black uppercase gold-gradient">3. Carrossel de Parceiros</h2>
                   <button onClick={handleAddPartner} className="text-[10px] bg-amber-500/10 border border-amber-500 text-amber-500 px-4 py-2 rounded-lg font-black hover:bg-amber-500 hover:text-black transition-all">+ ADD PARCEIRO</button>
                </div>
                <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5 space-y-6">
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold">Título da Seção de Parceiros</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.partnersTitle} onChange={e => setTempContent({...tempContent, partnersTitle: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tempContent.partnerLogos.map((logo, idx) => (
                      <div key={idx} className="relative space-y-2 group p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all">
                        <button 
                          onClick={() => handleRemovePartner(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center shadow-lg"
                        >
                          ✕
                        </button>
                        <div className="h-16 bg-black/60 flex items-center justify-center p-3 rounded-xl">
                          <img src={logo} className="max-h-full grayscale opacity-50" onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error'} />
                        </div>
                        <input type="text" className="w-full bg-black/40 text-[9px] p-2 rounded border border-white/5 text-white" value={logo} onChange={e => {
                          const n = [...tempContent.partnerLogos]; n[idx] = e.target.value; setTempContent({...tempContent, partnerLogos: n});
                        }} />
                        <input type="file" className="hidden" ref={el => { partnerInputRefs.current[idx] = el; }} onChange={e => handleFileChange(e, {type: 'partner', index: idx})} />
                        <button onClick={() => partnerInputRefs.current[idx]?.click()} className="w-full text-[8px] uppercase bg-white/5 py-2 rounded-lg font-bold hover:bg-white/10">Trocar Logo</button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Seção Planos */}
              <section className="space-y-6">
                <h2 className="text-xl font-black uppercase gold-gradient">4. Configuração de Planos</h2>
                <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5 space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold">Título da Seção</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.plansSectionTitle} onChange={e => setTempContent({...tempContent, plansSectionTitle: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold">Subtítulo da Seção</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm" value={tempContent.plansSectionSubtitle} onChange={e => setTempContent({...tempContent, plansSectionSubtitle: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-8">
                    {tempContent.plans.map((plan, pIdx) => (
                      <div key={pIdx} className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                        <h4 className="font-bold text-amber-500 text-xs">PLANO: {plan.name}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input type="text" placeholder="Nome do Plano" className="bg-black/60 p-3 rounded-lg text-xs text-white" value={plan.name} onChange={e => handlePlanChange(pIdx, 'name', e.target.value)} />
                          <input type="text" placeholder="Descrição Curta" className="bg-black/60 p-3 rounded-lg text-xs text-white" value={plan.description} onChange={e => handlePlanChange(pIdx, 'description', e.target.value)} />
                          <input type="text" placeholder="Preço/Valor" className="bg-black/60 p-3 rounded-lg text-xs text-white font-bold" value={plan.price} onChange={e => handlePlanChange(pIdx, 'price', e.target.value)} />
                          <input type="text" placeholder="Contrato" className="bg-black/60 p-3 rounded-lg text-xs text-white" value={plan.contract} onChange={e => handlePlanChange(pIdx, 'contract', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase text-gray-600 font-bold">Funcionalidades (separadas por vírgula)</label>
                          <textarea className="w-full bg-black/60 p-3 rounded-lg text-xs text-white h-20 mt-1" value={plan.features.join(', ')} onChange={e => handlePlanChange(pIdx, 'features', e.target.value.split(',').map(s => s.trim()))} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Seção Feedback */}
              <section className="space-y-6">
                <h2 className="text-xl font-black uppercase gold-gradient">5. Resultados & Feedbacks</h2>
                <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5 space-y-8">
                   <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Título" className="bg-black/40 p-4 rounded-xl text-xs text-white border border-white/5" value={tempContent.feedbackSectionTitle} onChange={e => setTempContent({...tempContent, feedbackSectionTitle: e.target.value})} />
                    <input type="text" placeholder="Subtítulo" className="bg-black/40 p-4 rounded-xl text-xs text-white border border-white/5" value={tempContent.feedbackSectionSubtitle} onChange={e => setTempContent({...tempContent, feedbackSectionSubtitle: e.target.value})} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {tempContent.feedbacks.map((f, idx) => (
                      <div key={idx} className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                        <div className="aspect-[3/4] bg-black/60 rounded-xl overflow-hidden mb-2"><img src={f.url} className="w-full h-full object-cover" /></div>
                        <input type="text" className="w-full bg-black/60 p-2 text-[9px] text-white rounded" value={f.url} onChange={e => {
                          const n = [...tempContent.feedbacks]; n[idx].url = e.target.value; setTempContent({...tempContent, feedbacks: n});
                        }} placeholder="URL Imagem" />
                        <input type="text" className="w-full bg-black/60 p-2 text-[9px] text-white rounded" value={f.caption} onChange={e => {
                          const n = [...tempContent.feedbacks]; n[idx].caption = e.target.value; setTempContent({...tempContent, feedbacks: n});
                        }} placeholder="Legenda" />
                        <input type="file" className="hidden" ref={el => { feedbackInputRefs.current[idx] = el; }} onChange={e => handleFileChange(e, {type: 'feedback', index: idx})} />
                        <button onClick={() => feedbackInputRefs.current[idx]?.click()} className="w-full bg-amber-500 text-black text-[9px] font-black py-2 rounded-lg">Upload Resultado</button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="sticky bottom-4 z-30">
                <button onClick={handleSave} disabled={isSaving} className="w-full gold-bg text-black font-black py-6 rounded-3xl shadow-[0_10px_40px_rgba(191,149,63,0.3)] uppercase tracking-widest text-lg transition-all active:scale-95">
                  {isSaving ? 'SALVANDO...' : 'PUBLICAR TODAS AS ALTERAÇÕES'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-black uppercase gold-gradient mb-6">Leads Recebidos</h2>
              {leads.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900 rounded-3xl border border-white/5">
                  <p className="text-gray-500 uppercase tracking-widest text-xs">Nenhum lead recebido ainda.</p>
                </div>
              ) : (
                leads.map(lead => (
                  <div key={lead.id} className="glass-card p-6 rounded-2xl flex justify-between items-center group">
                    <div>
                      <h3 className="font-bold text-lg text-white">{lead.name}</h3>
                      <p className="text-amber-500 text-sm">{lead.email}</p>
                      <p className="text-gray-500 text-xs mt-2 italic">"{lead.message}"</p>
                    </div>
                    <span className="text-[10px] text-gray-700 font-bold uppercase">{lead.date}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'pixels' && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-xl font-black uppercase gold-gradient mb-6">Pixels de Rastreamento</h2>
              <textarea className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 h-48 font-mono text-xs text-amber-100/70" placeholder="Meta Pixel" value={tempPixels.metaPixel} onChange={e => setTempPixels({...tempPixels, metaPixel: e.target.value})} />
              <textarea className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 h-48 font-mono text-xs text-amber-100/70" placeholder="Google Tag" value={tempPixels.googlePixel} onChange={e => setTempPixels({...tempPixels, googlePixel: e.target.value})} />
              <button onClick={() => { updatePixels(tempPixels); alert('Pixel atualizado!'); }} className="w-full gold-bg text-black font-black py-5 rounded-2xl uppercase tracking-widest">Atualizar Scripts</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
