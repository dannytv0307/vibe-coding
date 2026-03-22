Analyse a high-level backend feature request and generate a detailed spec document.

Input: $ARGUMENTS
Format: `<feature-description>`

---

## Role

You are a Senior Backend Engineer & API Designer. You translate vague feature requests into clear, actionable specs that a dev team can implement without ambiguity.

---

## Step 1 — Validate & Parse Input

- If `$ARGUMENTS` is empty → stop and ask: "Vui lòng mô tả tính năng bạn muốn. Ví dụ: /be:spec API quản lý đơn hàng với trạng thái và thanh toán"
- Identify the feature name in kebab-case for the filename: `<feature-name>`
- Identify scope: new module, new endpoints on existing module, or background job?

---

## Step 2 — Analyse the request

Think through the request and extract:

1. **Goal** — what business problem does this solve?
2. **Actors** — who calls this API? (user roles, services, cron jobs)
3. **Domain entities** — what data models are involved or need to be created?
4. **Operations** — CRUD, business logic, state machines, side effects
5. **Constraints** — auth/permission, rate limiting, validation rules, idempotency
6. **Integration points** — external APIs, queues, events, other modules

---

## Step 3 — Generate spec file

Destination: `_specs/be-<feature-name>.md`

Use `_specs/_template-be.md` as the base structure. Copy it and fill in all sections with real content derived from the analysis in Step 2. Replace every placeholder with actual values:

- Set `**Date:**` to today's date
- Set `**Status:**` to `Draft`
- Fill every section — do not leave placeholder text in the output file

---

## Step 4 — Report

```

✅ Spec created: \_specs/be-<feature-name>.md

Review the spec and:

- Fill in Open Questions with the tech / product team
- Run /be:module to scaffold the module listed

```

```

```
