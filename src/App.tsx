import { useEffect, useState } from 'react';
import './App.css';
import { PiyingPage } from './piying-page';
import { PiyingManualPage } from './piying-manual-page';

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/');
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function App() {
  const route = useHashRoute();
  return (
    <>
      <nav className="flex gap-4 border-b p-3">
        <a className="link" href="#/">
          auto
        </a>
        <a className="link" href="#/manual">
          manual
        </a>
      </nav>
      {route === '/manual' ? <PiyingManualPage /> : <PiyingPage />}
    </>
  );
}

export default App;
