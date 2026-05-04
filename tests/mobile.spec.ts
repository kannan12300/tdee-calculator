import { expect, test } from "@playwright/test";

test("calculator is usable and responsive on phones", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "TDEE Calculator With Macros" })).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("Goal calories", { exact: true })).toBeVisible();
  await expect(page.getByText("Macro split", { exact: true })).toBeVisible();
  await expect(page.getByText("Higher protein helps preserve muscle during fat loss.")).toBeVisible();
  await expect(page.getByText("Higher carbs support workout performance.")).toBeVisible();
  await expect(page.getByText("Advertisement")).toHaveCount(2);

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(horizontalOverflow).toBeLessThanOrEqual(1);

  const initialCalories = await page.getByText(/kcal\/day/).locator("xpath=..").textContent();

  await page.getByRole("button", { name: "pound" }).click();
  await page.getByRole("button", { name: "inch" }).click();
  await page.getByRole("button", { name: "Fat loss" }).click();
  await expect(page.getByText("Height (in)")).toBeVisible();
  await expect(page.getByText("Weight (lb)")).toBeVisible();

  const numberInputs = page.locator("input[type='number']");
  await numberInputs.nth(0).fill("35");
  await numberInputs.nth(1).fill("70");
  await numberInputs.nth(2).fill("190");

  const updatedCalories = await page.getByText(/kcal\/day/).locator("xpath=..").textContent();
  expect(updatedCalories).not.toEqual(initialCalories);

  await expect(page.getByText("Protein").first()).toBeVisible();
  await expect(page.getByText("Carbs").first()).toBeVisible();
  await expect(page.getByText("Fat").first()).toBeVisible();

  await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath(`${testInfo.project.name}-calculator.png`),
  });
});
