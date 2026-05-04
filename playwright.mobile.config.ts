import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  reporter: "line",
  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3003",
    browserName: "chromium",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "iphone-12",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "pixel-5",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev -- -p 3003",
    url: "http://127.0.0.1:3003",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
