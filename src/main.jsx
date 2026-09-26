import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Styles
import 'katex/dist/katex.min.css';
import './styles/globals.css';
import './styles/typography.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/admin.css';
import './styles/themes.css';

// Context Providers
import { AdminProvider } from './context/AdminContext';
import { ProgressProvider } from './context/ProgressContext';

// Main App Component
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AdminProvider>
        <ProgressProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ProgressProvider>
      </AdminProvider>
    </React.StrictMode>
  );
}
