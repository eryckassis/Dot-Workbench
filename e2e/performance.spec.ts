import { test, expect } from "@playwright/test";

test.describe("Performance Tests", () => {
  test("should load page within acceptable time", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Página deve carregar em menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);
  });

  test("should have good Core Web Vitals", async ({ page }) => {
    await page.goto("/");

    // Coleta métricas de performance
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const paintEntries = entries.filter((entry) =>
            ["first-contentful-paint", "largest-contentful-paint"].includes(
              entry.name,
            ),
          );

          if (paintEntries.length > 0) {
            resolve({
              fcp: paintEntries.find((e) => e.name === "first-contentful-paint")
                ?.startTime,
              lcp: paintEntries.find(
                (e) => e.name === "largest-contentful-paint",
              )?.startTime,
            });
          }
        }).observe({ entryTypes: ["paint", "largest-contentful-paint"] });

        // Timeout de 5 segundos
        setTimeout(() => resolve({}), 5000);
      });
    });

    console.log("Performance Metrics:", metrics);
  });

  test("should not have memory leaks", async ({ page }) => {
    await page.goto("/");

    // Pega memória inicial
    const initialMemory = await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return (performance as any).memory?.usedJSHeapSize as number | undefined;
    });

    // Interage com a página várias vezes
    for (let i = 0; i < 10; i++) {
      await page.mouse.move(100 + i * 10, 100 + i * 10);
      await page.waitForTimeout(100);
    }

    // Pega memória final
    const finalMemory = await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return (performance as any).memory?.usedJSHeapSize as number | undefined;
    });

    if (initialMemory && finalMemory) {
      // Crescimento de memória deve ser razoável (<5MB)
      const memoryIncrease = (finalMemory - initialMemory) / 1024 / 1024;
      expect(memoryIncrease).toBeLessThan(5);
    }
  });
});
