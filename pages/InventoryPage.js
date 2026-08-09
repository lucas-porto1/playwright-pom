export class InventoryPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    productCard(productName) {
        return this.page.getByTestId('inventory-item').filter({
            has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName }),
        });
    }

    async addProduct(productName) {
        await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeProduct(productName) {
        await this.productCard(productName).getByRole('button', { name: 'Remove' }).click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}
