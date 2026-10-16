import { test, expect } from '@playwright/test';

const productNames = (page) => page.locator('[data-test="product-name"]');
const productPrices = (page) => page.locator('[data-test="product-price"]');

async function openProduct(page, name) {
  await page.getByRole('heading', { name, exact: true }).click();
  await expect(page.locator('[data-test="product-description"]')).toBeVisible();
}

test('user views detailed information for Combination Pliers', async ({ page }) => {
  await test.step('Given the user is on the main catalog page', async () => {
    await page.goto('/');
    await expect(productNames(page).first()).toBeVisible();
  });

  await test.step('When the user opens the Combination Pliers product card', async () => {
    await openProduct(page, 'Combination Pliers');
  });

  await test.step('Then the name, price, and description are displayed', async () => {
    await expect(page.locator('h1[data-test="product-name"]')).toHaveText('Combination Pliers');
    const price = Number((await page.locator('[data-test="unit-price"]').innerText()).replace(/[^\d.]/g, ''));
    expect(price).toBeGreaterThan(0);
    await expect(page.locator('[data-test="product-description"]')).not.toBeEmpty();
  });
});

test('user adds two Pliers to the shopping cart', async ({ page }) => {
  await test.step('Given the user is viewing the Pliers product details', async () => {
    await page.goto('/');
    await openProduct(page, 'Pliers');
  });

  await test.step('When the user selects quantity 2 and adds it to the cart', async () => {
    await page.locator('[data-test="quantity"]').fill('2');
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('.toast-success')).toBeVisible();
  });

  await test.step('Then the shopping cart badge shows 2 items', async () => {
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('2');
  });
});

test('user searches for Hammer', async ({ page }) => {
  await test.step('Given the user is on the home page', async () => {
    await page.goto('/');
    await expect(productNames(page).first()).toBeVisible();
  });

  await test.step('When the user searches for Hammer', async () => {
    await page.locator('[data-test="search-query"]').fill('Hammer');
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.locator('[data-test="search_completed"]')).toBeVisible();
  });

  await test.step('Then every search result matches Hammer', async () => {
    const names = await productNames(page).allTextContents();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) expect(name).toMatch(/hammer/i);
  });
});

test('user sorts products from lowest to highest price', async ({ page }) => {
  await test.step('Given the user is on the shop catalog', async () => {
    await page.goto('/');
    await expect(productNames(page).first()).toBeVisible();
  });

  await test.step('When the user selects Price Low to High', async () => {
    await page.locator('[data-test="sort"]').selectOption('price,asc');
    await expect(page.locator('[data-test="sorting_completed"]')).toBeVisible();
  });

  await test.step('Then the first displayed product has the lowest price', async () => {
    const prices = (await productPrices(page).allTextContents()).map((text) => Number(text.replace(/[^\d.]/g, '')));
    expect(prices.length).toBeGreaterThan(1);
    expect(prices.every(Number.isFinite)).toBe(true);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
