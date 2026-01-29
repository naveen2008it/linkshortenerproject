# Agent Instructions for Link Shortener Project

## Overview

This document serves as the primary guide for AI agents working on this Link Shortener project. These instructions ensure consistency, maintainability, and adherence to best practices across all code contributions.

**Project Stack:**
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5+ (Strict mode)
- **Database:** Neon PostgreSQL with Drizzle ORM
- **Authentication:** Clerk
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives with shadcn/ui patterns
- **Icons:** Lucide React

## Quick Reference

For detailed guidelines on specific topics, refer to the following documentation in the `/docs` directory.
ALWAYS refer to the relevant .md file  BEFORE generating any code:

- **[Authentication](/docs/authentication.md)** - Clerk authentication patterns, protected routes, and modal sign-in/sign-up
- **[UI Components](/docs/ui-components.md)** - shadcn/ui component usage, styling guidelines, and best practices


## Core Principles

### 1. TypeScript First
- **Always use strict TypeScript** - no `any` types unless absolutely necessary
- Define explicit types for function parameters and return values
- Use interfaces for object shapes, types for unions/intersections
- Leverage TypeScript's type inference where it improves readability

### 2. Server-First Architecture
- Prefer Server Components by default (no `'use client'` unless needed)
- Use Client Components only when:
  - Using React hooks (useState, useEffect, etc.)
  - Adding event listeners (onClick, onChange, etc.)
  - Using browser-only APIs
  - Integrating third-party libraries that require client-side execution

### 3. Code Quality Standards
- **File Organization:** One component per file, colocate related utilities
- **Naming Conventions:**
  - Components: PascalCase (e.g., `LinkCard.tsx`)
  - Files: kebab-case for utilities (e.g., `format-date.ts`)
  - Variables/Functions: camelCase (e.g., `shortenUrl`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_URL_LENGTH`)
- **Import Order:**
  1. React/Next.js imports
  2. Third-party libraries
  3. Local components
  4. Utilities and helpers
  5. Types
  6. Styles

### 4. Path Aliases
Always use `@/` path alias for imports:
```typescript
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { cn } from "@/lib/utils"
```

## Project-Specific Requirements

### Authentication
- All user-facing routes should respect Clerk authentication
- Use Clerk middleware for route protection
- Access user data via `auth()` or `currentUser()` from `@clerk/nextjs`

### Database Operations
- Use Drizzle ORM for all database interactions
- Define schema in `db/schema.ts`
- Database client exported from `db/index.ts`
- Always use prepared statements and parameterized queries
- Handle errors gracefully with try-catch blocks

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Maintain consistent spacing using Tailwind's spacing scale

### Error Handling
- Implement proper error boundaries
- Use Next.js error.tsx files for route-level error handling
- Log errors appropriately (avoid exposing sensitive data)
- Provide user-friendly error messages

## Development Workflow

### Before Making Changes
1. Read relevant documentation files in `/docs` directory
2. Understand the existing code patterns in the project
3. Check for similar implementations before creating new ones
4. Ensure TypeScript compilation passes

### When Adding New Features
1. Create types/interfaces first
2. Implement server-side logic when possible
3. Add client-side interactivity only when necessary
4. Update documentation if adding new patterns
5. Test with different user states (authenticated/unauthenticated)

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Server/Client components are correctly designated
- [ ] Database queries are secure and efficient
- [ ] Error handling is implemented
- [ ] Responsive design works on all screen sizes
- [ ] Authentication is properly checked where needed
- [ ] No hardcoded values (use environment variables)
- [ ] Imports use path aliases
- [ ] Code follows project naming conventions

## Environment Variables

Required environment variables (reference `.env.local`):
- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- Additional Clerk configuration variables

## Common Patterns

### Server Actions
```typescript
'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'

export async function createShortLink(url: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  
  // Implementation
}
```

### Client Component with Server Data
```typescript
// page.tsx (Server Component)
import { ClientComponent } from './client-component'

export default async function Page() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}

// client-component.tsx
'use client'

export function ClientComponent({ data }: Props) {
  // Client-side logic
}
```

## Getting Help

When uncertain about implementation:
1. Check existing similar components/functions in the codebase
2. Refer to detailed documentation in `/docs` directory
3. Follow Next.js App Router documentation for routing questions
4. Check Drizzle ORM docs for database queries
5. Reference Clerk docs for authentication patterns

## Version Information

- **Next.js:** 16.1.6
- **React:** 19.2.3
- **TypeScript:** 5+
- **Tailwind CSS:** 4+
- **Node.js:** 20+

---

**Last Updated:** January 28, 2026

For detailed information on specific topics, always refer to the documentation in the `/docs` directory.