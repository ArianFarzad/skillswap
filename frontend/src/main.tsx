import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import './i18n'; // Importieren Sie die i18n-Konfiguration

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
