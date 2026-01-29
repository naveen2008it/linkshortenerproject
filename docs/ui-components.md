# UI Components Guide

## Overview

This project exclusively uses **shadcn/ui** for all UI components. Custom components should not be created when a shadcn/ui alternative exists.

## Core Principles

### 1. Use shadcn/ui Components Only
- **Always use shadcn/ui components** for UI elements
- Do not create custom buttons, inputs, dialogs, or other common UI elements
- Check [shadcn/ui documentation](https://ui.shadcn.com) before implementing any UI feature

### 2. Component Installation
Install components as needed using the CLI:
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
```

### 3. Component Composition
- Compose shadcn/ui primitives to create page-specific components
- Use the `cn()` utility for conditional styling
- Maintain consistent spacing and design patterns

## Common Components

### Buttons
```typescript
import { Button } from "@/components/ui/button"

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Forms
```typescript
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Email" />
</div>
```

### Dialogs
```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Cards
```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

## Styling Guidelines

### Using cn() Utility
```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  "additional-classes"
)} />
```

### Responsive Design
```typescript
<div className="flex flex-col md:flex-row gap-4 p-4 md:p-6" />
```

## Component Location

All shadcn/ui components are located in:
```
/components/ui/
```

When installed via CLI, components are automatically added to this directory with proper TypeScript types and Tailwind styling.

## Best Practices

1. **Don't Modify Core Components** - Extend through composition rather than modifying base components
2. **Use Variants** - Leverage built-in variants before adding custom styles
3. **Maintain Consistency** - Use the same components across the app for uniform UX
4. **Accessibility First** - shadcn/ui components are built with Radix UI primitives for accessibility
5. **Check Before Building** - Always verify if shadcn/ui has the component before creating custom solutions

## Available Components

Common shadcn/ui components include:
- `button`, `input`, `label`, `textarea`
- `card`, `dialog`, `dropdown-menu`, `popover`
- `select`, `checkbox`, `radio-group`, `switch`
- `table`, `tabs`, `toast`, `tooltip`
- `alert`, `badge`, `separator`, `skeleton`
- And many more...

Visit [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components) for the complete list.

## Icons

Use **Lucide React** for all icons:
```typescript
import { Search, User, Settings } from "lucide-react"

<Button>
  <Search className="mr-2 h-4 w-4" />
  Search
</Button>
```

---

**Remember:** If you need a UI component, check shadcn/ui first. Do not create custom alternatives.
