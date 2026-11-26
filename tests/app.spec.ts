import { expect, test } from '@playwright/test';

// Sample tests for https://github.com/bunnyshell/template-vue-tailwind.
// Replace them with tests for your own application.

test.describe('application (public URL)', () => {
  test('home page renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hello World');
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Deployed with Bunnyshell');
  });

  test('build-time variables reach the app', async ({ page }) => {
    test.skip(!process.env.EXPECTED_APP_NAME, 'EXPECTED_APP_NAME not set');
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 3 })).toContainText(process.env.EXPECTED_APP_NAME!);
  });
});

test.describe('application (internal service URL)', () => {
  // TEST_LOCAL_URL is the Kubernetes service address, reachable only from inside the
  // environment. This is the case an external CI runner cannot cover.
  test.skip(!process.env.TEST_LOCAL_URL, 'TEST_LOCAL_URL not set');

  test('service answers inside the cluster', async ({ request }) => {
    const response = await request.get(process.env.TEST_LOCAL_URL!);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('id="app"');
  });
});
