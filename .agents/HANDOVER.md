# Handoff Briefing

## Goal
Implement admin capabilities for editing/adding content (modules, lessons, news, exercises, quizzes), transform the mini-quiz into a Khan Academy-style fixation quiz with lesson-specific questions, fix forum CSS, and solve dark-on-dark contrast issues across the site.

## Current Status
- **Completed:**
  - Extended `AdminContext.jsx` with `addModule`, `addNews`, `deleteNews`, `addExercise`, `deleteExercise` and collaborator pending edits workflow.
  - Added Quick Action Bar and modals in `AdminPages.jsx` for creating modules, news, and exercises, and fixed the `undefined.forEach` crash when iterating `EXACT_CONTENT`.
  - Transformed `QuizEngine.jsx` into a Khan Academy Fixation Quiz with progress pills, instant feedback, and normalized property mapping for `miniQuiz` arrays.
  - Included `financasData.js` and `matematicaData.js` in `index.html` and updated `AulaPage.jsx` so every lesson dynamically loads its specific 5-question fixation quiz.
  - Added CSS rules for `.bfa-forum`, `.bfa-inline-editor-modal`, `.bfa-inline-editor-card`, `.bfa-btn-group`, and `.bfa-tab-btn` in `components.css`.
  - Solved page title illegibility (dark blue on dark blue) by passing `style={style}` directly to `<Component>` in `EditableBlock.jsx` and enforcing `.hero-gradient * { color: #FFFFFF !important; }` in `globals.css`.
  - Verified local dev server running on `http://localhost:3000`.
- **In-Progress:** None. All user requests fully shipped and tested.
- **Blockers:** None.

## Decisions Made (Locked)
- **Khan Academy Quiz Engine:** Quizzes use a 5-question step-by-step layout with visual status pills (`.bfa-quiz__pills`), instant answer verification, explanation cards, and mastery badges.
- **Dynamic Lesson Mini-Quiz Resolution:** `AulaPage.jsx` checks `window.financasData` and `window.matematicaData` for rich `miniQuiz` data per lesson before falling back to default questions.
- **Title Color Enforcement:** `EditableBlock.jsx` applies `style={style}` directly onto the rendered `<Component>` element to ensure inline styles override `typography.css` global element rules.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Applying `color: #FFFFFF` only to parent containers of `EditableBlock`**: Failed because `h1, h2, h3` element selectors in `typography.css` have higher specificity than CSS inheritance, forcing dark blue text on dark blue gradients. Solved by passing `style` directly onto `<Component style={style}>` and using `.hero-gradient h1 { color: #FFFFFF !important; }`.
- **Assuming `EXACT_CONTENT` keys all contain `.modulos`**: Failed in `AdminPages.jsx` because top-level keys like `"index"`, `"sobre"`, `"exercicios"` are strings or objects without `.modulos`. Solved with defensive check `if (subj && Array.isArray(subj.modulos))`.

## Extracted Memories & Preferences
- **Single-page Babel SPA Architecture:** Project uses React 18 + Babel Standalone loaded directly in `index.html`. All data scripts (`contentData.js`, `financasData.js`, `matematicaData.js`) must be included in `index.html`.
- **Background Auto-Sync Protocol:** `AGENTS.md` mandates auto-syncing commits via `python auto_sync.py` running in background.

## Immediate Next Step
- Continue developing new lesson content or adding interactive features to the platform as requested by the user.
