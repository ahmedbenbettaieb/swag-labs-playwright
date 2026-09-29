# Swag Labs QA — Playwright

End-to-end test automation for [saucedemo.com](https://www.saucedemo.com) using
[Playwright](https://playwright.dev) and TypeScript.

## Architecture

```
.
├── tests/
│   ├── auth/login.spec.ts
│   ├── products/products.spec.ts
│   ├── products/sorting.spec.ts
│   ├── cart/cart.spec.ts
│   └── checkout/checkout.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/test.ts
├── data/
│   ├── users.ts
│   └── products.ts
├── utils/testData.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

| Layer         | Responsibility                                                        |
| ------------- | --------------------------------------------------------------------- |
| `pages/`      | Page Objects — locators and user-facing actions only. No assertions.  |
| `fixtures/`   | Extended `test` that supplies ready-made page objects and test data.  |
| `data/`       | Static seed data (credentials, product names, prices).                |
| `utils/`      | Data generation and helper functions.                                 |
| `tests/`      | Spec files — arrange, act, assert. Never contain raw selectors.        |

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
npm test                # run all tests
npm run test:headed     # run with a visible browser
npm run test:ui         # Playwright UI mode
npm run test:report     # open the last HTML report
```

Filter by project or file:

```bash
npx playwright test --project=chromium
npx playwright test tests/auth/login.spec.ts
npx playwright test -g "should log in"
```

## Type checking

```bash
npm run typecheck
```

## Conventions

- Selectors live in page objects, never in specs.
- One `test()` per behaviour; titles describe the expected outcome.
- Credentials come from `data/users.ts` — do not hardcode them in specs.
- Data that must be unique per test is generated in `utils/testData.ts`.
- Imports are extensionless (`../../pages/LoginPage`); `moduleResolution` is set
  to `bundler` in `tsconfig.json`.

## Test accounts

| Username                | Password      | Notes                                  |
| ----------------------- | ------------- | -------------------------------------- |
| `standard_user`         | `secret_sauce` | Normal login                          |
| `locked_out_user`       | `secret_sauce` | Locked out on login                   |
| `problem_user`          | `secret_sauce` | Cart and checkout behave unexpectedly |
| `performance_glitch_user` | `secret_sauce` | Slow page loads                      |
