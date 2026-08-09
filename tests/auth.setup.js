import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { getMainUser } from '../utils/environment.js';

const authStatePath = path.resolve('playwright/.auth/user.json');

setup('authenticate the main user', async ({ page }) => {
    const { username, password } = getMainUser();
    const loginPage = new LoginPage(page);

    await mkdir(path.dirname(authStatePath), { recursive: true });
    await loginPage.open();
    await loginPage.login(username, password);
    await expect(page).toHaveURL('/inventory.html');
    await page.context().storageState({ path: authStatePath });
});
