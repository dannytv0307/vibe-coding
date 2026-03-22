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

Create **4 files**:

### 3a. `<PageName>Page.tsx` — Page component

Rules:
- Named export only
- Page = data-fetching boundary + layout composition
- Use `Suspense` for async data with meaningful fallback
- Use `useActionState` / `useOptimistic` for mutations
- Use `ErrorBoundary` pattern (comment where to wrap)
- Document the page purpose with a JSDoc comment
- Handle all states: loading, error, empty, success

Template by layout:

**default:**
```tsx
import { Suspense } from 'react'
import styles from './<PageName>Page.module.css'

/**
 * <PageName>Page — <describe what this page does>
 */
export function <PageName>Page() {
  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <h1><PageName></h1>
      </header>

      <Suspense fallback={<div className={styles.loading} aria-busy="true">Loading…</div>}>
        {/* Mount data-driven child components here */}
        <section className={styles.content}>
          {/* page content */}
        </section>
      </Suspense>
    </main>
  )
}
```

**auth:**
```tsx
import styles from './<PageName>Page.module.css'

/**
 * <PageName>Page — Authentication page (login / register / reset)
 */
export function <PageName>Page() {
  return (
    <div className={styles.root} role="main">
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}><PageName></h1>
        </header>
        <div className={styles.body}>
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
import styles from './<PageName>Page.module.css'

/**
 * <PageName>Page — Dashboard page with sidebar + main content
 */
export function <PageName>Page() {
  return (
    <div className={styles.root}>
      <aside className={styles.sidebar} aria-label="Sidebar navigation">
        {/* Sidebar nav */}
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1><PageName></h1>
        </header>
        <Suspense fallback={<div aria-busy="true">Loading…</div>}>
          <div className={styles.grid}>
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
import styles from './<PageName>Page.module.css'

/**
 * <PageName>Page — Fullscreen page (landing, onboarding, etc.)
 */
export function <PageName>Page() {
  return (
    <div className={styles.root} role="main">
      <section className={styles.hero}>
        <h1>{/* Headline */}</h1>
        <p>{/* Subline */}</p>
      </section>
      {/* Additional sections */}
    </div>
  )
}
```

### 3b. `<PageName>Page.module.css` — Scoped styles

Generate CSS based on layout:

**default:**
```css
.root {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.header { margin-bottom: 2rem; }
.content { /* content area */ }
.loading { color: #666; padding: 2rem; text-align: center; }
```

**auth:**
```css
.root {
  display: grid;
  place-items: center;
  min-height: 100dvh;
  background: var(--color-bg-subtle, #f5f5f5);
}
.card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,.08);
}
.header { margin-bottom: 1.5rem; }
.title { font-size: 1.5rem; font-weight: 700; }
```

**dashboard:**
```css
.root {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100dvh;
}
.sidebar {
  border-right: 1px solid var(--color-border, #e5e5e5);
  padding: 1.5rem;
}
.main { padding: 2rem; overflow-y: auto; }
.header { margin-bottom: 2rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

**fullscreen:**
```css
.root { min-height: 100dvh; }
.hero {
  display: grid;
  place-items: center;
  min-height: 100dvh;
  text-align: center;
  padding: 2rem;
}
```

### 3c. `<PageName>Page.test.tsx` — Page tests

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

### 3d. `index.ts` — Barrel export

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
import { <PageName>Page } from '@/pages/<PageName>'

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
    ├── <PageName>Page.module.css
    └── <PageName>Page.test.tsx

Wire up:
  import { <PageName>Page } from '@/pages/<PageName>'
  // Register in your router / app entry

Next: add your components, data fetching, and business logic.
```

---

## Senior Dev Rules (ALWAYS apply)

- **Pages are thin** — orchestration only, no raw API calls inside JSX
- **Suspense boundaries** — always wrap async content
- **Accessible landmarks** — `<main>`, `<header>`, `<nav>`, `<aside>`, `<footer>`
- **`dvh` over `vh`** — avoids mobile browser chrome issues
- **No magic numbers** — use CSS custom properties for colors/spacing
- **Named exports only** — no default exports
- **`<h1>` per page** — one and only one, defines the page topic
- **React 19** — use `use()`, `useActionState`, `useOptimistic` instead of `useEffect` + state patterns where possible
- **Strict TypeScript** — no `any`, no `as` unless justified
- **Co-located tests** — every page ships with at least smoke + accessibility tests
