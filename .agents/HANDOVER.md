# Handoff Briefing

## Goal
Redesign and maintain the Brasil Finanças Atlas (BFA) educational platform frontend UI/UX, implement interactive features (video player, timestamped forum, quiz engine, admin CMS), and ensure direct Git-as-a-CMS synchronization back to GitHub (`brasil-financas-atlas/atlas`) with a zero-cost secure backend architecture.

## Current Status
- **Completed:** 
  - Verified and tested Git Auto-Sync (`auto_sync.py`), actively running in background (PID 6396) pushing to `brasil-financas-atlas/atlas`.
  - Added step-by-step GitHub continuous deployment guide (Netlify, Vercel, Cloudflare Pages) to `README.md`.
  - Conducted deep-dive research into zero-cost / free-tier backend infrastructure (Turso / Cloudflare D1 + Workers + Supabase Auth + Cloudflare R2 + YouTube Unlisted).
  - Conducted deep-dive research into maximum security architecture (Defense-in-Depth, OAuth2, RLS, HTTPOnly SameSite cookies for JWT, Cloudflare WAF rate limiting, PII AES-256 encryption, LGPD compliance).
  - Created and user-approved strategy document `backend_and_deploy_strategy.md`.
- **In-Progress:**
  - Ready to commence development of the next core feature (Video Player with timestamped notes, Quiz Engine, or Supabase/Turso backend integration).
- **Blockers:**
  - None.

## Decisions Made (Locked)
- **Deployment Stack:** Netlify / Vercel / Cloudflare Pages connected to GitHub `main` branch for automatic 30s builds.
- **Zero-Cost Backend Architecture:** Cloudflare Workers + Turso/D1 (5GB free SQL) + Supabase Auth (50k MAUs free) + Cloudflare R2 (10GB zero-egress) + YouTube Unlisted (for educational videos).
- **Security Architecture:** HTTPOnly SameSite=Strict cookies for JWT refresh tokens, Row Level Security (RLS) on PostgreSQL/Supabase, Cloudflare WAF rate limiting, AES-256 encryption for sensitive PII data.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Tool calls without `TargetFile`:** Calling `replace_file_content` without specifying `TargetFile` explicitly causes JSON validation failure. Always include `TargetFile`.
- **PAT without `workflow` scope:** Pushing commits to a repository containing `.github/workflows/*.yml` with a PAT that lacks `workflow` scope causes GitHub API rejection.
- **Tracking `auto_sync.log` in Git:** Keeping `auto_sync.log` in Git causes rebase conflicts on sync. Keep it in `.gitignore`.

## Extracted Memories & Preferences
- Always declare React hook destructurings (`const { useState, ... } = React;`) at the top of all component files.
- Always set `sys.stdout.reconfigure(encoding='utf-8')` or avoid emojis in Windows CMD Python logging to prevent `UnicodeEncodeError`.

## Immediate Next Step
- User or next agent will choose to implement one of the key interactive features (Video Player with Timestamped Notes, Quiz Engine, or initial Supabase Auth integration).
