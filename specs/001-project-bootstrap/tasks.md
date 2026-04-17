---

description: "Task list for Project Bootstrap"
---

# Tasks: Project Bootstrap

**Input**: Design documents from `specs/001-project-bootstrap/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- File paths are relative to repo root

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Scaffold the Vite + React + JavaScript project at the repository root.

- [x] T001 Bootstrap Vite 5.x project at repo root: run `npm create vite@latest . -- --template react --overwrite` (creates index.html, vite.config.js, package.json, src/main.jsx, src/App.jsx, src/App.css, src/index.css).
- [x] T002 [P] Delete Vite default boilerplate files that will not be used: src/App.css, src/index.css, src/assets/react.svg, public/vite.svg

**Checkpoint**: `npm install` completes without errors. `npm run dev` starts the server.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the mock service layer structure and environment scaffolding.
These tasks MUST be complete before user story work begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 [P] Create mock service layer directory structure: `src/services/` and `src/services/mocks/` and `src/services/mocks/fixtures/` — create a `.gitkeep` file inside `src/services/mocks/fixtures/` to preserve the empty directory in git (Constitution III)
- [x] T004 [P] Create `.env.example` at repo root documenting environment variables:
  ```
  # Set to true to use mock service layer (default for local development)
  VITE_USE_MOCK=true
  ```
- [x] T005 [P] Ensure `.gitignore` at repo root includes: `node_modules/`, `dist/`, `.env.local`, `.env.*.local`, `*.local` — add any missing entries without removing Vite-generated ones

**Checkpoint**: Foundation complete — user story work can begin.

---

## Phase 3: User Story 1 — Developer Runs the App Locally (Priority: P1) 🎯 MVP

**Goal**: A developer can clone the repo, follow the README, and run the app in under 5 minutes.

**Independent Test**: Run `npm install && npm run dev` from the repo root. The dev server
starts and a browser URL is printed to the terminal.

### Implementation for User Story 1

- [x] T006 [US1] Create `README.md` at repo root containing:
  - Project name: "COPPA Supervision Center"
  - Brief description: moderator dashboard for managing child Autodesk accounts
  - Prerequisites section: Node.js ≥ 18, npm ≥ 9, with `node --version` and `npm --version` verification commands
  - Setup section: `npm install` command
  - Running section: `npm run dev` command with note about the localhost URL
  - Dev commands table: `npm run dev` / `npm run build` / `npm run preview` with descriptions
  - Environment variables section: reference to `.env.example`

**Checkpoint**: User Story 1 independently testable — `npm install` then `npm run dev` works; browser opens; README instructions are accurate.

---

## Phase 4: User Story 2 — "Linked Accounts" Screen Visible (Priority: P2)

**Goal**: The app renders only the heading "Linked accounts" at the root URL with no
styles, extra content, or default Vite boilerplate.

**Independent Test**: Navigate to `http://localhost:5173`. The text "Linked accounts"
is the only visible content. No custom styles are applied.

### Implementation for User Story 2

- [x] T007 [US2] Rewrite `src/App.jsx` to export a single functional component that renders
  only `<h1>Linked accounts</h1>` — remove all default Vite JSX content, remove
  the App.css import, no additional elements or styles
- [x] T008 [US2] Update `src/main.jsx` — remove the `import './index.css'` line (file was
  deleted in T002); keep only the ReactDOM.createRoot + `<App />` mount; no StrictMode
  wrapper required

**Checkpoint**: User Stories 1 and 2 both independently testable. The page shows exactly
"Linked accounts" as the only content with browser-default typography.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup.

- [x] T009 Run `npm run build` from repo root and confirm the production build completes
  without errors or warnings in the terminal output
- [x] T010 Confirm `vite.config.js` uses `.js` extension (not `.ts`) and contains no
  TypeScript-specific configuration (Constitution I compliance check)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on T001 (npm project must exist before creating subdirectories)
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion; can run in parallel with US1
- **Polish (Phase 5)**: Depends on both user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Start after Foundational — no dependency on US2
- **User Story 2 (P2)**: Start after Foundational — no dependency on US1

### Within Each User Story

- T007 (App.jsx) should be done before T008 (main.jsx) for clarity, though both can be
  done in parallel since they are separate files

### Parallel Opportunities

- T002, T003, T004, T005 can all run in parallel after T001
- T007 and T008 can run in parallel (different files, no dependencies)
- T006 can run in parallel with T007/T008

---

## Notes

- [P] tasks = different files, no dependencies within the same phase
- [USn] label maps each task to its user story for traceability
- `src/services/mocks/fixtures/` is scaffolded but empty — this is intentional (Constitution III)
