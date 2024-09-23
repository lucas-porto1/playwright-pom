import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { CheckoutPage } from '../pages/CheckoutPage'

test.describe('Validate checkout', () => {
    const username = process.env.MAIN_USER
    const password = process.env.MAIN_PASSWORD
    let loginPage, checkoutPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        checkoutPage = new CheckoutPage(page)

        await page.goto('')
        await loginPage.login(username, password)
    })

    test('Should purchase a product successfully', async ({ page }) => {
        const firstName = "Lucas"
        const lastName = "Porto"
        const postalCode = "000000000"
        const productName = 'Sauce Labs Backpack'
        const productDesc = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
        const productPrice = '$29.99'

        await checkoutPage.addProduct()
        await checkoutPage.goToCart()
        await expect(checkoutPage.productNameText).toHaveText(productName)
        await expect(checkoutPage.productDescText).toHaveText(productDesc)
        await expect(checkoutPage.productPriceText).toHaveText(productPrice)
        await checkoutPage.goToCheckout()
        await checkoutPage.checkoutInformation(firstName, lastName, postalCode)
        await expect(checkoutPage.productNameText).toHaveText(productName)
        await expect(checkoutPage.productDescText).toHaveText(productDesc)
        await expect(checkoutPage.productPriceText).toHaveText(productPrice)
        await checkoutPage.finishOrder()
        await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!')
    })

    test('Validate empty shipping information', async ({ page }) => {
        await checkoutPage.addProduct()
        await checkoutPage.goToCart()
        await checkoutPage.goToCheckout()
        await checkoutPage.checkoutInformation('', '', '')
        await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required')
    })

    test('Validate item being added and removed', async ({ page }) => {
        await checkoutPage.addProduct()
        await expect(checkoutPage.cartBadge).toBeEnabled()
        await checkoutPage.removeProduct()
        await expect(checkoutPage.cartBadge).toBeHidden()
    })
})