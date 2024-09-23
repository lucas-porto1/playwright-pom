# Playwright POM Project

This project is an automated test suite using [Playwright](https://playwright.dev/) with the **Page Object Model (POM)** design pattern. It includes configurations for managing environment variables with **dotenv** and code standardization with **ESLint**.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Linting](#linting)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lucas-porto1/playwright-pom.git
   cd playwright-pom
   ```

2. **Install the dependencies:**

   ```
   npm install
   ```

3. **Install Playwright browsers:**

   ```
   npx playwright install
   ```

## Usage

### Running Tests
To run all tests in headless mode:
``` npm run test ```

To run tests with the UI visible:
``` npm run test:ui ```

## Project Structure

```kotlin
├── tests/
│   ├── login.spec.js
│   ├── checkout.spec.js
├── pages/
│   ├── LoginPage.js
│   ├── CheckoutPage.js
├── utils/
│   ├── helper.js
├── .env.example
├── .gitignore
├── .eslintrc.js
├── playwright.config.js
├── package.json
└── README.md
```

- tests/: Contains test files.
- pages/: Contains page classes following the POM pattern.
- utils/: Contains helper functions and utilities.
- .env.example: Example environment variables file.
- .eslint.config.js: ESLint configuration file.
- playwright.config.js: Playwright configuration file.

## Environment Variables
The project uses dotenv to securely manage environment variables.
- Note: I committed the .env file because this is a test project; in a real scenario, the .env should be inside the gitignore and the .env.example without the credentials.


## Linting
The project uses ESLint to ensure code quality and consistency.
