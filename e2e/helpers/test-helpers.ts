import { type Page, expect } from "@playwright/test";

/**
 * Aguarda elemento estar visível e retorna
 */
export async function waitForElement(page: Page, selector: string) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  return element;
}

/**
 * Tira screenshot com timestamp
 */
export async function takeScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await page.screenshot({
    path: `test-results/${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Verifica se elemento tem classe CSS
 */
export async function hasClass(
  page: Page,
  selector: string,
  className: string,
) {
  const element = page.locator(selector);
  const classes = await element.getAttribute("class");
  return classes?.includes(className) ?? false;
}

/**
 * Aguarda navegação completar
 */
export async function waitForNavigation(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
}

/**
 * Simula delay realista de usuário
 */
export async function humanDelay(page: Page, ms = 100) {
  await page.waitForTimeout(ms + Math.random() * 50);
}

/**
 * Verifica se está em dark mode
 */
export async function isDarkMode(page: Page) {
  return await page.evaluate(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
}

/**
 * Força dark ou light mode
 */
export async function setColorScheme(
  page: Page,
  scheme: "dark" | "light" | "no-preference",
) {
  await page.emulateMedia({ colorScheme: scheme });
}

/**
 * Pega as dimensões de um elemento
 */
export async function getElementDimensions(page: Page, selector: string) {
  const element = page.locator(selector);
  const box = await element.boundingBox();
  return box;
}

/**
 * Scroll suave até elemento
 */
export async function scrollToElement(page: Page, selector: string) {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await humanDelay(page, 200);
}
