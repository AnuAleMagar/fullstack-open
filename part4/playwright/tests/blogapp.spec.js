const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Ali",
        username: "ali",
        password: "password",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = page.getByText("log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("ali");
      await page.getByLabel("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Ali logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("ali");
      await page.getByLabel("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();
      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("wrong username or password");
      await expect(page.getByText("ali logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("ali");
      await page.getByLabel("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByLabel("title").fill("new blog created by playwright");
      await page.getByLabel("author").fill("ali");
      await page.getByLabel("url").fill("https://hello.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText(/^new blog created by playwright ali/)
      ).toBeVisible();
    });
    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByLabel("title").fill("new blog created by playwright");
      await page.getByLabel("author").fill("ali");
      await page.getByLabel("url").fill("https://hello.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText(/^new blog created by playwright ali/)
      ).toBeVisible();
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      const likesElement = page.locator("text=Likes").first().locator("..");
      await expect(likesElement).toContainText("Likes: 1");
    });
    test("the user who added the blog can delete it", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByLabel("title").fill("playwright");
      await page.getByLabel("author").fill("ali");
      await page.getByLabel("url").fill("https://hello.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText(/^playwright ali/)).toBeVisible();
      await page.getByRole("button", { name: "view" }).click();
      page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain("Remove blog playwright by ali?");
        await dialog.accept();
      });
      await page.getByRole("button", { name: "remove" }).click();
      await expect(page.getByText(/^playwright ali/)).not.toBeVisible();
    });
  });
});
