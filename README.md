# Module 05 — Playwright UI automation

A small Playwright project based on four scenarios from the original Module 2 Gherkin document: product details, basket, search, and sorting. The original scenario wording is preserved in `docs/scenarios.feature`; the executable tests are native Playwright specs in `tests/shop.spec.js`.

Playwright provides one test runner for Chromium (the Chrome engine), Firefox, and WebKit (the Safari engine). It starts each test with an isolated browser context, so the four scenarios can run in parallel without sharing a cart or browser state. Its locators wait for elements to become actionable, and traces and screenshots help investigate failures.

## Setup and run

Install Node.js 20 or newer, then:

```sh
npm ci
npx playwright install chromium firefox webkit
npm test
```

The config runs all three browser engines headlessly with **2 workers** and **2 retries** after an initial failure. To run one browser engine:

```sh
npm run test:chrome
npm run test:firefox
npm run test:safari
```

`test:chrome` runs Playwright's Chromium build and `test:safari` runs its WebKit build. The Safari application itself is available only on macOS; WebKit provides its rendering engine on Linux. Playwright downloads matching browser builds during installation. On Linux, `npx playwright install --with-deps` installs required system libraries if they are missing and the machine allows package installation.

The tests use the public application at `https://practicesoftwaretesting.com`. Set `BASE_URL` to override it, or `BROWSER_PROXY` if your environment requires a browser proxy. Failures save screenshots; the first retry also saves a trace. Use `npm run test:report` to inspect the HTML report.

If Firefox needs a local proxy certificate, `PLAYWRIGHT_FIREFOX_WRAPPER` can point to a locally configured Firefox launch wrapper. This setting is optional and has no effect on normal installations.

## Verification in the cloud workspace

The four scenarios passed in Chromium and Firefox with two workers. All four were also executed in WebKit with the configured two retries, but the public shop did not load its products in this workspace: its `QUERY /products` API request is disconnected by the workspace's HTTP/1.1 proxy. The same endpoint responds over HTTP/2, and the other two browser engines load the catalog successfully. This is a network compatibility limit of this workspace; run `npm run test:safari` again on a machine where WebKit can reach the shop API directly.

See the [Playwright introduction](https://playwright.dev/docs/intro), [test configuration](https://playwright.dev/docs/test-configuration), and [browser documentation](https://playwright.dev/docs/browsers) for the commands and settings used here.
