import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CSS dosyasını içe aktar
import App from './App'; // App bileşenini içe aktar
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performace izleme
reportWebVitals();

