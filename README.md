# IT Assets Tracker

> **Live app:** [https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app) ← _replace with your Vercel URL_

---

<!--
  SCREENSHOT
  To add a screenshot:
  1. Take a screenshot of the running app (e.g. the Dashboard page).
  2. Save the file as `screenshot.png` in the root of this repository.
  3. Replace the placeholder below with:
     ![Dashboard](./screenshot.png)
-->

> 📸 _Add a screenshot here — see instructions in the source comment above._

---

## Overview

IT Assets Tracker is a web application for managing a company's IT inventory. It lets you track physical assets (laptops, monitors, peripherals, etc.), assign them to employees, and monitor availability at a glance through a real-time dashboard.

**Key capabilities:**

- Full CRUD management of **Assets**, **Employees**, and **Categories**
- Assign and unassign assets to employees
- Dashboard with availability metrics and an asset-creation trend chart
- Instant feedback via toast notifications on every operation
- Filterable, sortable, paginated data tables across all modules

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Tables | TanStack Table v8 |
| API client | Auto-generated OpenAPI TypeScript client |
| Unit tests | Vitest + Testing Library |
| E2E tests | Playwright |
| Component catalog | Storybook 10 |

## API

All data is served by a dedicated REST API built with NestJS, deployed at:

```
https://api-hs-2026.onrender.com/api
```

The OpenAPI client (`/api-client`) is auto-generated from the API schema, providing fully typed request/response models.

> **Note:** The API is hosted on Render's free tier and may take up to 60 seconds to wake from sleep on first request.

## Getting Started

**Prerequisites:** Node.js 20+, npm.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix issues |
| `npm run prettier:check` | Check formatting with Prettier |
| `npm run prettier:fix` | Auto-format all files |
| `npm run test` | Run unit and component tests with Vitest |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run storybook` | Start the Storybook component catalog on port 6006 |
| `npm run build-storybook` | Build a static Storybook export |
