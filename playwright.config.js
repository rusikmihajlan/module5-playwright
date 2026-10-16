import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 2,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...(process.env.BROWSER_PROXY
      ? { proxy: { server: process.env.BROWSER_PROXY } }
      : {}),
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        ...(process.env.PLAYWRIGHT_FIREFOX_WRAPPER
          ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_FIREFOX_WRAPPER } }
          : {}),
      },
    },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
