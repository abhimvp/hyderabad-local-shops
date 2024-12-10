import './polyfills';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { config } from 'dotenv'; //Import config here

config()


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);