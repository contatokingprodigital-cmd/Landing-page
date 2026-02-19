
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Função para remover o loader assim que o React estiver pronto
    const hideLoader = () => {
      const loader = document.getElementById('initial-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          loader.remove();
        }, 500);
      }
    };

    // Tenta esconder o loader o mais rápido possível
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      // Fallback: se o evento load demorar, removemos mesmo assim após render inicial
      setTimeout(hideLoader, 1000);
    }

  } catch (err) {
    console.error("Erro fatal ao iniciar aplicação:", err);
    rootElement.innerHTML = `
      <div style="background:#000; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#BF953F; font-family:sans-serif; text-align:center; padding:20px;">
        <h1 style="font-size:24px; margin-bottom:10px;">King Pro Digital</h1>
        <p style="color:#666; font-size:14px;">Houve um erro técnico ao carregar no seu dispositivo.</p>
        <a href="https://wa.me/5551993781978" style="margin-top:20px; display:inline-block; background:#BF953F; color:#000; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold;">Falar no WhatsApp</a>
      </div>
    `;
    const loader = document.getElementById('initial-loader');
    if (loader) loader.remove();
  }
}
