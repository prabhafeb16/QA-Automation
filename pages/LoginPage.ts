import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto('https://sandbox-app.brighthr.com/lite');
    await this.page.getByRole('link', { name: 'Log in' }).click();
    await this.page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password visibility' }).fill(password);
    await this.page.getByTestId('login-button').click();
    await expect(this.page.getByTestId('sideBar')).toBeVisible();
  }
}
