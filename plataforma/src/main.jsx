// Expose global functions on window for script compatibility

// Root Render
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
