import os

styles_dir = r"C:\codigos\bfa-main\plataforma\src\styles"

globals_css = """/* BFA Premium Design System */
:root {
  --color-verde: #1B6B3A;
  --color-verde-light: #E8F5ED;
  --color-verde-dark: #124827;
  --color-verde-glow: rgba(27, 107, 58, 0.15);

  --color-ouro: #C8963E;
  --color-ouro-light: #FDF6EC;
  --color-ouro-dark: #976F2B;
  --color-ouro-glow: rgba(200, 150, 62, 0.2);

  --color-azul: #1B3A5C;
  --color-azul-light: #EBF2FA;
  --color-azul-dark: #10243C;
  --color-azul-glow: rgba(27, 58, 92, 0.15);

  --color-slate-50: #F8FAFC;
  --color-slate-100: #F1F5F9;
  --color-slate-200: #E2E8F0;
  --color-slate-300: #CBD5E1;
  --color-slate-400: #94A3B8;
  --color-slate-500: #64748B;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1E293B;
  --color-slate-900: #0F172A;

  --bg-app: #F4F6F9;
  --bg-surface: #FFFFFF;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #94A3B8;

  --border-color: #E2E8F0;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-sm: 0 2px 4px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 6px 12px rgba(15, 23, 42, 0.06);
  --shadow-lg: 0 12px 24px rgba(15, 23, 42, 0.08);
  --shadow-xl: 0 20px 32px rgba(15, 23, 42, 0.12);

  --font-sans: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-app);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

.bfa-app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.bfa-app-body {
  flex: 1;
}
"""

