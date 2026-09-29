import {Page, Locator} from '@playwright/test';


export class ProductDetailsPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.inventory_details_name');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
    }
}