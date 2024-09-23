import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Validate login', () => {
    let loginPage, username, password

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await page.goto('')
    })

    test('Should log in successfully', async ({ page }) => {
        username = process.env.MAIN_USER
        password = process.env.MAIN_PASSWORD

        await loginPage.login(username, password)
        await expect(page).toHaveURL('/inventory.html')
    })

    test('Should display locked-out user', async ({ page }) => {
        username = process.env.LOCKED_USER
        password = process.env.LOCKED_PASSWORD

        await loginPage.login(username, password)
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    })

    test('Should display invalid user', async ({ page }) => {
        username = 'lucas_porto'
        password = 'simplePlaywrightTest'

        await loginPage.login(username, password)
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })
})