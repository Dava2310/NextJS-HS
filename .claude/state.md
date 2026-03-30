# E2E test discovery log

Shared memory for non-obvious behavior, selectors, timing, and API quirks found while writing or debugging Playwright e2e tests in this repo.

## How agents should use this file

- **Before** planning or implementing e2e tests: read this file end-to-end.
- **After** you fix a failure, stabilize a flaky assertion, or learn something that will matter on the next feature test: append a short entry under **Discoveries** (include the date in `YYYY-MM-DD`).

Keep entries factual and actionable: what broke, what fixed it, which files or patterns matter.

## Discoveries

_Add entries below (newest first recommended). Each entry: short `### YYYY-MM-DD — title` plus bullets for symptom, cause, fix/pattern, and file paths._

### 2026-03-30 — API enforces stricter constraints than frontend Zod schema

- **Symptom**: Categories test got an error toast: "Category code must be exactly 10 characters."
- **Cause**: The backend API enforces `length === 10` on the category code, but the frontend Zod schema only has `max(32)`. The hint was in the placeholder: `cat-123456` = 10 chars.
- **Fix/pattern**: Generate codes as `cat-` (4 chars) + last 6 epoch-ms digits (6 chars) = 10 chars total. Always verify backend constraints by checking the form field placeholder, not just the Zod schema.
- **Files**: `e2e/categories.spec.ts` (`categoryCodeFromDate`), `app/categories/_components/form.tsx` (placeholder).

### 2026-03-30 — Sonner toast race condition with warm API

- **Symptom**: Success toast never found (120 s timeout) even though form submitted correctly. Loading toast also invisible.
- **Cause**: When the Render API is already warm, `toast.promise` resolves in <1 s. The success toast has `duration: 3000` so it disappears after 3 s. The test spent 1 s in the validation-error check after clicking Submit — by the time it started waiting for the toast, it was already gone.
- **Fix/pattern**: Set up `locator.waitFor({ state: 'visible', timeout: TOAST_TIMEOUT_MS })` in a `Promise.race` **immediately before** the Submit click (not after). Playwright starts polling the moment the Promise is created, so the watcher is live before the click fires. See `toastResultPromise` in `e2e/categories.spec.ts` and `e2e/employees.spec.ts`.
- **Files**: `e2e/categories.spec.ts`, `e2e/employees.spec.ts`.

### 2026-03-30 — Render cold-start can exceed 120 s; use 150 s for TOAST_TIMEOUT_MS

- **Symptom**: Both employee and category tests timed out after 120 s waiting for the success toast. Error contexts confirmed the loading toast was visible (API call in-flight).
- **Cause**: Render free tier can take > 120 s to wake from sleep, exceeding `TOAST_TIMEOUT_MS = 2 * 60 * 1_000`.
- **Fix/pattern**: Set `TOAST_TIMEOUT_MS = 2.5 * 60 * 1_000` (150 s). `TEST_TIMEOUT_MS` stays at 3 min (180 s), leaving a ≥30 s buffer. Do not start the toast `waitFor` during the fill step — start it just before the Submit click to avoid eating into the timeout.
- **Files**: `e2e/categories.spec.ts`, `e2e/employees.spec.ts`.

### 2026-03-30 — Full name fields reject digits (employees form)

- **Symptom**: "Full name may only contain letters, spaces, and . ' -" validation error blocked form submission.
- **Cause**: `'Playwright E2E Employee'` contains the digit `2` in `E2E`. The Zod regex is `^[\p{L}\p{M}\s'.-]+$/u` — letters only, no digits.
- **Fix/pattern**: Use `'Playwright Test Employee'` (no digits). General rule: never put digits in full name fields for this project.
- **Files**: `e2e/employees.spec.ts` (`buildCreateEmployeePayload`).
