import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';

// Simple Hash-based Router implementation for CDN Standalone React without npm bundle dependency
const RouterContext = createContext({
  currentPath: '/',
  navigate: () => {},
  params: {}
});

function useRouter() {
  return useContext(RouterContext);
}

function extractCleanHashPath() {
  if (typeof window === 'undefined') return '/';
  const rawHash = window.location.hash || '';
  if (!rawHash || rawHash === '#' || rawHash === '#/') return '/';

  // Se o hash contiver tokens de autenticação do Supabase (#access_token=... ou #error=...)
  if (rawHash.includes('access_token=') || rawHash.includes('error_description=') || rawHash.includes('type=signup') || rawHash.includes('type=recovery')) {
    console.log('[BFA Router] Callback de autenticação Supabase detectado na URL.');
    return '/';
  }

  // Âncoras dentro da mesma página (ex: #trilhas, #inicio)
  if (!rawHash.startsWith('#/')) {
    const anchorId = rawHash.substring(1);
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return '/';
  }

  const clean = rawHash.substring(1);
  return clean || '/';
}

function HashRouter({ children }) {
  const [path, setPath] = useState(extractCleanHashPath());

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash || '';
      const newPath = extractCleanHashPath();
      setPath(newPath);
      // Rola para o topo apenas se for uma nova página (#/)
      if (rawHash.startsWith('#/')) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (toPath) => {
    window.location.hash = toPath.startsWith('/') ? toPath : '/' + toPath;
  };

  return (
    <RouterContext.Provider value={{ currentPath: path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export { useRouter };
export default HashRouter;
