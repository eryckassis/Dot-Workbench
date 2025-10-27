import { defineConfig, devices } from "@playwright/test";

/**
 * Configuração do Playwright para testes E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Diretório com os testes E2E
  testDir: "./e2e",

  // Timeout para cada teste
  timeout: 30 * 1000,

  // Configuração de expect
  expect: {
    timeout: 5000,
  },

  // Execução paralela
  fullyParallel: true,

  // Falha no primeiro erro (útil em CI)
  forbidOnly: !!process.env.CI,

  // Retry em caso de falha
  retries: process.env.CI ? 2 : 0,

  // Workers (paralelo)
  workers: process.env.CI ? 1 : undefined,

  // Reporter - gera relatórios HTML
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["json", { outputFile: "playwright-report/results.json" }],
    ["list"],
  ],

  // Configurações compartilhadas
  use: {
    // Base URL da aplicação
    baseURL: "http://localhost:5173",

    // Trace apenas em falhas (economiza espaço)
    trace: "on-first-retry",

    // Screenshots apenas em falhas
    screenshot: "only-on-failure",

    // Vídeo apenas em retry
    video: "retain-on-failure",
  },

  // Projetos - diferentes navegadores
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    // Mobile viewports
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Web Server - inicia automaticamente antes dos testes
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
