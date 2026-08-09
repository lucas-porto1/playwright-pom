export class CheckoutPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
        this.errorMessage = page.getByTestId('error');
        this.successMessage = page.getByTestId('complete-header');
    }

    summaryItem(productName) {
        return this.page.getByTestId('inventory-item').filter({
            has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName }),
        });
    }

    async fillCustomerInformation({ firstName, lastName, postalCode }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}
