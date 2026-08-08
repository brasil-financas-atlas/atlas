# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform UI/UX with the Lovable design system, integrate Supabase PostgreSQL backend BaaS (R$ 0/mês), and deploy to Cloudflare Pages with local auto-sync daemon.

## Current Status
- **Completed:**
  - Initialized Git repository, pointed `origin` to `https://github.com/brasil-financas-atlas/atlas.git`, and created `.env` template.
  - Generated project documentation: [`DOC_PROJETO_DESIGN_REFERENCIAS.md`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/DOC_PROJETO_DESIGN_REFERENCIAS.md), [`.agents/PLANO_BACKEND_MINIMO_CUSTO.md`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.agents/PLANO_BACKEND_MINIMO_CUSTO.md), [`.agents/PLANO_BACKEND_BANCO_DADOS.md`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.agents/PLANO_BACKEND_BANCO_DADOS.md), [`.agents/PASSO_A_PASSO_CLOUDFLARE_SUPABASE_FREE.md`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.agents/PASSO_A_PASSO_CLOUDFLARE_SUPABASE_FREE.md), and [`.agents/GUIA_MESTRE_CONFIGURACAO_COMPLETA.md`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.agents/GUIA_MESTRE_CONFIGURACAO_COMPLETA.md).
  - Rebuilt `plataforma/src/styles/` (`globals.css`, `components.css`, `typography.css`, `themes.css`) from scratch using the Lovable design system (`lovable-project-2bcdc0ac`).
  - Refactored `NavbarFooter.jsx`, `Home.jsx`, `DisciplinaOverview.jsx`, `AulaPage.jsx`, `ExtraPages.jsx`, and `AdminPages.jsx` to remove conflicting inline styles and implement WCAG AAA high-contrast dark mode (`#F0F6FC` primary text, `#94A3B8` secondary text, `#34D399` emerald, `#60A5FA` math blue, `#FBBF24` BRHSIC gold).
  - Integrated Supabase SDK (`@supabase/supabase-js` v2), created [`plataforma/src/utils/supabaseClient.js`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/utils/supabaseClient.js) with LocalStorage fallback, updated [`ProgressContext.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/context/ProgressContext.jsx), and saved PostgreSQL schema to [`plataforma/src/data/schema.sql`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/schema.sql).
  - Local HTTP server actively running on `http://localhost:8080`.
- **In-Progress:**
  - Cloudflare Pages initial deployment setup: Setting `Root directory: plataforma` in Cloudflare Settings -> Builds & deployments to fix the root directory build error.
- **Blockers:**
  - First Cloudflare build failed because `Root directory` was set to `/`, causing Cloudflare to run `pip install -r requirements.txt` from the python documentation root instead of serving the `plataforma` static files.

## Decisions Made (Locked)
- **Supabase Free Tier (BaaS)**: Chosen as the zero-cost PostgreSQL database (R$ 0/mês up to 50k MAU) with native Auth & RLS policies.
- **Hybrid Auth Model**: Open reading for all students without mandatory login; optional login for cross-device sync & verifiable certificate issuance.
- **Cloudflare Pages Hosting**: Chosen for unlimited free bandwidth and edge deployment in Fortaleza-CE.
- **Cloudflare Build Settings**: `Root directory` MUST be set to `plataforma`, `Build output directory` to `.`, and `Build command` left blank.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Setting Cloudflare Root Directory to `/`**: Causes Cloudflare to auto-detect `requirements.txt` in the root and fail while attempting Python MkDocs installation. Always set `Root directory` to `plataforma`.
- **Relying on Inline Styles in React Components**: Hardcoded inline styles (`style={{ background: '...' }}`) override CSS stylesheets and prevent theme switching. Keep styles in `globals.css` / `components.css`.

## Extracted Memories & Preferences
- Always test React component JSX with Babel Standalone CDN parser to verify syntax compatibility.
- Ensure dark mode primary text is `#F0F6FC` and secondary text is `#94A3B8` for WCAG AAA compliance.

## Immediate Next Step
- In Cloudflare Pages Dashboard -> `atlas` project -> **Settings** -> **Builds & deployments**, edit settings to set **Root directory: `plataforma`**, leave **Build command** blank, and click **Retry deployment**.
