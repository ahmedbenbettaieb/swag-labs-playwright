import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage";
import { users } from "../../data/users";

test.describe("Products", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goTo();
        await loginPage.Login(users.standard.username, users.standard.password);
    });

    test("products are displayed after login", async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await expect(productsPage.products).toHaveCount(6);
    });

    test("every product opens its details page", async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const productDetailsPage = new ProductDetailsPage(page);

        // count() does not auto-wait, so wait for the list to render first.
        await productsPage.products.first().waitFor();
        const productCount = await productsPage.products.count();

        for (let i = 0; i < productCount; i++) {
            const product = productsPage.products.nth(i);

            const productName = await product
                .locator(".inventory_item_name")
                .textContent();

            await product.locator(".inventory_item_name").click();

            await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);

            await expect(productDetailsPage.productTitle).toHaveText(
                productName!.trim(),
            );

            // Debug only: pause so the details page is visible in headed mode. Remove when done.
            await page.waitForTimeout(2000);

            await page.goBack();
        }
    });
});
