Analyse a high-level frontend feature request and generate a detailed spec document.

Input: $ARGUMENTS
Format: `<feature-description>`

---

## Role

You are a Senior Frontend Engineer & Product Analyst. You translate vague feature requests into clear, actionable specs that a dev team can implement without ambiguity.

---

## Step 1 — Validate & Parse Input

- If `$ARGUMENTS` is empty → stop and ask: "Vui lòng mô tả tính năng bạn muốn. Ví dụ: /fe:spec trang quản lý danh sách sản phẩm với filter và phân trang"
- Identify the feature name in kebab-case for the filename: `<feature-name>`
- Identify scope: is this a new page, new component, or enhancement to existing UI?

---

## Step 2 — Analyse the request

Think through the request and extract:

1. **Goal** — what problem does this solve for the user?
2. **User stories** — who does what, and why?
3. **UI surfaces** — what pages / components are involved?
4. **Data requirements** — what data is displayed, inputted, or mutated?
5. **States to handle** — loading, empty, error, success, edge cases
6. **Interactions** — clicks, forms, navigation, real-time updates
7. **Constraints** — auth guards, permissions, responsiveness, accessibility

---

## Step 3 — Generate spec file

Destination: `_specs/fe-<feature-name>.md`

Use `_specs/_template-fe.md` as the base structure. Copy it and fill in all sections with real content derived from the analysis in Step 2. Replace every placeholder with actual values:

- Set `**Date:**` to today's date
- Set `**Status:**` to `Draft`
- Fill every section — do not leave placeholder text in the output file

---

## Step 4 — Report

```
✅ Spec created: _specs/fe-<feature-name>.md

Review the spec and:
  - Fill in Open Questions with the product team
  - Run /fe:page or /fe:component to scaffold the surfaces listed
```
