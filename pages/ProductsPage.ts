import { Page, Locator } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".inventory_item");
    }

    productByName(productName: string): Locator {
        return this.page
            .locator(".inventory_item")
            .filter({ hasText: productName });
    }
}
