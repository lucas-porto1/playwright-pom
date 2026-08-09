export class CartPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByTestId('checkout');
    }

    item(productName) {
        return this.page.getByTestId('inventory-item').filter({
            has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName }),
        });
    }

    async startCheckout() {
        await this.checkoutButton.click();
    }
}
