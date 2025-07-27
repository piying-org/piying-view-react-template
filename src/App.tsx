import './App.css';
import { PiyingPage } from './piying-page';
import '@valibot/i18n/zh-CN'
import { setGlobalConfig } from 'valibot'
const browserLanguage = navigator.language
if (browserLanguage.startsWith('zh')) {
  setGlobalConfig({ lang: 'zh-CN' })
}
function App() {
  return (
    <>
      <PiyingPage></PiyingPage>
    </>
  );
}

export default App;
