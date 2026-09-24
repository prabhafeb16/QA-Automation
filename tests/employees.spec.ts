import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeesPage } from '../pages/EmployeesPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';

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
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.BRIGHTHR_EMAIL!, process.env.BRIGHTHR_PASSWORD!);
  });

  test('Scenario 1 - Add first employee with all fields filled', async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    await employeesPage.navigate();
    await employeesPage.clickAddEmployee();
    await addEmployeePage.fillDetails(employee1);
    await addEmployeePage.save();
  });

  test('Scenario 2 - Add second employee', async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    await employeesPage.navigate();
    await employeesPage.clickAddEmployee();
    await addEmployeePage.fillDetails(employee2);
    await addEmployeePage.save();
  });

  test('Scenario 3 - Both employees appear in the employee list', async ({ page }) => {
    const employeesPage = new EmployeesPage(page);

    await employeesPage.navigate();
    await employeesPage.verifyEmployeesVisible([
      `${employee1.firstName} ${employee1.lastName}`,
      `${employee2.firstName} ${employee2.lastName}`,
    ]);
  });

});
