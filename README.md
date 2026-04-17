# Claude Web

Bareface-inspired agency website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui primitives

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open http://localhost:3000

## Available Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
npm run check      # Lint + typecheck + build
```

## Project Structure

```text
src/
  app/           Next.js routes
  components/    UI sections and shared components
  hooks/         Custom React hooks
  lib/           Utilities
  types/         TypeScript types
public/
  fonts/
  images/
  videos/
  seo/
```

## Deployment

Deploy on Vercel or any platform that supports Next.js.
