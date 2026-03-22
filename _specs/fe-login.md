# [FE] Login Page

**Date:** 2026-03-22
**Status:** Draft
**Scope:** Frontend

---

## 1. Overview

The login page allows users to authenticate with their email and password. Users can opt to stay signed in ("Remember me") so they are not logged out when closing the browser. The page also provides quick links to the registration and forgot-password pages, ensuring the full authentication flow is clearly connected.

---

## 2. User Stories

| As a...                    | I want to...                           | So that...                                                |
| -------------------------- | -------------------------------------- | --------------------------------------------------------- |
| Unauthenticated visitor    | Enter my email & password to sign in   | I can access features that require authentication         |
| Unauthenticated visitor    | Check "Remember me"                    | I stay signed in when I close and reopen the browser      |
| Unauthenticated visitor    | Uncheck "Remember me"                  | My session expires automatically when I close the browser |
| Visitor without an account | Click the "Sign up" link               | I am taken to the account registration page               |
| User who forgot password   | Click the "Forgot your password?" link | I am taken to the password recovery page                  |

---

## 3. Pages & Components

**New pages:**

- `LoginPage` — route `/login`

**New components:**

- `LoginForm` (form) — email, password, remember-me checkbox, submit button
- `AuthCard` (layout) — centered card container shared across auth pages

**Modified:**

- `src/router/index.tsx` — adds `/login` route, redirects `/` to `/login` when unauthenticated
- `src/router/ProtectedRoute.tsx` — reads auth state to guard protected routes

---

## 4. Data & API

| Field          | Type      | Source | Notes                                                   |
| -------------- | --------- | ------ | ------------------------------------------------------- |
| `email`        | `string`  | Input  | Validated as a proper email format                      |
| `password`     | `string`  | Input  | Minimum 8 characters, never shown as plain text         |
| `rememberMe`   | `boolean` | Input  | Defaults to `false`                                     |
| `accessToken`  | `string`  | API    | Stored in `localStorage` (remember) or `sessionStorage` |
| `refreshToken` | `string`  | API    | Optional — if supported by the backend                  |
| `user`         | `object`  | API    | Basic user info returned after a successful login       |

API endpoints consumed:

- `POST /api/auth/login` — sends `{ email, password }`, receives token & user info

---

## 5. UI States

**`LoginForm`:**

- **Idle** — empty form, "Sign in" button enabled
- **Loading** — "Sign in" button disabled + spinner, all fields disabled to prevent double submit
- **Validation Error** — inline error shown below each field (invalid email format, short password)
- **API Error** — alert/banner at the top of the form: "Incorrect email or password." (HTTP 401), or "Something went wrong. Please try again." (HTTP 500)
- **Success** — redirect to the previous page or home (`/`)

---

## 6. Interactions & Behaviour

### Flow 1: Successful sign-in

1. User enters a valid email and password.
2. User checks or unchecks the "Remember me" checkbox.
3. User clicks "Sign in" (or presses `Enter`).
4. Form transitions to Loading state.
5. Calls `POST /api/auth/login`.
6. Receives token → stores in `localStorage` (if remembered) or `sessionStorage` (if not).
7. Updates auth context.
8. Redirects to the intended destination (`location.state.from`) or `/`.

### Flow 2: Failed sign-in (wrong credentials)

1. API returns HTTP 401.
2. Form exits Loading state.
3. Displays error banner: "Incorrect email or password."
4. Fields retain their current values (not cleared).
5. User can correct and retry.

### Flow 3: Navigate to Sign up

1. User clicks "Don't have an account? Sign up".
2. Navigates to `/register`.

### Flow 4: Navigate to Forgot password

1. User clicks "Forgot your password?".
2. Navigates to `/forgot-password`.

### Flow 5: Route guard (already authenticated)

1. User with a valid token visits `/login`.
2. Automatically redirected to `/` (login page is not shown).

---

## 7. Accessibility & Responsiveness

- **Keyboard navigable:** Yes — Tab through email → password → checkbox → submit button → links; Enter submits the form
- **Screen reader:** `<form>` has `aria-label="Sign in"`, fields have associated `<label>` elements, error messages have `role="alert"`
- **Password toggle:** show/hide button with dynamic `aria-label` reflecting current state
- **Mobile (sm):** AuthCard spans full screen width, 16px padding
- **Tablet (md):** AuthCard has max-width 440px, centered
- **Desktop (lg+):** Same as tablet; background illustration may be added on the sides

---

## 8. Out of Scope

- OAuth / Social login (Google, Facebook)
- 2FA / Multi-factor authentication
- CAPTCHA / rate limiting (handled by the backend)
- Registration page (`/register`) — separate spec
- Forgot password page (`/forgot-password`) — separate spec

---

## 9. Open Questions

- [ ] Does the backend return a `refreshToken`? If so, where should it be stored (HttpOnly cookie or storage)?
- [ ] Does "Remember me" affect the token TTL, or only where the token is stored client-side?
- [ ] After a successful login, where should the user be redirected if there is no `location.state.from`? (default `/`)
- [ ] Is account locking required after N failed attempts? Does the frontend need to handle HTTP 423?
- [ ] Display language: English only, or should i18n be set up from the start?

---

## 10. Implementation Checklist

- [ ] `/fe:page Login` — create `LoginPage`
- [ ] `/fe:component LoginForm form` — create `LoginForm`
- [ ] `/fe:component AuthCard layout` — create `AuthCard` (shared with Register, ForgotPassword)
- [ ] Wire `/login` route in the router, add redirect if already authenticated
- [ ] Integrate `POST /api/auth/login`
- [ ] Handle `rememberMe` → store token in the correct storage
- [ ] Update auth context after successful login
- [ ] Handle all UI states (loading, validation error, API error, success)
- [ ] Accessibility pass (keyboard nav, aria labels, role="alert")
- [ ] Unit tests for `LoginForm` (validation, submit, error display)
