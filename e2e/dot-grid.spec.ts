import { test, expect } from "@playwright/test";

test.describe("Dot Grid Workbench", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("should load the page successfully", async ({ page }) => {
    // Verifica se o título está correto
    await expect(page).toHaveTitle(/Dot-Workbench/i);

    // Verifica se elementos principais estão visíveis
    const container = page.locator(".container");
    await expect(container).toBeVisible();
  });

  test("should display dot grid", async ({ page }) => {
    // Verifica se o grid de pontos está presente
    const dotGrid = page.locator(".dot-grid");
    await expect(dotGrid).toBeVisible();

    // Verifica se tem background-image
    const backgroundImage = await dotGrid.evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage;
    });

    expect(backgroundImage).toContain("radial-gradient");
  });

  test("should have interactive hover effect", async ({ page }) => {
    const dotGrid = page.locator(".dot-grid");
    const dotGridMask = page.locator(".dot-grid-mask");

    // Move o mouse sobre o grid
    await dotGrid.hover({ position: { x: 100, y: 100 } });

    // Aguarda um pouco para animação
    await page.waitForTimeout(300);

    // Verifica se a máscara está visível
    await expect(dotGridMask).toBeVisible();
  });

  test("should have responsive layout", async ({ page }) => {
    // Testa diferentes viewports
    const viewports = [
      { width: 1920, height: 1080, name: "Desktop" },
      { width: 768, height: 1024, name: "Tablet" },
      { width: 375, height: 667, name: "Mobile" },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const container = page.locator(".container");
      await expect(container).toBeVisible();

      // Aguarda um pouco para renderização
      await page.waitForTimeout(200);
    }
  });
});
