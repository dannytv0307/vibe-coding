# SUPPERCOOL — Claude Code Guide

## Project Overview
VibeCoding project: SUPPERCOOL

## Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: NestJS + TypeScript

## Structure
- `backend/` — NestJS REST API (port 3000)
- `frontend/` — React 19 SPA (port 5173)
- `.claude/` — Claude Code configuration & custom commands

## Development

### Frontend
```bash
cd frontend
npm run dev      # start dev server (localhost:5173)
npm run build    # production build
npm run lint     # lint
```

### Backend
```bash
cd backend
npm run start:dev   # start with watch (localhost:3000)
npm run build       # production build
npm run test        # unit tests
npm run test:e2e    # e2e tests
```

## Development Guidelines
- Always read existing code before modifying
- Keep solutions simple and focused
- No unnecessary abstractions
- Use TypeScript strict mode

## Custom Commands
Located in `.claude/commands/` — use `/command-name` to invoke.
