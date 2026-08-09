# Playwright POM JavaScript Reference

A JavaScript reference architecture for end-to-end test automation with Playwright, the Page Object Model, reusable fixtures, ES Modules, and CI execution.

## Design principles

- **Tests describe behavior:** business rules and expectations belong in `*.spec.js` files.
- **Pages encapsulate interactions:** selectors and actions for a screen belong in its own Page Object.
- **Fixtures set up the context:** Page Object creation is centralized and injected on demand.
- **Authentication is reused safely:** a setup project signs in once and provides isolated authenticated contexts through `storageState`.
- **Test data stays organized:** products and customers used in scenarios belong in `test-data/`.
- **Configuration fails fast:** required environment variables are validated with a clear message.
- **Failures leave evidence:** traces, screenshots, and videos are retained according to the configuration.

## Prerequisites

- Node.js 24 LTS
- npm

The repository includes an `.nvmrc` file so compatible version managers such as nvm or fnm can select Node.js 24 with `nvm use` or `fnm use`.

## Getting started

To start an independent project with this architecture, select **Use this template** on GitHub. To work directly with this repository, clone it locally:

```bash
git clone https://github.com/lucas-porto1/playwright-pom-js.git
cd playwright-pom-js
```

## Installation

```bash
npm ci
npx playwright install
```

Create the local configuration file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

The accounts in `.env.example` are public SauceDemo accounts. In a real project, never commit credentials; use the CI pipeline's secret store instead.

## Running the tests

```bash
npm test                  # full suite in all three browsers
npm run test:chromium     # fast feedback in Chromium
npm run test:headed       # run with a visible browser
npm run test:ui           # Playwright interactive UI mode
npm run test:debug        # Playwright Inspector
npm run lint              # static analysis
npm run check             # lint and Chromium tests
npm run report            # open the latest HTML report
```

You can also run a specific file or filter tests by title:

```bash
npx playwright test tests/login.spec.js
npx playwright test -g "valid user"
```

## Authentication

Before the browser projects run, `tests/auth.setup.js` signs in with the main test account and saves the browser state to `playwright/.auth/user.json`. Chromium, Firefox, and WebKit load this state so authenticated scenarios do not repeat the login flow.

The generated state is excluded from Git because it can contain sensitive cookies and tokens. It is recreated for each clean test environment. Login scenarios explicitly start with an empty storage state so they continue to validate the authentication flow itself.

This shared account strategy is appropriate while tests do not modify persistent server-side account data. In projects where parallel tests change shared user data, use a separate account and storage state for each worker or role.

## Project structure

```text
.
|-- .github/workflows/     # continuous integration pipeline
|-- fixtures/              # reusable page and context injection
|-- pages/                 # Page Objects separated by responsibility
|-- test-data/             # readable, centralized test data
|-- tests/                 # scenarios, authentication setup, and expectations
|-- utils/                 # stateless configuration and utilities
|-- playwright.config.js   # browsers, artifacts, timeouts, and reporters
`-- eslint.config.js       # quality standards for the entire codebase
```

## Adding a scenario

1. If the scenario introduces a new screen, create a file in `pages/` with resilient selectors such as `getByRole`, `getByLabel`, or `getByTestId`.
2. Expose the page through `fixtures/test.js` to avoid repeated instantiation.
3. Place reusable test data in `test-data/` and keep it free of sensitive information.
4. Write expectations in the test. Page Objects should perform actions, not decide whether a test passed.
5. Run `npm run check` before submitting the change.

## Important decisions

SauceDemo's `data-test` attribute is configured as the Playwright `testIdAttribute`, which enables clear selectors with `getByTestId`. Every test still receives a new browser context. Authenticated contexts start from the same read-only login snapshot, while state created during a scenario remains isolated from other tests.

In CI, linting and tests run on every push and pull request. If the application under test uses private credentials, replace the public workflow values with repository secrets.
