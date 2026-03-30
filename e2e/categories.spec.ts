import { test, expect } from '@playwright/test';

/** Matches the message returned by `createCategory` in app/categories/_logic/index.ts. */
const CATEGORY_CREATED_MESSAGE = /Category created successfully/i;

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

/**
 * Returns a 10-character slug code derived from epoch ms.
 * Format: "cat-" (4 chars) + last 6 digits of epoch ms (6 chars) = 10 chars total.
 * Must be exactly 10 characters — enforced server-side by the API.
 * Also satisfies the frontend regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/i
 */
function categoryCodeFromDate(date: Date): string {
  return `cat-${String(date.getTime()).slice(-6)}`;
}

function buildCreateCategoryPayload() {
  const now = new Date();
  return {
    name: 'E2E Category',
    code: categoryCodeFromDate(now),
    description: 'Created by Playwright e2e test',
  };
}

test.describe('Categories page', () => {
  test('opens the create modal, submits the form, and shows a success toast', async ({ page }) => {
    // Override the default 30 s Playwright timeout so a Render cold-start
    // does not cause a spurious failure (see TEST_TIMEOUT_MS above).
    test.setTimeout(TEST_TIMEOUT_MS);

    const data = buildCreateCategoryPayload();

    // ── 1. Navigate ─────────────────────────────────────────────────────────
    await test.step('Navigate to categories', async () => {
      await page.goto('/categories');
      await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible();
    });

    // ── 2. Open dialog ───────────────────────────────────────────────────────
    await test.step('Open "Create category" dialog', async () => {
      await page.getByRole('button', { name: /create category/i }).click();
      await expect(page.getByRole('dialog', { name: /create category/i })).toBeVisible();
    });

    // Grab a stable reference to the dialog for all subsequent scoped queries.
    const dialog = page.getByRole('dialog', { name: /create category/i });

    // ── 3. Fill form ─────────────────────────────────────────────────────────
    await test.step('Fill category form', async () => {
      await dialog.getByLabel("Category's Name").fill(data.name);
      await dialog.getByLabel('Category Code').fill(data.code);
      await dialog.getByLabel('Description').fill(data.description);
    });

    // Set up toast watchers immediately before clicking Submit (not during fill)
    // to maximise the TOAST_TIMEOUT_MS window. Starting waitFor() here — which
    // begins polling immediately — also catches a fast success toast from a warm
    // API that could appear and disappear (duration:3000) before we finish the
    // 1 s validation-error check that follows the click.
    const successToast = page
      .locator('[data-sonner-toast][data-type="success"]')
      .filter({ hasText: CATEGORY_CREATED_MESSAGE });
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
      await expect(dialog).toBeHidden({ timeout: 10_000 });
    });
  });
});
