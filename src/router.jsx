// React CDN global components destructuring
const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

// Simple Hash-based Router implementation for CDN Standalone React without npm bundle dependency
const RouterContext = createContext({
  currentPath: '/',
  navigate: () => {},
  params: {}
});

function useRouter() {
  return useContext(RouterContext);
}

function HashRouter({ children }) {
  const [path, setPath] = useState(window.location.hash.substring(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = window.location.hash.substring(1) || '/';
      setPath(newPath);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (toPath) => {
    window.location.hash = toPath;
  };

  return (
    <RouterContext.Provider value={{ currentPath: path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}
