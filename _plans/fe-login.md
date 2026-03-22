# [FE] Implementation Plan: Login Feature

**Date:** 2026-03-22
**Spec:** `_specs/fe-login.md`
**Status:** Ready

---

## Current State

- `frontend/src/pages/Login/LoginPage.tsx` — placeholder shell (only had `{/* Auth form component goes here */}`)
- `frontend/src/router.tsx` — had `/login` route but no auth guard
- Missing: AuthContext, ProtectedRoute, AuthCard, LoginForm, API service, token storage

---

## Files to CREATE

| File                                                   | Purpose                                            |
| ------------------------------------------------------ | -------------------------------------------------- |
| `frontend/src/utils/tokenStorage.ts`                   | Abstraction over `localStorage` / `sessionStorage` |
| `frontend/src/services/authService.ts`                 | Calls `POST /api/auth/login`                       |
| `frontend/src/contexts/AuthContext.tsx`                | Auth state + `useAuth()` hook + `AuthProvider`     |
| `frontend/src/components/AuthCard/AuthCard.tsx`        | Shared card layout for auth pages                  |
| `frontend/src/components/AuthCard/index.ts`            | Barrel export                                      |
| `frontend/src/components/LoginForm/LoginForm.tsx`      | Full form with all UI states                       |
| `frontend/src/components/LoginForm/index.ts`           | Barrel export                                      |
| `frontend/src/components/LoginForm/LoginForm.test.tsx` | Unit tests                                         |
| `frontend/src/router/ProtectedRoute.tsx`               | Auth guard for protected routes                    |
| `frontend/src/router/index.tsx`                        | New router (replaces `router.tsx`)                 |
| `frontend/src/setupTests.ts`                           | Sets up `@testing-library/jest-dom`                |

---

## Files to MODIFY

| File                                          | Change                                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| `frontend/src/pages/Login/LoginPage.tsx`      | Replace placeholder with `AuthCard` + `LoginForm` + redirect-if-authenticated |
| `frontend/src/pages/Login/LoginPage.test.tsx` | Expand tests for real behaviour                                               |
| `frontend/src/components/index.ts`            | Add exports for `AuthCard`, `LoginForm`                                       |
| `frontend/src/main.tsx`                       | Wrap `RouterProvider` inside `AuthProvider`; update router import             |
| `frontend/vite.config.ts`                     | Add Vitest config (`test: { environment: 'jsdom', ... }`)                     |

---

## Files to DELETE

| File                      | Reason                                      |
| ------------------------- | ------------------------------------------- |
| `frontend/src/router.tsx` | Replaced by `frontend/src/router/index.tsx` |

---

## Implementation Order

### Step 1 — Token storage (no dependencies)

**CREATE `frontend/src/utils/tokenStorage.ts`**

```ts
saveTokens(tokens: { accessToken: string; refreshToken?: string }, rememberMe: boolean): void
getAccessToken(): string | null  // checks both storages
clearTokens(): void
```

- `rememberMe = true` → `localStorage`
- `rememberMe = false` → `sessionStorage`

---

### Step 2 — Auth API service (no dependencies)

**CREATE `frontend/src/services/authService.ts`**

- Function `login(payload: { email: string; password: string }): Promise<LoginResponse>`
- Base URL: `import.meta.env.VITE_API_URL ?? 'http://localhost:3000'`
- Throws errors with `httpStatus` so callers can distinguish 401 vs 500
- Exports type `User { id, email, name }`

---

### Step 3 — Auth Context (depends on steps 1, 2)

**CREATE `frontend/src/contexts/AuthContext.tsx`**

Provides:

- `user: User | null`
- `isAuthenticated: boolean`
- `login(tokens, user, rememberMe): void` → calls `saveTokens`, sets user state
- `logout(): void` → calls `clearTokens`, clears user state

