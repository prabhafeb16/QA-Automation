import { Page, expect } from '@playwright/test';

export class EmployeesPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.getByTestId('sideBar').getByRole('link', { name: 'Employees' }).click();
  }

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: 'Add employee' }).click();
  }

  async verifyEmployeesVisible(names: string[]) {
    for (const name of names) {
      await expect(this.page.getByText(name)).toBeVisible();
    }
  }
}
