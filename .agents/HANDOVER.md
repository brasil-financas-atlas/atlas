# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform frontend UI/UX, implement interactive features (video player, timestamped forum, quiz engine, admin CMS), and ensure direct Git-as-a-CMS synchronization back to GitHub (`brasil-financas-atlas/atlas`).

## Current Status
- **Completed:** 
  - Updated git remote `origin` to `https://github.com/brasil-financas-atlas/atlas.git`.
  - Created `.env` file containing `GITHUB_PAT`.
  - Re-implemented `auto_sync.py` with `watchdog` real-time monitoring, 3s debouncing, non-interactive `GIT_TERMINAL_PROMPT=0` safety, `git pull --rebase` conflict prevention, and `.env` PAT authentication.
  - Created `AGENTS.md` configuring automatic execution of `auto_sync.py` during `/session-start`.
  - Created test file `ARQUIVO_TESTE_SINCRONIZACAO_AUTOMATICA_GITHUB_BRASIL_FINANCAS_ATLAS.md` in root directory.
  - Documented ultra-detailed step-by-step Auto-Sync setup in `README.md`.
- **In-Progress:**
  - Auto-Sync script tested via `python auto_sync.py`. The GitHub API returned: `403 Write access to repository not granted`.
- **Blockers:**
  - The token currently in `.env` is a Personal Fine-Grained PAT that lacks write access to the new organization `brasil-financas-atlas`.

## Decisions Made (Locked)
- **Session Start Protocol:** Every `/session-start` MUST automatically run `auto_sync.py` check and inform the user of any PAT authorization requirements.
- **Default Repository Targets:** Owner `brasil-financas-atlas` and Repo `atlas` set as primary defaults across `githubSync.js`, `GitHubSyncModal.jsx`, `auto_sync.py`, and `README.md`.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Personal Fine-Grained PAT without Organization Resource Owner:** Using a Fine-Grained PAT created under a personal account without selecting `brasil-financas-atlas` as Resource Owner results in `HTTP 403 Write access to repository not granted`. Always use a **Classic PAT (`repo` scope)** or authorize Fine-Grained PAT under Organization Settings.

## Immediate Next Step (For User Action)
1. Generate a **Personal Access Token (classic)** in GitHub: *Settings ➔ Developer Settings ➔ Personal Access Tokens ➔ Tokens (classic)*.
2. Select the **`repo`** scope checkbox.
3. Paste the new token (`ghp_...`) into `.env` (`GITHUB_PAT=ghp_...`).
4. Run `python auto_sync.py` (or run `/session-start`). All local files will sync to GitHub automatically!
