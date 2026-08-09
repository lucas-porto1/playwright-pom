# Playwright POM Reference

A reference architecture for end-to-end test automation with Playwright, the Page Object Model, reusable fixtures, and CI execution.

## Design principles

- **Tests describe behavior:** business rules and expectations belong in `*.spec.js` files.
- **Pages encapsulate interactions:** selectors and actions for a screen belong in its own Page Object.
- **Fixtures set up the context:** page creation and reusable authentication are centralized.
- **Test data stays organized:** products and customers used in scenarios belong in `test-data/`.
- **Configuration fails fast:** required environment variables are validated with a clear message.
- **Failures leave evidence:** traces, screenshots, and videos are retained according to the configuration.

## Prerequisites

- Node.js 24 LTS
- npm

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

## Project structure

```text
.
|-- .github/workflows/     # continuous integration pipeline
|-- fixtures/              # reusable page and context injection
|-- pages/                 # Page Objects separated by responsibility
|-- test-data/             # readable, centralized test data
|-- tests/                 # scenarios and business expectations
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

SauceDemo's `data-test` attribute is configured as the Playwright `testIdAttribute`, which enables clear selectors with `getByTestId`. The suite runs in isolation: every test receives a new browser context. Shared login is implemented as a fixture, while every scenario remains independent.

In CI, linting and tests run on every push and pull request. If the application under test uses private credentials, replace the public workflow values with repository secrets.
