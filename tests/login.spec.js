import { test, expect } from '../fixtures/test.js';
import { getLockedUser, getMainUser } from '../utils/environment.js';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('allows a valid user to sign in', async ({ page, loginPage }) => {
    await test.step('Sign in with a valid account', async () => {
      const { username, password } = getMainUser();
      await loginPage.login(username, password);
    });

    await expect(page).toHaveURL('/inventory.html');
  });

  test('shows an error for a locked user', async ({ loginPage }) => {
    const { username, password } = getLockedUser();
    await loginPage.login(username, password);

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });

  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'invalid_password');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
