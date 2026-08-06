# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform frontend UI/UX, implement interactive features (video player, timestamped forum, quiz engine, admin CMS), and ensure direct Git-as-a-CMS synchronization back to GitHub (`brasil-financas-atlas/atlas`).

## Current Status
- **Completed:** 
  - Updated git remote `origin` to `https://github.com/brasil-financas-atlas/atlas.git`.
  - Updated `githubSync.js` and `GitHubSyncModal.jsx` default repository target to `brasil-financas-atlas/atlas` and fixed nested try block syntax.
  - Added full GitHub & File Synchronization guide to `README.md` covering direct browser CMS sync, terminal sync, and Python background watcher.
  - Fixed legacy `localStorage` keys and verified fine-grained PAT handling.
- **In-Progress:**
  - Local changes ready to commit and push to `brasil-financas-atlas/atlas`.
- **Blockers:**
  - None.

## Decisions Made (Locked)
- **Default Repository Targets:** Owner `brasil-financas-atlas` and Repo `atlas` set as primary defaults across `githubSync.js`, `GitHubSyncModal.jsx`, and `README.md`.
- **Relative Path Resolution:** Use relative `./src/` paths in `index.html` to guarantee compatibility across GitHub Pages (`/atlas/plataforma/`), Netlify, and local Python server (`http://localhost:8080`).
- **Authorization Headers:** Use `Authorization: Bearer <token>` for Fine-Grained PAT GitHub REST API calls.
- **Hosting Strategy:** GitHub Pages (or GitHub Actions `gh-pages` deploy) combined with HashRouter (`#/`) is preferred over Netlify rewrites (`/* -> /index.html`), as it avoids Babel Standalone syntax parsing crashes on 200 HTML responses.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Unsanitized `localStorage` Reads for GitHub Sync:** Initializing `useState` directly from raw `localStorage` allowed stale values (`dragaodoomar`/`bfa-main` or `davidlhferro`) to persist and return HTTP 404 Not Found errors when used with repository-scoped PATs. Always filter out legacy keys.
- **Absolute `/src/` paths in `index.html`:** Causes HTTP 404 script loading failures when the project is hosted in a repository subpath (such as GitHub Pages subfolders).

## Extracted Memories & Preferences
- Always declare React hook destructurings (`const { useState, ... } = React;`) at the top of all component files.
- Always check for JSX syntax errors in standalone Babel scripts (`ExtraPages.jsx`), as an unhandled parse error will break component initialization across the entire app.

## Immediate Next Step
- Run `git add . && git commit -m "docs & feat: update repo ownership to brasil-financas-atlas/atlas and expand sync guide" && git push origin main` in `C:\codigos\bfa-main` to publish all changes.
