# Angular Assessment

An Angular 14 single-page application providing an authenticated dashboard with D3.js-powered charts and a user data table.

## Features

- **Authentication** — Login form with JWT token-based session stored in `sessionStorage`
- **Bar Chart** — D3.js v7 responsive vertical bar chart (via `ResizeObserver`)
- **Donut Chart** — D3.js v7 responsive donut chart (via `ResizeObserver`)
- **User Table** — Displays users (firstName, lastName, username) from API data
- **Route Guards** — `AuthGuard` and `NoAuthGuard` for protected/unauthenticated routes
- **HTTP Interceptor** — Attaches `Authorization: Bearer` header; redirects to `/signin` on 401

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 14.2 (lazy-loaded modules, strict TypeScript) |
| Charts | D3.js 7.9 |
| Styling | Bootstrap 4.6.2 + Bootstrap Icons 1.13.1 |
| Unit Tests | Jasmine 4.3 + Karma 6.4 |
| E2E Tests | Playwright 1.61 |

## Routes

| Path | Component | Guard |
|---|---|---|
| `/signin` | SignInComponent | NoAuthGuard |
| `/dashboard` | DashboardComponent (bar chart, donut chart, user table) | AuthGuard |
| `/` | Redirects to `/dashboard` | — |
| `**` | Redirects to `/signin` | — |

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app automatically reloads on source changes.

## Build

Run `ng build` or `npm run build` to build the project. Build artifacts go to `dist/`.

## Running unit tests

Run `ng test` or `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npx playwright test` to execute E2E tests via [Playwright](https://playwright.dev/).
