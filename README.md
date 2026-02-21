# Recruitment-App

A minimal, production-ready starter for viewing and managing candidate profiles built with Vite, React, and TypeScript.

## Overview

Recruitment-App is a lightweight frontend application that demonstrates candidate listing and profile views using seed JSON data, a simple service layer, and React Context for global state. It's intended as a starting point for recruitment dashboards or hiring tools.

## Features

- Candidate listing from seeded data (`src/data/candidates.json`).
- Candidate profile pages with detailed information.
- Centralized state management via `src/CandidatesContext.tsx`.
- Simple, easily-replaceable data access layer in `src/services/candidateService.ts`.

## Tech Stack

- React + TypeScript
- Vite (dev server + bundler)


## Quick Start

1. Open a terminal in the project folder.

```bash
cd recruitment-app
npm install
npm run dev
```

2. Open the URL printed by Vite (commonly `http://localhost:5173`).

## Available Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Build production assets
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint (if configured)

## Project Structure

- `index.html` — Application entry HTML
- `vite.config.ts` — Vite configuration
- `src/main.tsx` — App bootstrap
- `src/App.tsx` — Root application component
- `src/types.ts` — TypeScript type definitions
- `src/data/candidates.json` — Seed data for candidates
- `src/CandidatesContext.tsx` — Global candidate state and actions
- `src/services/candidateService.ts` — Data access / service layer
- `src/components/CandidateCard.tsx` — Example UI component
- `src/pages/Home.tsx`, `src/pages/CandidateProfile.tsx` — Page views

## Development Notes

- To change sample data, edit `src/data/candidates.json`.
- To integrate a real backend, replace or extend `src/services/candidateService.ts`.
- Add create/update/delete actions to `CandidatesContext.tsx` for in-app state changes.

## Testing & Linting

- No test runner is included by default; add Jest/React Testing Library as needed.
- Lint with `npm run lint` (ensure the script exists in `package.json`).


## License

Add a `LICENSE` and update this section accordingly.

## Contact

For questions or feature requests, open an issue in the repository.
