---
name: new-e2e-test
description: Guide for writing and verifying Playwright e2e tests in this Next.js + ShadCN project. Use when the user asks to create, add, fix, or run e2e / Playwright tests.
---

You are helping the user write, debug, or extend Playwright e2e tests for this Next.js project. Follow every convention below. Prefer **reading source** over guessing selectors or behavior.

---

## 0. Read project memory first (required)

1. **Read** `.claude/state.md` from the repo root **before** you plan selectors, flows, or data. It records discoveries from past e2e work (flaky timing, wrong roles, API quirks, ShadCN/Radix behavior).
2. If `.claude/state.md` is missing, create it using the same structure as the existing template (title, “How agents should use this file”, **Discoveries** section).
3. **After** you resolve a non-obvious issue or learn something that will help the next test author, **append** a concise entry under **Discoveries** (date `YYYY-MM-DD`, symptom, cause, fix/pattern, relevant paths). Do not duplicate long prose; bullet points are enough.

---

## 1. ShadCN / UI components — read before asserting

This project uses **ShadCN-style** components built on **Radix UI** primitives (`components/ui/` plus shared pieces under `components/`).

- For any **non-trivial** control (Dialog, Select, DropdownMenu, Combobox, Sheet, Drawer, Tabs, Popover, Command, DataTable patterns, etc.), **open the implementation** under `components/ui/` and, if the page composes a custom wrapper, under `components/`.
- Derive **roles, labels, portals, and `data-*` hooks** from that source. Do not assume “it is a `<select>`” or “the list is in the dialog” — Radix often portals content to `document.body`.
- Simple fields may still map to `FieldLabel` / `Input` patterns documented below; complex widgets need the same **read-first** rule.

---

## 2. Verify with a subagent (run tests and fix failures)

After you add or materially change e2e tests (or fix app code for testability):

1. **Delegate** execution to a **subagent** (e.g. Cursor **Task** tool with `subagent_type: shell`, or your environment’s equivalent) so the test run is isolated and the full log is captured.
2. From the **project root**, run:

   ```bash
   npm run test:e2e
   ```

   (`test:e2e` runs `playwright test --project=chromium` per `package.json`.)

3. **Inspect** the subagent output: failing specs, timeouts, traces, assertion messages. **Fix** the tests (or, if the failure exposes a real bug, fix the app) in small, focused changes.
4. **Re-run** via the subagent until `npm run test:e2e` passes or you hit an external blocker (e.g. API down). If blocked, record the situation in `.claude/state.md` under **Discoveries**.

Do not treat the test file as “done” until this loop has completed successfully or the blocker is documented.

---

## 3. File location

All test files live in `e2e/` at the project root and use the `.spec.ts` extension. Name the file after the feature being tested, e.g. `e2e/roles.spec.ts`.

---

## 4. Timeouts — always account for the Render cold start

The API is hosted on Render's free tier and can take **60–90 s** to wake from sleep. Every test that touches the API must declare these two constants and apply them:

```ts
const TEST_TIMEOUT_MS = 3 * 60 * 1_000; // 3 minutes — full test ceiling
const TOAST_TIMEOUT_MS = 2 * 60 * 1_000; // 2 minutes — toast assertion window
```

Set the per-test timeout inside the test body (not in the config):

```ts
test('...', async ({ page }) => {
  test.setTimeout(TEST_TIMEOUT_MS);
  // ...
});
```

---

## 5. Test structure

Use `test.describe` + named `test.step` blocks. Steps make the HTML report and error messages readable — every logical action must be its own step.

```
test.describe('<Page> page', () => {
  test('<what the test proves>', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT_MS);

    await test.step('Navigate to <page>', ...);
    await test.step('Open "<Action>" dialog', ...);
    await test.step('Fill <entity> form', ...);
    await test.step('Submit form', ...);
    await test.step('Assert no form validation errors', ...);   // always include
    await test.step('Assert Sonner success toast', ...);        // always include
    await test.step('Dialog closes after success', ...);
  });
});
```

---

## 6. Navigation & heading assertion

```ts
await test.step('Navigate to <page>', async () => {
  await page.goto('/<route>');
  await expect(page.getByRole('heading', { name: '<Page Title>' })).toBeVisible();
});
```

The heading text comes from the `title` prop passed to `DashboardShell` in the page component (`app/<route>/page.tsx`).

---

## 7. Opening a dialog

The trigger button uses sentence case: "Create employee", "Create role", etc. Always match case-insensitively, then assert the dialog is visible before proceeding.

```ts
await test.step('Open "Create <entity>" dialog', async () => {
  await page.getByRole('button', { name: /create <entity>/i }).click();
  await expect(page.getByRole('dialog', { name: /create <entity>/i })).toBeVisible();
});

// Grab a stable reference for all scoped queries below.
const dialog = page.getByRole('dialog', { name: /create <entity>/i });
```

The dialog's accessible name comes from `<DialogTitle>` in the form component (`app/<route>/_components/form.tsx`). If your feature uses a Sheet or other overlay, confirm the role and title in `components/ui/` + the feature form.