Hydrates from storage on page load (so a page refresh doesn't log out remembered users).

---

### Step 4 — Wrap AuthProvider into app

**MODIFY `frontend/src/main.tsx`**

```tsx
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
```

---

### Step 5 — AuthCard layout (no auth dependency)

**CREATE `frontend/src/components/AuthCard/AuthCard.tsx`**

- Props: `children`, `title?: string`
- Mobile: full width, `p-4`
- Tablet `md:`: `max-w-[440px]`, centered
- Wrapper: `min-h-dvh grid place-items-center`
- Does not use `RootLayout` (no NavBar on auth pages)

---

### Step 6 — LoginForm (depends on steps 2, 3, router)

**CREATE `frontend/src/components/LoginForm/LoginForm.tsx`**

Local state: `email`, `password`, `rememberMe` (default `false`), `showPassword`, `isLoading`, `fieldErrors`, `apiError`

Validation on submit:

- `email`: non-empty + email regex → "Invalid email address"
- `password`: minimum 8 characters → "Password must be at least 8 characters"

Submit flow:

1. Validate → abort if errors
2. `isLoading = true`, clear `apiError`
3. Call `authService.login({ email, password })`
4. Success → `auth.login(tokens, user, rememberMe)` → `navigate(location.state?.from ?? '/')`
5. HTTP 401 → `apiError = "Incorrect email or password."`
6. Other errors → `apiError = "Something went wrong. Please try again."`
7. `isLoading = false`

Accessibility:

- `<form aria-label="Sign in">`
- `role="alert"` on all error messages
- Password toggle button has dynamic `aria-label`
- All fields disabled when `isLoading`

Links:

- `<Link to="/register">Don't have an account? Sign up</Link>`
- `<Link to="/forgot-password">Forgot your password?</Link>`

---

### Step 7 — ProtectedRoute (depends on step 3)

**CREATE `frontend/src/router/ProtectedRoute.tsx`**

```tsx
const { isAuthenticated } = useAuth();
if (!isAuthenticated)
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
return <Outlet />;
```

---

### Step 8 — New router (depends on step 7)

**CREATE `frontend/src/router/index.tsx`** → **DELETE `frontend/src/router.tsx`**

Route structure:

```
/                     → ProtectedRoute → RootLayout → HomePage
/login                → LoginPage (redirects to / if already authenticated)
/register             → placeholder
/forgot-password      → placeholder
*                     → NotFoundPage
```

---

### Step 9 — LoginPage (depends on steps 5, 6, 3)

**MODIFY `frontend/src/pages/Login/LoginPage.tsx`**

```tsx
const { isAuthenticated } = useAuth();
if (isAuthenticated) return <Navigate to="/" replace />;

return (
  <AuthCard title="Sign in">
    <LoginForm />
  </AuthCard>
);
```

---

### Step 10 — Tests

**CREATE `frontend/src/components/LoginForm/LoginForm.test.tsx`**

Cases to cover:

1. Renders all fields, checkbox, and submit button
2. Validation: invalid email format → inline error
3. Validation: password < 8 characters → inline error
4. Loading state: button + fields disabled
5. API 401 → banner "Incorrect email or password."
6. API 500 → banner "Something went wrong. Please try again."
7. Success → `navigate` called with correct path
8. rememberMe defaults to `false`, toggle works
9. Password toggle changes input `type` + `aria-label`
10. Links to `/register` and `/forgot-password` are present

**MODIFY `frontend/src/pages/Login/LoginPage.test.tsx`**

Add: redirect when `isAuthenticated = true`, renders `LoginForm` when not authenticated.

---

### Step 11 — Update barrel exports

**MODIFY `frontend/src/components/index.ts`**

```ts
export * from "./AuthCard";
export * from "./LoginForm";
```

---

## Vitest Setup (required before running tests)

**MODIFY `frontend/vite.config.ts`** — add:

```ts
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: ['./src/setupTests.ts'],
}
```

**CREATE `frontend/src/setupTests.ts`**:

```ts
import "@testing-library/jest-dom";
```

**Install packages:**

```bash
cd frontend
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

---

## Design Decisions

| Decision                            | Reason                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| No React Hook Form                  | Only 2 fields — `useState` is sufficient, no extra dependency needed               |
| No Redux/Zustand                    | React Context is enough for auth state, simpler approach                           |
| Redirect-if-auth inside `LoginPage` | Simpler than a `GuestRoute` wrapper; `ProtectedRoute` already handles the opposite |
| `router.tsx` → `router/index.tsx`   | Spec names `src/router/ProtectedRoute.tsx`, logical to group into a folder         |
