
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Esconde o loader manualmente após renderizar
    const loader = document.getElementById('initial-loader');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 500);
    }
  } catch (err) {
    console.error("Erro ao montar o React:", err);
    // Fallback simples se o React falhar
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #BF953F; font-family: sans-serif;">
        <h2>King Pro Digital</h2>
        <p>Houve um erro ao carregar a página. Por favor, atualize.</p>
        <a href="https://wa.me/5551993781978" style="color: white;">Falar no WhatsApp</a>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
