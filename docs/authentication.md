# Authentication with Clerk

## Overview

This application uses **Clerk** exclusively for all authentication and authorization needs. No other authentication methods should be implemented.

## Core Rules

### 1. Clerk is the Only Auth Provider
- **NEVER** implement custom auth logic (JWT, sessions, passwords, etc.)
- **ALWAYS** use Clerk's built-in authentication methods
- All user management goes through Clerk

### 2. Protected Routes
- **/dashboard** is a protected route requiring authentication
- Unauthorized users accessing /dashboard should be redirected to sign-in
- Use Clerk middleware for route protection

### 3. Authenticated User Redirects
- If a logged-in user accesses the homepage (/), redirect them to /dashboard
- Implement this check in the root page or middleware

### 4. Sign-In/Sign-Up Modal Pattern
- Sign-in and sign-up must **always** launch as modals
- Never use full-page sign-in/sign-up routes
- Use Clerk's modal components or custom modal wrappers

## Implementation Patterns

### Middleware Protection
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

### Accessing User Data (Server Components)
```typescript
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) return null // Middleware should prevent this
  
  const user = await currentUser()
  // Use user data
}
```

### Accessing User Data (Client Components)
```typescript
'use client'

import { useUser } from '@clerk/nextjs'

export function UserProfile() {
  const { user, isLoaded, isSignedIn } = useUser()
  
  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return null
  
  return <div>Welcome, {user.firstName}</div>
}
```

### Server Actions with Auth
```typescript
'use server'

import { auth } from '@clerk/nextjs/server'

export async function createLink(url: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  
  // Proceed with authenticated action
}
```

### Homepage Redirect Logic
```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  }
  
  return <LandingPage />
}
```

### Sign-In Modal Component
```typescript
'use client'

import { SignIn } from '@clerk/nextjs'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export function SignInModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <SignIn
          appearance={{ elements: { rootBox: 'mx-auto' } }}
          routing="hash"
        />
      </DialogContent>
    </Dialog>
  )
}
```

## Environment Variables Required

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

## Common Clerk Hooks & Functions

### Client-Side Hooks
- `useUser()` - Current user data and loading state
- `useAuth()` - Auth state and helper methods (signOut, etc.)
- `useSignIn()` - Sign-in flow control
- `useSignUp()` - Sign-up flow control

### Server-Side Functions
- `auth()` - Get userId and session claims
- `currentUser()` - Get full user object
- `clerkClient` - Admin API for user management

## Security Checklist

- [ ] All protected routes are listed in middleware matcher
- [ ] Server actions verify `userId` before executing
- [ ] Database queries filter by authenticated `userId`
- [ ] No hardcoded user IDs or credentials
- [ ] Sign-in/sign-up opens as modal, not full page
- [ ] Logged-in users are redirected from homepage to dashboard

---

**Last Updated:** January 28, 2026
