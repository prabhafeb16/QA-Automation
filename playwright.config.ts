import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { open: 'always' }]],
  use: {
    baseURL: 'https://sandbox-app.brighthr.com/lite',
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
