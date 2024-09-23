export class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page
        this.addProductButton = page.locator('data-test=add-to-cart-sauce-labs-backpack')
        this.removeProductButton = page.locator('data-test=remove-sauce-labs-backpack')
        this.cartButton = page.locator('data-test=shopping-cart-link')
        this.cartBadge = page.locator('data-test=shopping-cart-badge')
        this.checkoutButton = page.locator('data-test=checkout')
        this.firstNameInput = page.locator('data-test=firstName')
        this.lastNameInput = page.locator('data-test=lastName')
        this.postalCodeInput = page.locator('data-test=postalCode')
        this.continueButton = page.locator('data-test=continue')
        this.finishButton = page.locator('data-test=finish')
        this.productNameText = page.locator('data-test=inventory-item-name')
        this.productDescText = page.locator('data-test=inventory-item-desc')
        this.productPriceText = page.locator('data-test=inventory-item-price')
        this.errorMessage = page.locator('data-test=error')
        this.successMessage = page.locator('data-test=complete-header')
    }

    async addProduct() {
        await this.addProductButton.click()
    }

    async removeProduct() {
        await this.removeProductButton.click()
    }

    async goToCart() {
        await this.cartButton.click()
    }

    async goToCheckout() {
        await this.checkoutButton.click()
    }

    async checkoutInformation(firstname, lastname, postalcode) {
        await this.firstNameInput.fill(firstname)
        await this.lastNameInput.fill(lastname)
        await this.postalCodeInput.fill(postalcode)
        await this.continueButton.click()
    }

    async finishOrder() {
        await this.finishButton.click()
    }

}