# BrightHR QA Automation

Automated tests for the [BrightHR Lite sandbox](https://sandbox-app.brighthr.com/lite) using Playwright and TypeScript.

---

## Test Scenarios

1. **Scenario 1** – Navigate to the Employees tab and add a first employee, filling in all fields including optional ones
2. **Scenario 2** – Add a second employee
3. **Scenario 3** – Navigate to the Employees tab and verify both employees are displayed in the list

---

## Project Structure

```
QA-Automation/
├── .github/workflows/playwright.yml   # CI pipeline (GitHub Actions)
├── tests/
│   └── employees.spec.ts              # All 3 test scenarios
├── playwright.config.ts               # Playwright configuration
├── package.json
├── tsconfig.json
└── .env                               # Credentials (not committed to git)
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- Google Chrome

---

## Setup

**1. Install dependencies**

```bash
npm install
```

**2. Install Playwright browsers**

```bash
npx playwright install chromium
```

**3. Create a `.env` file** in the project root with the test credentials:

```
BRIGHTHR_EMAIL=qaAutomationTechTask@grr.la
BRIGHTHR_PASSWORD=A1234567890-
```

---

## Running the Tests

**Run tests with browser visible (headed mode)**

```bash
npm test
```

This opens Chrome, runs all 3 scenarios, and automatically opens the HTML report when done.

**Run tests in the background (headless mode)**

```bash
npx playwright test
```

No browser window — useful for CI environments.

---

## Viewing the Report

After every test run the HTML report opens automatically in your browser.

To open it manually at any time:

```bash
npm run test:report
```

The report is saved at:
```
playwright-report/index.html
```

---

## Trace Viewer — Step-by-Step Screenshots

The trace viewer lets you replay every test step and see a screenshot of exactly what was on screen at each action.

### How to open it

1. Run the tests (`npm test`)
2. When the HTML report opens, click on any test (e.g. Scenario 1)
3. Click the **Trace** button
4. The trace viewer opens — use the timeline or action list on the left to scrub through every step

### Turning trace on / off

Open `playwright.config.ts` and change the `trace` value:

| Value | Behaviour |
|---|---|
| `'on'` | Records a trace for every test run |
| `'on-first-retry'` | Only records a trace when a test is retried after failing |
| `'off'` | No trace recorded |

```ts
use: {
  trace: 'on',        // change this value
}
```

### Turning screenshots on / off

Similarly, change the `screenshot` value:

| Value | Behaviour |
|---|---|
| `'on'` | Takes a screenshot after every test |
| `'only-on-failure'` | Only takes a screenshot when a test fails |
| `'off'` | No screenshots |

```ts
use: {
  screenshot: 'on',   // change this value
}
```

---

## CI – GitHub Actions

Tests run automatically on every push or pull request to `main`.

Credentials are stored as **GitHub Secrets** (`BRIGHTHR_EMAIL` and `BRIGHTHR_PASSWORD`) — never committed to the repository.

The test report is uploaded as a build artifact and kept for 14 days. To view it:

1. Go to the **Actions** tab in GitHub
2. Click on a workflow run
3. Download the `playwright-report` artifact

To add the secrets in GitHub:
> Repository → Settings → Secrets and variables → Actions → New repository secret