---

## 8. Filling form fields

Use `getByLabel` scoped to the dialog. Labels are defined via `<FieldLabel htmlFor="...">` linked to `<Input id="...">` in the form component. Always scope to `dialog` to avoid matching labels outside of it.

```ts
await test.step('Fill <entity> form', async () => {
  await dialog.getByLabel('Field Label Text').fill(value);
  // Use { exact: true } only when the label text is a common word like "Email"
  await dialog.getByLabel('Email', { exact: true }).fill(data.email);
});
```

For ShadCN **Select** and similar, use the actual trigger/listbox pattern from `components/ui/select.tsx` (or the feature wrapper), not a blind `getByLabel` on a hidden native select.

---

## 9. Unique test data

Fields with uniqueness constraints (codes, emails) must use the current timestamp so that repeated runs never collide.

```ts
/** 10-char alphanumeric code derived from epoch ms — satisfies the form's length(10) rule. */
function codeFromDate(date: Date): string {
  return String(date.getTime()).slice(-10);
}

/** Unique email that passes z.email() validation. */
function uniqueEmail(date: Date): string {
  return `e2e.${date.getTime()}@example.com`;
}

/** Cryptographically random alphanumeric string (Node's Web Crypto API). */
const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function randomAlphanumeric(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) out += ALPHANUMERIC[bytes[i]! % ALPHANUMERIC.length];
  return out;
}
```

Centralise all field values in a `build<Entity>Payload()` factory:

```ts
function buildCreateRolePayload() {
  const now = new Date();
  return {
    name: 'E2E Role',
    code: codeFromDate(now),
  };
}
```

**Important:** full name fields must NOT contain digits — the Zod regex `^[\p{L}\p{M}\s'.-]+$/u` only allows letters, spaces, and `. ' -`. Use `'Playwright Test Employee'`, never `'E2E Employee'`.

---

## 10. Detecting inline form validation errors

Always add this step immediately after clicking Submit. It surfaces the exact Zod error message if the form never reaches the API.

```ts
await test.step('Assert no form validation errors', async () => {
  const fieldErrors = dialog.locator('[data-slot="field-error"]');

  // Wait up to 1 s for React to flush any validation-error renders.
  await fieldErrors.first().waitFor({ state: 'visible', timeout: 1_000 }).catch(() => {
    // No errors — form passed client-side validation.
  });

  const errorCount = await fieldErrors.count();
  if (errorCount > 0) {
    const messages = await fieldErrors.allTextContents();
    throw new Error(
      `Form submission was blocked by ${errorCount} validation error(s):\n` +
        messages.map((msg, i) => `  [${i + 1}] ${msg.trim()}`).join('\n')
    );
  }
});
```

Field errors are rendered by `<FieldError>` (`components/ui/field.tsx`) as `<div role="alert" data-slot="field-error">`.

---

## 11. Asserting the Sonner success toast

`toast.promise` (used in all form components) transitions a **single DOM node** through: `data-type="loading"` → `data-type="success"` (or `"error"`).

Always assert in two sub-steps:

```ts
await test.step('Assert Sonner success toast', async () => {
  // Step A — confirm the POST actually started (guards against false-positives
  // from the page-load "... loaded successfully" toast, also data-type="success").
  const loadingToast = page.locator('[data-sonner-toast][data-type="loading"]');
  await expect(loadingToast).toBeVisible({ timeout: 5_000 });

  // Step B — wait for the promise to resolve (survives a Render cold-start).
  const successToast = page
    .locator('[data-sonner-toast][data-type="success"]')
    .filter({ hasText: /<ENTITY> (created|updated|deleted) successfully/i });
  await expect(successToast).toBeVisible({ timeout: TOAST_TIMEOUT_MS });
});
```

The success message string comes from the `message` field returned by the API function in `app/<route>/_logic/index.ts`. Read that file to get the exact text before writing the regex.

---

## 12. Dialog close assertion

```ts
await test.step('Dialog closes after success', async () => {
  await expect(dialog).toBeHidden({ timeout: 10_000 });
});
```

The form's `success` callback calls `setOpenDialog(false)`, which triggers the Radix UI Dialog close animation. 10 s is sufficient.

---

## Checklist before writing the test

1. Read `.claude/state.md`.
2. Read `app/<route>/page.tsx` — get the `DashboardShell` title and confirm the route.
3. Read `app/<route>/_components/form.tsx` — get button text, dialog title, field labels, and field IDs.
4. Read `app/<route>/_logic/index.ts` — get the Zod schema (to generate valid data) and the success message string.
5. For each complex control in the flow, read the matching file(s) in `components/ui/` and `components/` as needed.
6. Check for uniqueness constraints in the schema (codes, emails) and use timestamp-based helpers for those fields.
7. Check that no text field value contains digits if the schema uses the `\p{L}` letter-only regex.
8. After implementation, run the **subagent verification loop** (`npm run test:e2e`) and update `.claude/state.md` if you learn something new.

---

## Reference

Gold-standard patterns live in `e2e/employees.spec.ts`.
