# [FE] <Feature Title>

**Date:** YYYY-MM-DD
**Status:** Draft
**Scope:** Frontend

---

## 1. Overview

> One paragraph describing what this feature is and why it matters.

---

## 2. User Stories

| As a...  | I want to... | So that...  |
| -------- | ------------ | ----------- |
| `<role>` | `<action>`   | `<benefit>` |

---

## 3. Pages & Components

**New pages:**

- `<PageName>Page` — route `/<path>`

**New components:**

- `<ComponentName>` (ui | form | layout | data) — purpose

**Modified:**

- `<file path>` — reason

---

## 4. Data & API

| Field     | Type     | Source      | Notes    |
| --------- | -------- | ----------- | -------- |
| `<field>` | `<type>` | API / local | `<note>` |

API endpoints consumed:

- `GET /api/...` — description
- `POST /api/...` — description

---

## 5. UI States

**`<ComponentName>`:**

- **Loading** — skeleton / spinner behaviour
- **Empty** — zero-data message + action
- **Error** — error message + retry action
- **Success** — normal render

---

## 6. Interactions & Behaviour

### Flow 1: <Flow Name>

1. User `<action>`
2. System `<reaction>`
3. Result: `<outcome>`

---

## 7. Accessibility & Responsiveness

- Keyboard navigable: Yes / No / Partial — `<notes>`
- Screen reader: landmark roles, aria labels needed
- Mobile (sm): `<layout>`
- Tablet (md): `<layout>`
- Desktop (lg+): `<layout>`

---

## 8. Out of Scope

- `<item>`

---

## 9. Open Questions

- [ ] `<question>`

---

## 10. Implementation Checklist

- [ ] `/fe:page <PageName>` — tạo page
- [ ] `/fe:component <ComponentName> <type>` — tạo component
- [ ] Wire routing
- [ ] Connect API
- [ ] Handle all UI states
- [ ] Accessibility pass
- [ ] Unit tests
