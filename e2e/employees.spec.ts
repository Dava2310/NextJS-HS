import { test, expect } from '@playwright/test';

/** Matches the message returned by `createEmployee` in app/employees/_logic/index.ts. */
const EMPLOYEE_CREATED_MESSAGE = /Employee created successfully/;
const EMPLOYEE_DELETED_MESSAGE = /Employee deleted successfully/i;

const ROLE_ID = '1';

/**
 * Render cold-start tolerance.
 *
 * The API is hosted on Render's free tier, which suspends the service after
 * inactivity. The first request after suspension can take 60–90 s before the
 * server responds. Both the per-test timeout and the toast assertion timeout
 * must exceed that window so the test does not declare failure before the API
 * has had a chance to wake up and return a result.
 *
 *   TEST_TIMEOUT_MS  — 3 min ceiling for the full test run (navigation +
 *                      form interaction + API round-trip).
 *   TOAST_TIMEOUT_MS — 2 min polling window for the success toast; kept
 *                      shorter than TEST_TIMEOUT_MS so Playwright reports a
 *                      clean assertion error instead of a raw test timeout.
 */
const TEST_TIMEOUT_MS = 3 * 60 * 1_000; // 3 minutes
const TOAST_TIMEOUT_MS = 2.5 * 60 * 1_000; // 2.5 minutes — allows ≥30 s buffer before test ceiling

/** Alphanumeric charset used for password generation (satisfies common password rules). */
const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Returns exactly 10 characters derived from the current epoch milliseconds.
 * Ties the code to wall-clock time, avoids collisions between runs, and
 * satisfies the 10-character alphanumeric employee-code constraint.
 */
function employeeCodeFromDate(date: Date): string {
  return String(date.getTime()).slice(-10);
}

/**
 * Cryptographically strong random alphanumeric string (Playwright runs in Node,
 * so the Web Crypto API is available via the global `crypto` object).
 */
function randomAlphanumeric(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) {
    out += ALPHANUMERIC[bytes[i]! % ALPHANUMERIC.length];
  }
  return out;
}

/** Unique email tied to the current instant — passes `z.email()` on the form. */
function uniqueExampleEmail(date: Date): string {
  return `e2e.${date.getTime()}@example.com`;
}

function buildCreateEmployeePayload() {
  const now = new Date();
  return {
    fullName: 'Playwright Test Employee',
    email: uniqueExampleEmail(now),
    employeeCode: employeeCodeFromDate(now),
    password: randomAlphanumeric(8),
    roleId: ROLE_ID,
  };
}

