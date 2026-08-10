import { test, expect } from '../fixtures/test.js';
import { customers } from '../test-data/customers.js';
import { products } from '../test-data/products.js';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await inventoryPage.open();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('completes a purchase successfully', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    const product = products.backpack;

    await test.step('Add the product and review the cart', async () => {
      await inventoryPage.addProduct(product.name);
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await inventoryPage.openCart();
      await expect(cartPage.item(product.name)).toContainText(product.price);
    });

    await test.step('Provide customer information', async () => {
      await cartPage.startCheckout();
      await checkoutPage.fillCustomerInformation(customers.valid);
      await checkoutPage.continue();
      await expect(checkoutPage.summaryItem(product.name)).toContainText(product.price);
    });

    await test.step('Finish the order', async () => {
      await checkoutPage.finishOrder();
      await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
      await expect(page).toHaveURL('/checkout-complete.html');
    });
  });

  test('validates required customer information', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addProduct(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.fillCustomerInformation({ firstName: '', lastName: '', postalCode: '' });
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('updates the cart when a product is added and removed', async ({ inventoryPage }) => {
    await inventoryPage.addProduct(products.backpack.name);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeProduct(products.backpack.name);
    await expect(inventoryPage.cartBadge).toBeHidden();
  });
});
