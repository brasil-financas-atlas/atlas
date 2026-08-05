# Handoff Briefing

## Goal
Redesign the frontend UI/UX of the Brasil Finanças Atlas (BFA) educational platform with a premium Brazilian-themed aesthetic, implement interactive features (video player, timestamped forum threads, quiz engine, admin CMS), and establish a direct Git-as-a-CMS synchronization system back to GitHub.

## Current Status
- **Completed:** 
  - Premium UI/UX overhaul of the platform using a modern Brazil-themed color palette (refined green, blue, gold) and responsive layout.
  - Interactive components including a video lesson player, a forum with comment threads tied to specific video timestamps, a quiz engine, and a compound interest calculator.
  - Hardcoded CMS panel allowing administrators to modify lessons, videos, and questions.
  - Direct API-based sync client (`githubSync.js`) and modal (`GitHubSyncModal.jsx`) that commits `overrides.json` state directly to the GitHub repo using Fine-Grained Personal Access Tokens.
  - Automated deployment workflow via GitHub Actions (`content-sync-deploy.yml`) to rebuild dataset references.
  - Resolved blank screen issues caused by script loading order and Babel parsing anomalies on CDN React scripts.
- **In-Progress:**
  - Testing real-time deployments on Netlify following GitHub sync actions.
- **Blockers:**
  - None.

## Decisions Made (Locked)
- **CDN-based React + Babel Standalone:** Chosen to avoid local build environments (Node/npm), making it easy for the student/teacher team to run the server using python's built-in `http.server`.
- **Git-as-a-CMS Sync:** Storing overrides as a JSON file in the repository to bypass database hosting costs and complex API servers.
- **Strict script sequence in `index.html`:** Ensures global state and libraries load before component logic runs.

## Failed Approaches / Dead Ends (Do Not Retry)
- **ES Module imports/exports in Babel scripts:** Fails on the local filesystem (`file://`) due to CORS policies. All shared utilities must be explicitly bound to the global `window` object instead of using standard `import`/`export` syntax.

## Extracted Memories & Preferences
- Always declare React hook destructurings (`const { useState, ... } = React;`) at the top of all component files to prevent Babel compile crashes.
- Do not add standard packaging configurations (Vite, Webpack) unless explicitly requested, as the project target is single-command deployment.

## Immediate Next Step
- Run `python -m http.server 8080 --directory plataforma` to inspect the latest frontend layout, log in using the credentials in `README.md`, and verify the "Publicar no GitHub" modal sync workflow.
