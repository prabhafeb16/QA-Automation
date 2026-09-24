import { Page, expect } from '@playwright/test';

export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
}

export class AddEmployeePage {
  constructor(private page: Page) {}

  async fillDetails(data: EmployeeData) {
    await this.page.getByRole('textbox', { name: 'First name' }).fill(data.firstName);
    await this.page.getByRole('textbox', { name: 'Last name' }).fill(data.lastName);
    await this.page.getByRole('textbox', { name: 'Email address' }).fill(data.email);
    await this.page.getByRole('textbox', { name: 'Phone number (optional)' }).fill(data.phone);
    await this.page.locator('.w-8.hover\\:cursor-pointer').click();
    await this.page.getByText('15', { exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Job title (optional)' }).fill(data.jobTitle);
  }

  async save() {
    await this.page.getByRole('button', { name: 'Save new employee' }).click();
    await expect(this.page.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible();
  }
}