components_css = """/* BFA Premium Components */

/* Navbar */
.bfa-navbar {
  height: 76px;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.bfa-navbar__container {
  max-width: 1320px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.bfa-navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.bfa-logo__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bfa-logo__title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-azul-dark);
  display: block;
}

.bfa-logo__subtitle {
  font-size: 0.75rem;
  color: var(--color-verde);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.bfa-navbar__links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bfa-nav__link {
  padding: 0.55rem 0.9rem;
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.bfa-nav__link:hover, .bfa-nav__link.active {
  color: var(--color-azul-dark);
  background-color: var(--color-slate-100);
}

.bfa-navbar__toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);
}

/* Hero Section */
.bfa-hero {
  background: linear-gradient(135deg, #0F243C 0%, #1B3A5C 50%, #124827 100%);
  color: #FFFFFF;
  padding: 4.5rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.bfa-hero__container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.bfa-hero__badge {
  display: inline-block;
  background: rgba(200, 150, 62, 0.2);
  border: 1px solid var(--color-ouro);
  color: #FDE68A;
  padding: 0.4rem 1.2rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(4px);
}

.bfa-hero__title {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.bfa-text-highlight {
  background: linear-gradient(120deg, #FDE68A 0%, #C8963E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bfa-hero__sub {
  font-size: 1.15rem;
  color: #CBD5E1;
  max-width: 750px;
  margin: 0 auto 2rem auto;
  line-height: 1.7;
}

.bfa-hero__ctas {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Section Containers */
.bfa-section {
  padding: 4rem 1.5rem;
}

.bfa-section--alt {
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.bfa-section__container {
  max-width: 1200px;
  margin: 0 auto;
}

.bfa-section__title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-azul-dark);
  text-align: center;
  margin-bottom: 0.5rem;
}

.bfa-section__subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 3rem;
}

/* Subject Grid Cards */
.bfa-subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
}

.bfa-card {
  background-color: var(--bg-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.bfa-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

.bfa-card--matematica {
  border-top: 5px solid var(--color-verde);
}

.bfa-card--financas {
  border-top: 5px solid var(--color-azul);
}

.bfa-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.bfa-card__icon {
  font-size: 2.5rem;
}

.bfa-card__title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-azul-dark);
  margin-bottom: 0.75rem;
}

.bfa-card__text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  flex: 1;
}

.bfa-card__bullets {
  list-style: none;
  margin-bottom: 2rem;
}

.bfa-card__bullets li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bfa-card__bullets li::before {
  content: "✓";
  color: var(--color-verde);
  font-weight: 800;
}

/* Buttons */
.bfa-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  text-decoration: none;
}

.bfa-btn--lg {
  padding: 1rem 2rem;
  font-size: 1.05rem;
}

.bfa-btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.bfa-btn--verde {
  background-color: var(--color-verde);
  color: #FFFFFF;
}

.bfa-btn--verde:hover {
  background-color: var(--color-verde-dark);
  box-shadow: 0 4px 12px var(--color-verde-glow);
}

.bfa-btn--azul {
  background-color: var(--color-azul);
  color: #FFFFFF;
}

.bfa-btn--azul:hover {
  background-color: var(--color-azul-dark);
  box-shadow: 0 4px 12px var(--color-azul-glow);
}

.bfa-btn--ouro {
  background-color: var(--color-ouro);
  color: #FFFFFF;
}

.bfa-btn--ouro:hover {
  background-color: var(--color-ouro-dark);
  box-shadow: 0 4px 12px var(--color-ouro-glow);
}

.bfa-btn--block {
  width: 100%;
}

.bfa-btn--ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.bfa-btn--ghost:hover {
  background: var(--color-slate-100);
  color: var(--text-primary);
}

/* Badges */
.bfa-badge {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.bfa-badge--verde {
  background-color: var(--color-verde-light);
  color: var(--color-verde-dark);
}

.bfa-badge--azul {
  background-color: var(--color-azul-light);
  color: var(--color-azul-dark);
}

.bfa-badge--ouro {
  background-color: var(--color-ouro-light);
  color: var(--color-ouro-dark);
}

/* Steps 3-Grid */
.bfa-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.bfa-step-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.bfa-step-card__num {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-slate-100);
  color: var(--color-slate-600);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bfa-step-card__icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  display: block;
}

.bfa-step-card h4 {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--color-azul-dark);
}

.bfa-step-card p {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

/* Institutional Banner */
.bfa-about-banner {
  background: linear-gradient(135deg, var(--color-ouro-light) 0%, #FFFBEB 100%);
  border: 2px solid var(--color-ouro);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  box-shadow: var(--shadow-md);
}

.bfa-about-banner__content h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-ouro-dark);
  margin-bottom: 1rem;
}

.bfa-about-banner__content p {
  font-size: 1.1rem;
  color: var(--color-slate-700);
  margin-bottom: 2rem;
  line-height: 1.7;
}

/* Napkin Finance Visual Card */
.bfa-napkin-card {
  background: #FFFDF9;
  border: 2px dashed var(--color-ouro);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  margin: 1.5rem 0 2rem 0;
  box-shadow: 0 4px 12px rgba(200, 150, 62, 0.1);
  position: relative;
}

.bfa-napkin-card__tag {
  position: absolute;
  top: -12px;
  left: 20px;
  background: var(--color-ouro);
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.75rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}

.bfa-napkin-card__title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-ouro-dark);
  margin-bottom: 0.75rem;
}

/* Lesson Layout & Sidebar */
.bfa-lesson-layout {
  display: flex;
  min-height: calc(100vh - 76px);
}

.bfa-lesson-sidebar {
  width: 320px;
  background-color: var(--bg-surface);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.bfa-lesson-sidebar.closed {
  width: 0;
  overflow: hidden;
}

.bfa-lesson-sidebar__header {
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bfa-lesson-sidebar__back {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-azul);
}

.bfa-lesson-sidebar__nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.bfa-sidebar-module {
  margin-bottom: 1.5rem;
}

.bfa-sidebar-module__title {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-slate-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
}

.bfa-sidebar-module__list {
  list-style: none;
}

.bfa-sidebar-aula-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.25rem;
  transition: all 0.15s ease;
}

.bfa-sidebar-aula-item:hover {
  background-color: var(--color-slate-100);
  color: var(--text-primary);
}

.bfa-sidebar-aula-item.active {
  background-color: var(--color-azul-light);
  color: var(--color-azul-dark);
  font-weight: 700;
}

.bfa-sidebar-aula-item.done .bfa-sidebar-status {
  color: var(--color-verde);
  font-weight: 800;
}

.bfa-lesson-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-app);
}

.bfa-lesson-topbar {
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bfa-lesson-topbar__breadcrumbs {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.bfa-lesson-content-container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1.5rem 4rem 1.5rem;
  width: 100%;
}

.bfa-lesson-article {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
}

.bfa-lesson-nav-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
}

/* Footer */
.bfa-footer {
  background-color: #0F172A;
  color: #94A3B8;
  padding: 4rem 1.5rem 2rem 1.5rem;
}

.bfa-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.bfa-footer__desc {
  font-size: 0.9rem;
  margin-top: 1rem;
  line-height: 1.6;
}

.bfa-footer__links h4 {
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.bfa-footer__links ul {
  list-style: none;
}

.bfa-footer__links li {
  margin-bottom: 0.5rem;
}

.bfa-footer__links a {
  font-size: 0.9rem;
  color: #94A3B8;
  transition: color 0.2s ease;
}

.bfa-footer__links a:hover {
  color: #FFFFFF;
}

.bfa-footer__bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #1E293B;
  text-align: center;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .bfa-navbar__links { display: none; }
  .bfa-navbar__toggle { display: block; }
  .bfa-hero__title { font-size: 2rem; }
  .bfa-footer__container { grid-template-columns: 1fr; }
  .bfa-lesson-sidebar { position: fixed; z-index: 100; height: 100vh; }
}
"""

with open(os.path.join(styles_dir, "globals.css"), "w", encoding="utf-8") as f:
    f.write(globals_css)

with open(os.path.join(styles_dir, "components.css"), "w", encoding="utf-8") as f:
    f.write(components_css)

print("CSS upgrade completed!")
