# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform frontend UI/UX, implement interactive features (video player, timestamped forum, quiz engine, admin CMS), and ensure direct Git-as-a-CMS synchronization back to GitHub (`brasil-financas-atlas/atlas`).

## Current Status
- **Completed:** 
  - Updated git remote `origin` to `https://github.com/brasil-financas-atlas/atlas.git`.
  - Updated `githubSync.js` and `GitHubSyncModal.jsx` default repository target to `brasil-financas-atlas/atlas` and fixed nested try-block syntax.
  - Re-implemented `auto_sync.py` with `watchdog` real-time monitoring, 3s debouncing, non-interactive `GIT_TERMINAL_PROMPT=0` safety, `fetch` + `rebase FETCH_HEAD` logic, and `.env` PAT token support.
  - Added `.env` and `auto_sync.log` to `.gitignore` and untracked `auto_sync.log` from git index.
  - Reconciled local and remote branches (`allow-unrelated-histories`, `--ours`) into a clean state.
  - Created test file `ARQUIVO_TESTE_SINCRONIZACAO_AUTOMATICA_GITHUB_BRASIL_FINANCAS_ATLAS.md` in root directory.
  - Added `AGENTS.md` specifying `/session-start` auto-sync protocol.
  - Expanded `README.md` with ultra-detailed step-by-step Auto-Sync setup guide.
- **In-Progress:**
  - Ready for final `git push` once user enables `workflow` scope on their GitHub PAT.
- **Blockers:**
  - Token in `.env` requires the **`workflow`** permission scope checked on GitHub because the repository contains GitHub Actions workflows in `.github/workflows/`.

## Decisions Made (Locked)
- **Session Start Protocol:** Every `/session-start` MUST automatically run `auto_sync.py` check (`python -c "import auto_sync; syncer = auto_sync.GitAutoSync(auto_sync.REPO_DIR, auto_sync.BRANCH, pat=auto_sync.GITHUB_PAT); syncer.sync()"`) and check for PAT requirements.
- **Default Repository Targets:** Owner `brasil-financas-atlas` and Repo `atlas` set as primary defaults across `githubSync.js`, `GitHubSyncModal.jsx`, `auto_sync.py`, `AGENTS.md`, and `README.md`.
- **PAT Scopes Required:** Personal Access Tokens for this repository MUST have both **`repo`** (Full control of private repositories) AND **`workflow`** (Update GitHub Action workflows) scopes enabled on GitHub.

## Failed Approaches / Dead Ends (Do Not Retry)
- **PAT without `workflow` scope:** Pushing commits to a repository containing `.github/workflows/*.yml` with a PAT that lacks `workflow` scope causes GitHub API rejection: `refusing to allow a Personal Access Token to create or update workflow ... without workflow scope`.
- **Tracking `auto_sync.log` in Git:** Allowing `auto_sync.log` to be tracked by Git causes `git pull --rebase` to fail with "You have unstaged changes" whenever python writes to the log. Keep `auto_sync.log` in `.gitignore` and untracked.
- **Personal Fine-Grained PAT without Organization Resource Owner:** Using a Fine-Grained PAT created under a personal account without selecting `brasil-financas-atlas` as Resource Owner results in `HTTP 403 Write access to repository not granted`. Always use a **Classic PAT (`repo` + `workflow` scopes)** or authorize Fine-Grained PAT under Organization Settings.

## Extracted Memories & Preferences
- Always declare React hook destructurings (`const { useState, ... } = React;`) at the top of all component files.
- Always set `sys.stdout.reconfigure(encoding='utf-8')` or avoid emojis in Windows CMD Python logging to prevent `UnicodeEncodeError`.

## Immediate Next Step
- Run `python -c "import auto_sync; syncer = auto_sync.GitAutoSync(auto_sync.REPO_DIR, auto_sync.BRANCH, pat=auto_sync.GITHUB_PAT); syncer.sync()"` (or execute `/session-start`) to push all local changes once the `workflow` scope is enabled on the PAT.
