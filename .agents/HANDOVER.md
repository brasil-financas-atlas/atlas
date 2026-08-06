# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform frontend UI/UX, implement interactive features (video player, timestamped forum, quiz engine, admin CMS), and ensure direct Git-as-a-CMS synchronization back to GitHub (`brasil-financas-atlas/atlas`).

## Current Status
- **Completed:** 
  - Updated git remote `origin` to `https://github.com/brasil-financas-atlas/atlas.git`.
  - Saved new PAT token in `.env`.
  - Merged local and remote branches (`allow-unrelated-histories`) into a clean state.
  - Untracked `auto_sync.log` and updated `.gitignore`.
  - Configured `auto_sync.py` to auto-commit and push seamlessly.
- **In-Progress:**
  - `git push` requires PAT with `workflow` scope enabled on GitHub.
- **Blockers:**
  - Token in `.env` needs the **`workflow`** permission checked on GitHub because the repo contains `.github/workflows/*.yml`.

## Decisions Made (Locked)
- **Session Start Protocol:** Every `/session-start` MUST automatically run `auto_sync.py` check and inform the user of any PAT authorization requirements.
- **PAT Scopes:** PAT token MUST have both **`repo`** and **`workflow`** scopes checked on GitHub.

## Failed Approaches / Dead Ends (Do Not Retry)
- **PAT without `workflow` scope:** Pushing a repo with `.github/workflows/*.yml` without `workflow` scope causes GitHub to reject with `refusing to allow a Personal Access Token to create or update workflow without workflow scope`.

## Immediate Next Step (For User Action)
1. In GitHub Settings ➔ Personal Access Tokens, edit the token or create a new token with **`repo`** AND **`workflow`** checked.
2. Update `.env` with the new token (`GITHUB_PAT=github_pat_...`).
3. Run `python auto_sync.py` (or run `/session-start`) to complete the sync push instantly!
