Create a production-ready React 19 reusable component.

Input: $ARGUMENTS
Format: `<ComponentName> [type]`
- type options: `ui` (default) | `form` | `layout` | `data`

---

## Role
You are a Senior Frontend Engineer with 10+ years of React experience. You write components that are: type-safe, accessible, composable, testable, and follow React 19 best practices.

---

## Step 1 — Validate & Parse Input

- If `$ARGUMENTS` is empty → stop and ask: "Vui lòng cung cấp tên component. Ví dụ: /fe:component Button ui"
- Parse ComponentName (PascalCase). If provided in camelCase or kebab-case → convert to PascalCase automatically
- Parse type (default: `ui`)

---

## Step 2 — Determine destination

Check if `src/components/` exists in `frontend/src/`. If not, create the folder structure:
```
frontend/src/
  components/     ← reusable UI components
  pages/          ← page-level components
  hooks/          ← custom hooks
  types/          ← shared TypeScript types
  utils/          ← pure utility functions
```

Component destination: `frontend/src/components/<ComponentName>/`

---

## Step 3 — Generate files

Create **4 files**:

### 3a. `<ComponentName>.tsx` — Main component

Rules:
- Use **named export** (never default export for components)
- Define `<ComponentName>Props` interface **above** the component
- Use `React.FC` is forbidden — use plain function with typed props
- Props: use `children?: React.ReactNode` when composable
- Accessibility: add `aria-*` attributes, semantic HTML
- React 19: prefer `useActionState` for forms, `use()` for async when applicable
- NO inline styles — use CSS Modules only
- Handle loading / error / empty states when type is `data`

Template by type:

**ui:**
```tsx
import styles from './<ComponentName>.module.css'

export interface <ComponentName>Props {
  children?: React.ReactNode
  className?: string
  // add relevant props
}

export function <ComponentName>({ children, className }: <ComponentName>Props) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
```

**form:**
```tsx
import { useActionState } from 'react'
import styles from './<ComponentName>.module.css'

export interface <ComponentName>Props {
  onSubmit: (data: FormData) => Promise<{ error?: string }>
}

export function <ComponentName>({ onSubmit }: <ComponentName>Props) {
  const [state, action, isPending] = useActionState(onSubmit, { error: undefined })
  return (
    <form action={action} className={styles.root}>
      {state.error && <p role="alert" className={styles.error}>{state.error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
```

**layout:**
```tsx
import styles from './<ComponentName>.module.css'

export interface <ComponentName>Props {
  children: React.ReactNode
}

export function <ComponentName>({ children }: <ComponentName>Props) {
  return <section className={styles.root}>{children}</section>
}
```

**data:**
```tsx
import { use } from 'react'
import styles from './<ComponentName>.module.css'

export interface <ComponentName>Props {
  dataPromise: Promise<unknown[]>
}

export function <ComponentName>({ dataPromise }: <ComponentName>Props) {
  const data = use(dataPromise)
  if (!data.length) return <p className={styles.empty}>No data found.</p>
  return <ul className={styles.root}>{/* render items */}</ul>
}
```

### 3b. `<ComponentName>.module.css` — Scoped styles

```css
.root {
  /* base styles */
}
```
Add relevant states: `.error`, `.empty`, `.loading` based on type.

### 3c. `<ComponentName>.test.tsx` — Unit tests

Use `@testing-library/react` + `vitest`:
- Test: renders without crashing
- Test: renders children / content correctly
- Test: accessibility (role, aria attributes)
- Test: key user interactions
- For form: test submit, pending state, error display
- For data: test empty state

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { <ComponentName> } from './<ComponentName>'

describe('<ComponentName>', () => {
  it('renders without crashing', () => {
    render(<ComponentName />)
  })
  // add specific tests based on type
})
```

### 3d. `index.ts` — Barrel export

```ts
export { <ComponentName> } from './<ComponentName>'
export type { <ComponentName>Props } from './<ComponentName>'
```

---

## Step 4 — Update or create component registry

Check if `frontend/src/components/index.ts` exists.
- If yes → append: `export * from './<ComponentName>'`
- If no → create it with the export

---

## Step 5 — Report

```
✅ Component created: <ComponentName> [type: <type>]

Files:
  frontend/src/components/<ComponentName>/
    ├── index.ts
    ├── <ComponentName>.tsx
    ├── <ComponentName>.module.css
    └── <ComponentName>.test.tsx

Usage:
  import { <ComponentName> } from '@/components/<ComponentName>'
  // or
  import { <ComponentName> } from '@/components'

Next: implement your props, styles, and tests.
```

---

## Senior Dev Rules (ALWAYS apply)

- **No `any`** — use `unknown` or proper generics
- **No default exports** for components
- **No prop drilling** > 2 levels — suggest context or composition
- **Accessible by default** — semantic HTML + ARIA
- **CSS Modules only** — no inline styles, no styled-components
- **Colocate** everything — test, style, component in same folder
- **React 19 APIs** — prefer `useActionState`, `useOptimistic`, `use()` over older patterns
- **Strict TypeScript** — no type assertions (`as`) unless absolutely necessary
