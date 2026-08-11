# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform frontend UI/UX, implement interactive features (Khan Academy-style quiz engine, video player, timestamped forum, admin CMS), and integrate zero-cost secure backend architecture (Supabase Auth / Turso / Cloudflare Workers).

## Current Status
- **Completed:** 
  - Verified and tested Git Auto-Sync (`auto_sync.py`), actively running in background pushing to `brasil-financas-atlas/atlas`.
  - Extended `AdminContext.jsx` with `addModule`, `addNews`, `deleteNews`, `addExercise`, `deleteExercise` and collaborator pending edits workflow.
  - Added Quick Action Bar and modals in `AdminPages.jsx` for creating modules, news, and exercises.
  - Transformed `QuizEngine.jsx` into a Khan Academy Fixation Quiz with progress pills, instant feedback, and normalized property mapping for `miniQuiz` arrays.
  - Solved page title illegibility (dark blue on dark blue) by passing `style={style}` directly to `<Component>` in `EditableBlock.jsx` and enforcing `.hero-gradient * { color: #FFFFFF !important; }` in `globals.css`.
  - Added step-by-step GitHub continuous deployment guide (Netlify, Vercel, Cloudflare Pages) to `README.md`.
  - Conducted deep-dive research into zero-cost / free-tier backend infrastructure (Turso / Cloudflare D1 + Workers + Supabase Auth + Cloudflare R2 + YouTube Unlisted).
- **In-Progress:**
  - Zero-cost backend integration and Cloudflare / Supabase setup.
- **Blockers:**
  - None.

## Decisions Made (Locked)
- **Deployment Stack:** Netlify / Vercel / Cloudflare Pages connected to GitHub `main` branch for automatic 30s builds.
- **Khan Academy Quiz Engine:** Quizzes use a 5-question step-by-step layout with visual status pills (`.bfa-quiz__pills`), instant answer verification, explanation cards, and mastery badges.
- **Dynamic Lesson Mini-Quiz Resolution:** `AulaPage.jsx` checks `window.financasData` and `window.matematicaData` for rich `miniQuiz` data per lesson before falling back to default questions.
- **Title Color Enforcement:** `EditableBlock.jsx` applies `style={style}` directly onto the rendered `<Component>` element to ensure inline styles override `typography.css` global element rules.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Tool calls without `TargetFile`:** Calling `replace_file_content` without specifying `TargetFile` explicitly causes JSON validation failure. Always include `TargetFile`.
- **PAT without `workflow` scope:** Pushing commits to a repository containing `.github/workflows/*.yml` with a PAT that lacks `workflow` scope causes GitHub API rejection.
- **Tracking `auto_sync.log` in Git:** Keeping `auto_sync.log` in Git causes rebase conflicts on sync. Keep it in `.gitignore`.
- **Applying `color: #FFFFFF` only to parent containers of `EditableBlock`**: Failed because `h1, h2, h3` element selectors in `typography.css` have higher specificity than CSS inheritance.

## Extracted Memories & Preferences
- **Single-page Babel SPA Architecture:** Project uses React 18 + Babel Standalone loaded directly in `index.html`. All data scripts (`contentData.js`, `financasData.js`, `matematicaData.js`) must be included in `index.html`.
- **Background Auto-Sync Protocol:** `AGENTS.md` mandates auto-syncing commits via `python auto_sync.py` running in background.

## Immediate Next Step
- Continue developing new lesson content, backend integration, or interactive features for the platform as requested by the user.
