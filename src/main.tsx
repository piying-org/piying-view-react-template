import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '@valibot/i18n/zh-CN';
import { setGlobalConfig } from 'valibot';
const browserLanguage = navigator.language;
if (browserLanguage.startsWith('zh')) {
  setGlobalConfig({ lang: 'zh-CN' });
}
createRoot(document.getElementById('root')!).render(<App />);
