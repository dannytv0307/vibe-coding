Create a production-ready React 19 page component.

Input: $ARGUMENTS
Format: `<PageName> [layout]`

- layout options: `default` (default) | `auth` | `dashboard` | `fullscreen`

---

## Role

You are a Senior Frontend Engineer with 10+ years of React experience. You architect pages that are: well-structured, SEO-aware, data-fetching ready, accessible, and maintainable at scale.

---

## Step 1 — Validate & Parse Input

- If `$ARGUMENTS` is empty → stop and ask: "Vui lòng cung cấp tên page. Ví dụ: /fe:page UserProfile dashboard"
- Parse PageName (PascalCase). Auto-convert camelCase / kebab-case to PascalCase.
- The final component name will be `<PageName>Page` (e.g. `UserProfilePage`)
- Parse layout (default: `default`)

---

## Step 2 — Determine destination

Check if `src/pages/` exists in `frontend/src/`. If not, create full folder structure:

```
frontend/src/
  components/     ← reusable UI components
  pages/          ← page-level components
  hooks/          ← custom hooks
  types/          ← shared TypeScript types
  utils/          ← pure utility functions
```

Page destination: `frontend/src/pages/<PageName>/`

---

## Step 3 — Generate files

Create **3 files** (no CSS Module — use Tailwind classes directly):

### 3a. `<PageName>Page.tsx` — Page component

Rules:

- Named export only
- Page = data-fetching boundary + layout composition
- Use `Suspense` for async data with meaningful fallback
- Use `useActionState` / `useOptimistic` for mutations
- Use `ErrorBoundary` pattern (comment where to wrap)
- Document the page purpose with a JSDoc comment
- Handle all states: loading, error, empty, success
- **Tailwind CSS utility classes only** — no inline styles, no CSS Modules

Template by layout:

**default:**

```tsx
import { Suspense } from 'react'

/**
 * <PageName>Page — <describe what this page does>
 */
export function <PageName>Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900"><PageName></h1>
      </header>

      <Suspense fallback={<div className="text-center py-8 text-gray-500" aria-busy="true">Loading…</div>}>
        {/* Mount data-driven child components here */}
        <section>
          {/* page content */}
        </section>
      </Suspense>
    </main>
  )
}
```

**auth:**

```tsx
/**
 * <PageName>Page — Authentication page (login / register / reset)
 */
export function <PageName>Page() {
  return (
    <div className="grid place-items-center min-h-dvh bg-gray-100" role="main">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900"><PageName></h1>
        </header>
        <div>
          {/* Auth form component goes here */}
        </div>
      </div>
    </div>
  )
}
```

**dashboard:**

```tsx
import { Suspense } from 'react'

/**
 * <PageName>Page — Dashboard page with sidebar + main content
 */
export function <PageName>Page() {
  return (
    <div className="grid grid-cols-[240px_1fr] min-h-dvh">
      <aside className="border-r border-gray-200 p-6" aria-label="Sidebar navigation">
        {/* Sidebar nav */}
      </aside>
      <main className="p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900"><PageName></h1>
        </header>
        <Suspense fallback={<div className="text-gray-500" aria-busy="true">Loading…</div>}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {/* Dashboard widgets / panels */}
          </div>
        </Suspense>
      </main>
    </div>
  )
}
```

**fullscreen:**

```tsx
/**
 * <PageName>Page — Fullscreen page (landing, onboarding, etc.)
 */
export function <PageName>Page() {
  return (
    <div className="min-h-dvh" role="main">
      <section className="grid place-items-center min-h-dvh text-center px-4">
        <h1 className="text-5xl font-bold">{/* Headline */}</h1>
        <p className="mt-4 text-lg text-gray-600">{/* Subline */}</p>
      </section>
      {/* Additional sections */}
    </div>
  )
}
```

### 3b. `<PageName>Page.test.tsx` — Page tests

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { <PageName>Page } from './<PageName>Page'

describe('<PageName>Page', () => {
  it('renders the page heading', () => {
    render(<PageName>Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('has a main landmark', () => {
    render(<PageName>Page />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  // Add feature-specific tests here
})
```

### 3c. `index.ts` — Barrel export

```ts
export { <PageName>Page } from './<PageName>Page'
```

---

## Step 4 — Register in page index

Check if `frontend/src/pages/index.ts` exists.

- If yes → append: `export * from './<PageName>'`
- If no → create it with the export

---

## Step 5 — Routing hint

Check if `react-router-dom` is in `frontend/package.json`:

- If yes → print the route snippet to add in the router
- If no → print a note about wiring the page manually

Route snippet (if react-router installed):

```tsx
// Add to your router config:
import { <PageName>Page } from './pages/<PageName>'

{ path: '/<page-name>', element: <<PageName>Page /> }
```

---

## Step 6 — Report

```
✅ Page created: <PageName>Page [layout: <layout>]

Files:
  frontend/src/pages/<PageName>/
    ├── index.ts
    ├── <PageName>Page.tsx
    └── <PageName>Page.test.tsx

Wire up:
  import { <PageName>Page } from './pages/<PageName>'
  // Register in your router / app entry

Next: add your components, data fetching, and business logic.
```

---

## Senior Dev Rules (ALWAYS apply)

- **Pages are thin** — orchestration only, no raw API calls inside JSX
- **Suspense boundaries** — always wrap async content
- **Accessible landmarks** — `<main>`, `<header>`, `<nav>`, `<aside>`, `<footer>`
- **`dvh` over `vh`** — avoids mobile browser chrome issues
- **Tailwind CSS only** — no inline styles, no CSS Modules, no styled-components
- **Named exports only** — no default exports
- **`<h1>` per page** — one and only one, defines the page topic
- **React 19** — use `use()`, `useActionState`, `useOptimistic` instead of `useEffect` + state patterns where possible
- **Strict TypeScript** — no `any`, no `as` unless justified
- **Co-located tests** — every page ships with at least smoke + accessibility tests
