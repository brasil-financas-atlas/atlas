# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform UI/UX with the Lovable design system, integrate Supabase PostgreSQL backend BaaS (Auth, RLS, and Collaborator/Admin Chief approval workflow), and deploy to Cloudflare Pages with local auto-sync daemon.

## Current Status
- **Completed:**
  - Removed theme selector from public header navigation ([`NavbarFooter.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/NavbarFooter.jsx)); restricted theme customization exclusively to Admin Dashboard ([`AdminPages.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/AdminPages.jsx)).
  - Upgraded student comments/forum UI ([`VideoAndForum.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/VideoAndForum.jsx)) and interactive quiz options ([`QuizEngine.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/QuizEngine.jsx)) with comprehensive CSS in [`components.css`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/styles/components.css).
  - Fixed dark-on-dark color contrast ratios (WCAG AAA compliant) in track headers and progress badges ([`DisciplinaOverview.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/DisciplinaOverview.jsx) and [`globals.css`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/styles/globals.css)).
  - Added Lesson Video Management (add/edit/remove YouTube URL) for Admins in [`AulaPage.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/AulaPage.jsx) and Central Video Manager in [`AdminPages.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/AdminPages.jsx).
  - Updated PostgreSQL schema ([`schema.sql`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/schema.sql)) with `admin_chief` and `collaborator` roles and created `pending_edits` table with RLS policies.
  - Implemented Supabase Auth and Collaborator-to-Admin Chief approval workflow in [`supabaseClient.js`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/utils/supabaseClient.js) and [`AdminContext.jsx`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/context/AdminContext.jsx).
  - Generated Supabase setup documentation in [`.agents/GUIA_CADASTRO_SUPABASE.md`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.agents/GUIA_CADASTRO_SUPABASE.md).
  - Verified local auto-sync daemon (`auto_sync.py`) running in background and synced all commits to GitHub `main` branch.
- **In-Progress:**
  - Supabase production project user creation and environment variable configuration (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Cloudflare Pages).
- **Blockers:**
  - None.

## Decisions Made (Locked)
- **Single Login / BaaS Auth**: Collaborators use individual Supabase Auth logins (email/password) instead of separate GitHub Personal Access Tokens (PATs).
- **Collaborator Edit Approval Workflow**: Changes submitted by `collaborator` role enter a `pending_edits` queue; an `admin_chief` must review and approve/reject them in the Admin Dashboard before they go live.
- **Theme Customization Access**: Theme selector is hidden from main navbar and restricted to the Admin area.
- **Cloudflare Build Settings**: `Root directory` set to `plataforma`, `Build output directory` set to `.`, and `Build command` left blank.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Running `logging.StreamHandler(sys.stdout)` under `pythonw.exe` without checking `sys.stdout is not None`**: `sys.stdout` is `None` under `pythonw.exe`, causing logging calls to crash background processes. Always check `if sys.stdout is not None` before adding `StreamHandler`.
- **Setting Cloudflare Root Directory to `/`**: Causes Cloudflare to auto-detect `requirements.txt` in the root and fail while attempting Python MkDocs installation. Always set `Root directory` to `plataforma`.

## Extracted Memories & Preferences
- Always ensure dark mode primary text is `#F0F6FC` or `#FFFFFF` and accent colors are high-luminance (e.g., `#34D399`, `#FBBF24`, `#60A5FA`) for dark background contrast.
- Keep `.env` populated with `GITHUB_PAT` having `repo` and `workflow` permissions for `auto_sync.py`.

## Immediate Next Step
- Configure Supabase credentials (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in Cloudflare Pages Environment Variables and create collaborator accounts in Supabase Authentication UI.
