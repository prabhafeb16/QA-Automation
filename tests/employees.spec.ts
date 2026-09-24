import { test, expect } from '@playwright/test';

const id = Date.now();

const employee1 = {
  firstName: 'Alice',
  lastName: `Cooper${id}`,
  email: `alice.cooper.${id}@test.com`,
  phone: '07700900001',
  jobTitle: 'QA Engineer',
};

const employee2 = {
  firstName: 'Bob',
  lastName: `Martin${id}`,
  email: `bob.martin.${id}@test.com`,
  phone: '07700900002',
  jobTitle: 'Software Developer',
};

// serial ensures tests run in order — scenario 3 checks what 1 and 2 created
test.describe.serial('Employee Management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://sandbox-app.brighthr.com/lite');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill(process.env.BRIGHTHR_EMAIL!);
    await page.getByRole('textbox', { name: 'Password visibility' }).fill(process.env.BRIGHTHR_PASSWORD!);
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('sideBar')).toBeVisible();
  });

  test('Scenario 1 - Add first employee with all fields filled', async ({ page }) => {
    await page.getByTestId('sideBar').getByRole('link', { name: 'Employees' }).click();
    await page.getByRole('button', { name: 'Add employee' }).click();

    await page.getByRole('textbox', { name: 'First name' }).fill(employee1.firstName);
    await page.getByRole('textbox', { name: 'Last name' }).fill(employee1.lastName);
    await page.getByRole('textbox', { name: 'Email address' }).fill(employee1.email);
    await page.getByRole('textbox', { name: 'Phone number (optional)' }).fill(employee1.phone);
    await page.locator('.w-8.hover\\:cursor-pointer').click();
    await page.getByText('15', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Job title (optional)' }).fill(employee1.jobTitle);

    await page.getByRole('button', { name: 'Save new employee' }).click();

    await expect(page.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible();
  });

  test('Scenario 2 - Add second employee', async ({ page }) => {
    await page.getByTestId('sideBar').getByRole('link', { name: 'Employees' }).click();
    await page.getByRole('button', { name: 'Add employee' }).click();

    await page.getByRole('textbox', { name: 'First name' }).fill(employee2.firstName);
    await page.getByRole('textbox', { name: 'Last name' }).fill(employee2.lastName);
    await page.getByRole('textbox', { name: 'Email address' }).fill(employee2.email);
    await page.getByRole('textbox', { name: 'Phone number (optional)' }).fill(employee2.phone);
    await page.locator('.w-8.hover\\:cursor-pointer').click();
    await page.getByText('15', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Job title (optional)' }).fill(employee2.jobTitle);

    await page.getByRole('button', { name: 'Save new employee' }).click();

    await expect(page.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible();
  });

  test('Scenario 3 - Both employees appear in the employee list', async ({ page }) => {
    await page.getByTestId('sideBar').getByRole('link', { name: 'Employees' }).click();

    await expect(page.getByText(`${employee1.firstName} ${employee1.lastName}`)).toBeVisible();
    await expect(page.getByText(`${employee2.firstName} ${employee2.lastName}`)).toBeVisible();
  });

});
