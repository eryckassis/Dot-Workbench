import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
  test("should match desktop screenshot", async ({ page }) => {
    await page.goto("/");

    // Aguarda carregamento completo
    await page.waitForLoadState("networkidle");

    // Tira screenshot e compara com baseline
    await expect(page).toHaveScreenshot("desktop-homepage.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("should match dot grid component", async ({ page }) => {
    await page.goto("/");

    const dotGrid = page.locator(".dot-grid");

    // Screenshot apenas do componente
    await expect(dotGrid).toHaveScreenshot("dot-grid-component.png", {
      animations: "disabled",
    });
  });

  test("should match hover state", async ({ page }) => {
    await page.goto("/");

    const dotGrid = page.locator(".dot-grid");

    // Hover sobre o elemento
    await dotGrid.hover({ position: { x: 100, y: 100 } });
    await page.waitForTimeout(500);

    // Screenshot do estado hover
    await expect(dotGrid).toHaveScreenshot("dot-grid-hover.png");
  });

  test("should match dark mode", async ({ page }) => {
    // Força dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("dark-mode-homepage.png", {
      fullPage: true,
    });
  });

  test("should match mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("mobile-homepage.png", {
      fullPage: true,
    });
  });
});
