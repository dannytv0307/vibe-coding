# [BE] <Feature Title>

**Date:** YYYY-MM-DD
**Status:** Draft
**Scope:** Backend

---

## 1. Overview

> One paragraph describing what this feature is and why it matters.

---

## 2. Domain Entities

### `<EntityName>`

| Field     | Type      | Required | Notes                        |
| --------- | --------- | -------- | ---------------------------- |
| id        | uuid      | yes      | primary key                  |
| `<field>` | `<type>`  | yes / no | `<constraint / description>` |
| createdAt | timestamp | yes      | auto                         |
| updatedAt | timestamp | yes      | auto                         |

Relationships:

- `<EntityName>` has many `<Other>` — description
- `<EntityName>` belongs to `<Other>` — description

---

## 3. API Endpoints

### `POST /api/<resource>`

**Auth:** Required / Public
**Role:** admin / user / any

**Request body:**

```json
{
  "field": "type — description"
}
```

**Response `201`:**

```json
{
  "id": "uuid",
  "field": "value"
}
```

**Errors:**

- `400` — validation failed
- `401` — not authenticated
- `403` — forbidden
- `409` — conflict

---

### `GET /api/<resource>`

_(repeat pattern for each endpoint)_

---

## 4. Business Logic

### Rule 1: `<Name>`

- **When:** `<condition>`
- **Then:** `<action>`
- **Edge case:** `<note>`

### State Machine: `<EntityName>.status`

```
PENDING → ACTIVE → COMPLETED
       ↘ CANCELLED
```

---

## 5. Validation Rules

| Field     | Rule                                 |
| --------- | ------------------------------------ |
| `<field>` | required, minLength 3, maxLength 255 |
| `<field>` | must be one of: A, B, C              |

---

## 6. Auth & Permissions

| Endpoint                 | Public | User | Admin |
| ------------------------ | ------ | ---- | ----- |
| `GET /api/<resource>`    | ✅     |      |       |
| `POST /api/<resource>`   |        | ✅   |       |
| `DELETE /api/<resource>` |        |      | ✅    |

---

## 7. Side Effects & Events

- Email sent when: `<condition>`
- Event emitted: `<event.name>` — payload `{ ... }`
- Cache invalidated: `<key>`
- Webhook triggered: `<condition>`

---

## 8. Out of Scope

- `<item>`

---

## 9. Open Questions

- [ ] `<question>`

---

## 10. Implementation Checklist

- [ ] `/be:module <ModuleName>` — scaffold module
- [ ] Define entities / DTOs
- [ ] Implement service logic
- [ ] Implement controller endpoints
- [ ] Add validation pipes
- [ ] Add auth guards
- [ ] Write unit tests
- [ ] Write e2e tests
