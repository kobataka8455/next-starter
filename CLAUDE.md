# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager. Key commands:

- `pnpm dev` - Development mode: starts Next.js dev server on http://localhost:3000
- `pnpm build` - Production build (SSG or SSR depending on NEXT_PUBLIC_RENDER_MODE)
- `pnpm start` - Start production server (SSR mode only)
- `pnpm lint` - Run all linting (runs lint:js, lint:css, lint:markup)
- `pnpm test` - Unit testing using Vitest
- `pnpm test:e2e` - E2E testing using Playwright
- `pnpm sb` - Start Storybook on http://localhost:6006

Individual commands:
- `pnpm lint:js` - ESLint for TypeScript/JavaScript
- `pnpm lint:css` - stylelint for SCSS
- `pnpm lint:markup` - markuplint for JSX accessibility
- `pnpm test:coverage` - Unit tests with coverage report
- `pnpm test:storybook` - Storybook component tests
- `pnpm type-check` - TypeScript type checking

## Project Architecture

This is a Next.js App Router starter template with SSR/SSG switching capability.

### SSR/SSG Switching
- Controlled by `NEXT_PUBLIC_RENDER_MODE` environment variable in `.env`
- `static`: Static Export - outputs static HTML to `out/` (for S3, GitHub Pages, etc.)
- `ssr`: Server-Side Rendering - renders on each request via Node.js server
- `isr`: Incremental Static Regeneration - static generation with periodic revalidation
- Configuration is in `src/lib/renderConfig.ts`
- Each page uses `export const dynamic = getDynamicConfig()` for per-page control
- `next.config.ts` dynamically sets `output: 'export'` for static mode

### Source Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/common/` - Reusable UI components (Button, Icon, Layout)
- `/src/components/modules/` - Feature-specific components (UserList)
- `/src/hooks/` - Custom React hooks (TanStack Query wrappers)
- `/src/lib/` - Utilities (API client, render config)
- `/src/services/api/` - API functions and Zod schemas
- `/src/stores/` - Zustand state management
- `/src/styles/` - SCSS variables and mixins
- `/src/types/` - TypeScript type definitions
- `/src/mocks/` - MSW mock server for development
- `/src/tests/` - Unit tests (Vitest) and E2E tests (Playwright)

### Key Features
- SSR/SSG/ISR switching via environment variable
- TanStack Query for server state management
- Zustand for client state management
- SCSS Modules with global variables/mixins
- MSW for API mocking in development
- Storybook with @storybook/nextjs framework
- ESLint, stylelint, Prettier, markuplint for code quality
- Vitest for unit tests, Playwright for E2E tests

Node.js requirement: >=20.0.0