test.describe('Employees page', () => {
  test('opens the create modal, submits the form, and shows a success toast', async ({ page }) => {
    // Override the default 30 s Playwright timeout so a Render cold-start
    // does not cause a spurious failure (see TEST_TIMEOUT_MS above).
    test.setTimeout(TEST_TIMEOUT_MS);

    const data = buildCreateEmployeePayload();

    // ── 1. Navigate ─────────────────────────────────────────────────────────
    await test.step('Navigate to employees', async () => {
      await page.goto('/employees');
      await expect(page.getByRole('heading', { name: 'Employees' })).toBeVisible({
        timeout: 30_000,
      });
    });

    // ── 2. Open dialog ───────────────────────────────────────────────────────
    await test.step('Open "Create employee" dialog', async () => {
      // Button label is sentence-case ("Create employee"); match case-insensitively.
      await page.getByRole('button', { name: /create employee/i }).click();
      await expect(page.getByRole('dialog', { name: /create employee/i })).toBeVisible();
    });

    // Grab a stable reference to the dialog for all subsequent scoped queries.
    const dialog = page.getByRole('dialog', { name: /create employee/i });

    // ── 3. Fill form ─────────────────────────────────────────────────────────
    await test.step('Fill employee form', async () => {
      await dialog.getByLabel('Employee Full Name').fill(data.fullName);
      await dialog.getByLabel('Email', { exact: true }).fill(data.email);
      await dialog.getByLabel('Employee Code').fill(data.employeeCode);
      await dialog.getByLabel('Employee Password').fill(data.password);
      await dialog.getByLabel('Role ID').fill(data.roleId);
    });

    // Set up toast watchers immediately before clicking Submit (not during fill)
    // to maximise the TOAST_TIMEOUT_MS window. Starting waitFor() here — which
    // begins polling immediately — also catches a fast success toast from a warm
    // API that could appear and disappear (duration:3000) before we finish the
    // 1 s validation-error check that follows the click.
    const successToast = page
      .locator('[data-sonner-toast][data-type="success"]')
      .filter({ hasText: EMPLOYEE_CREATED_MESSAGE });
    const errorToast = page.locator('[data-sonner-toast][data-type="error"]');

    const toastResultPromise = Promise.race([
      successToast
        .waitFor({ state: 'visible', timeout: TOAST_TIMEOUT_MS })
        .then(() => 'success' as const),
      errorToast
        .waitFor({ state: 'visible', timeout: TOAST_TIMEOUT_MS })
        .then(() => 'error' as const),
    ]).catch(() => 'timeout' as const);

    // ── 4. Submit ────────────────────────────────────────────────────────────
    await test.step('Submit form', async () => {
      await dialog.getByRole('button', { name: 'Submit' }).click();
    });

    // ── 5. Detect inline validation errors ───────────────────────────────────
    await test.step('Assert no form validation errors', async () => {
      /**
       * React Hook Form evaluates the Zod schema synchronously on submit and
       * schedules a re-render that adds [data-slot="field-error"] (role="alert")
       * elements for each violated constraint. We give React up to 1 s to
       * flush those renders; if any errors appear we throw with the exact
       * messages so the failure is immediately actionable instead of timing
       * out on the toast or dialog assertions later.
       */
      const fieldErrors = dialog.locator('[data-slot="field-error"]');

      // Wait briefly for React to render any validation errors.
      await fieldErrors
        .first()
        .waitFor({ state: 'visible', timeout: 1_000 })
        .catch(() => {
          // No errors appeared — form passed client-side validation.
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

    // ── 6. Assert success toast ──────────────────────────────────────────────
    await test.step('Assert Sonner success toast', async () => {
      const result = await toastResultPromise;

      if (result === 'error') {
        const errorText = await errorToast.textContent().catch(() => '(could not read text)');
        throw new Error(`API returned an error toast: "${errorText?.trim()}"`);
      }
      if (result === 'timeout') {
        throw new Error('Neither a success nor an error toast appeared within the timeout window.');
      }
    });

    // ── 7. Dialog closes ─────────────────────────────────────────────────────
    await test.step('Dialog closes after success', async () => {
      // The form's success callback calls setOpenDialog(false); allow time for
      // the Radix UI Dialog close animation to complete.
      await expect(dialog).toBeHidden({ timeout: 10_000 });
    });
  });

  test('deletes an employee from the row actions menu', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT_MS);

    // ── 1. Navigate ──────────────────────────────────────────────────────────
    await test.step('Navigate to employees', async () => {
      await page.goto('/employees');
      await expect(page.getByRole('heading', { name: 'Employees' })).toBeVisible({
        timeout: 30_000,
      });
    });

    // ── 2. Wait for table data ───────────────────────────────────────────────
    await test.step('Wait for at least one data row', async () => {
      await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 30_000 });
    });

    // Set up toast watchers before triggering the action.
    const successToast = page
      .locator('[data-sonner-toast][data-type="success"]')
      .filter({ hasText: EMPLOYEE_DELETED_MESSAGE });
    const errorToast = page.locator('[data-sonner-toast][data-type="error"]');

    const toastResultPromise = Promise.race([
      successToast
        .waitFor({ state: 'visible', timeout: TOAST_TIMEOUT_MS })
        .then(() => 'success' as const),
      errorToast
        .waitFor({ state: 'visible', timeout: TOAST_TIMEOUT_MS })
        .then(() => 'error' as const),
    ]).catch(() => 'timeout' as const);

    // ── 3. Open row actions and delete ──────────────────────────────────────
    await test.step('Open row actions and click Delete', async () => {
      await page.getByRole('button', { name: 'Open menu' }).first().click();
      await page.getByRole('menuitem', { name: 'Delete' }).click();
    });

    // ── 4. Assert success toast ──────────────────────────────────────────────
    await test.step('Assert delete success toast', async () => {
      const result = await toastResultPromise;

      if (result === 'error') {
        const errorText = await errorToast.textContent().catch(() => '(could not read text)');
        throw new Error(`API returned an error toast: "${errorText?.trim()}"`);
      }
      if (result === 'timeout') {
        throw new Error('Neither a success nor an error toast appeared within the timeout window.');
      }
    });
  });
});
