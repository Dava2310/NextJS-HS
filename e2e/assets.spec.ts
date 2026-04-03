import { test, expect } from '@playwright/test';

const ASSET_DELETED_MESSAGE = /Asset deleted successfully/i;
const ASSET_FREED_MESSAGE = /Asset freed successfully/i;

const TEST_TIMEOUT_MS = 3 * 60 * 1_000;
const TOAST_TIMEOUT_MS = 2.5 * 60 * 1_000;

async function navigateToAssets(page: Parameters<Parameters<typeof test>[1]>[0]) {
  await page.goto('/assets');
  await expect(page.getByRole('heading', { name: 'Assets' })).toBeVisible({ timeout: 30_000 });
  await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 30_000 });
}

function raceToast(page: Parameters<Parameters<typeof test>[1]>[0], successText: RegExp) {
  const successToast = page
    .locator('[data-sonner-toast][data-type="success"]')
    .filter({ hasText: successText });
  const errorToast = page.locator('[data-sonner-toast][data-type="error"]');

  const promise = Promise.race([
    successToast
      .waitFor({ state: 'visible', timeout: TOAST_TIMEOUT_MS })
      .then(() => 'success' as const),
    errorToast
      .waitFor({ state: 'visible', timeout: TOAST_TIMEOUT_MS })
      .then(() => 'error' as const),
  ]).catch(() => 'timeout' as const);

  return { promise, errorToast };
}

test.describe('Assets page', () => {
  test('deletes an asset from the row actions menu', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT_MS);

    await test.step('Navigate to assets', async () => {
      await navigateToAssets(page);
    });

    const { promise: toastResultPromise, errorToast } = raceToast(page, ASSET_DELETED_MESSAGE);

    await test.step('Open row actions and click Delete', async () => {
      await page.getByRole('button', { name: 'Open menu' }).first().click();
      await page.getByRole('menuitem', { name: 'Delete' }).click();
    });

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

  test('unassigns an employee from an asset via row actions menu', async ({ page }) => {
    test.setTimeout(TEST_TIMEOUT_MS);

    await test.step('Navigate to assets', async () => {
      await navigateToAssets(page);
    });

    const { promise: toastResultPromise, errorToast } = raceToast(page, ASSET_FREED_MESSAGE);

    await test.step('Open row actions and click Unassign Employee', async () => {
      await page.getByRole('button', { name: 'Open menu' }).first().click();
      await page.getByRole('menuitem', { name: 'Unassign Employee' }).click();
    });

    await test.step('Assert unassign success toast', async () => {
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
