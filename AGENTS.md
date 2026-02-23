# Agent Guidelines for crshort

## Overview

This is an Astro project with React, Tailwind CSS v4, and shadcn/ui. It uses bun as the package manager.

## Build/Lint/Test Commands

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Preview production build locally
bun preview

# Run Astro CLI commands
bun astro <command>

# Type checking
bun astro check
```

### Running a Single Test

There is currently **no test framework** set up in this project. If you need to add tests, use Vitest or Astro's built-in testing with:

```bash
# Install Vitest
bun add -d vitest

# Run a single test file
bun vitest run src/lib/utils.test.ts

# Run tests in watch mode
bun vitest
```

## Project Structure

```
/
├── src/
│   ├── assets/          # Static assets (images, fonts)
│   ├── components/     # React components
│   │   └── ui/         # shadcn/ui components
│   ├── layouts/        # Astro layouts
│   ├── lib/            # Utility functions
│   ├── pages/          # Astro pages
│   └── styles/         # Global CSS
├── public/             # Public static files
└── components.json     # shadcn/ui configuration
```

## Code Style Guidelines

### Imports

- Use path aliases: `@/*` maps to `./src/*`
- Import directly from source files, avoid barrel imports
- **Bad**: `import { Button } from '@/components/ui'`
- **Good**: `import { Button } from '@/components/ui/button'`

For lucide-react icons, import directly:
```tsx
import Check from 'lucide-react/dist/esm/icons/check'
```

### TypeScript

- Uses strict mode via `astro/tsconfigs/strict`
- Always type function parameters and return values
- Use `type` for type aliases, `interface` for object shapes
- Enable `strict: true` in tsconfig

### Naming Conventions

- **Components**: PascalCase (`Button`, `UserProfile`)
- **Files**: kebab-case for Astro pages (`user-profile.astro`), PascalCase for React (`.tsx`)
- **Functions**: camelCase (`getUserData`)
- **Constants**: SCREAMING_SNAKE_CASE for config values
- **CSS Classes**: Tailwind utility classes

### Tailwind CSS v4

- Use Tailwind v4 syntax (no `tailwind.config.js` needed for basic usage)
- Use `@theme` directive in global.css for custom values
- Use `cn()` utility from `@/lib/utils` for conditional classes

```tsx
import { cn } from "@/lib/utils"

<Component className={cn(
  "base-class",
  variant === "primary" && "primary-class"
)} />
```

### React Patterns

- Use function components with explicit prop types
- Prefer composition over inheritance
- Use `memo()` for expensive components when needed
- Avoid barrel file imports from component libraries
- Import icons directly from path (see above)

### shadcn/ui Components

- Components are in `src/components/ui/`
- Use `cva` (class-variance-authority) for variant props
- Follow existing patterns in `button.tsx`

Example component pattern:
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-class", {
  variants: {
    variant: {
      default: "default-class",
      secondary: "secondary-class",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export function Component({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof componentVariants>) {
  return (
    <div className={cn(componentVariants({ variant }), className)} {...props} />
  )
}
```

### Error Handling

- Use try/catch for async operations
- Return error states from functions rather than throwing for expected errors
- Use proper error boundaries for React components

### Astro Specific

- Use `.astro` extension for Astro components
- Mark client-side components with `client:*` directives
- Use `client:load` for immediately needed interactivity
- Use `client:visible` for below-the-fold components
- Server-side data fetching in frontmatter (FENCE)

```astro
---
const data = await fetchData()
---

<html>
  <body>{data}</body>
</html>
```

### File Organization

- Keep components close to where they're used
- Group related components in folders
- Put shared utilities in `src/lib/`
- Put shared hooks in `src/hooks/`

## Performance Guidelines

Follow the rules in `.agents/skills/vercel-react-best-practices/AGENTS.md` for React performance optimization. Key points:

1. Avoid barrel file imports from large libraries
2. Use `Promise.all()` for independent async operations
3. Derive state during render when possible
4. Use functional setState updates
5. Lazy load heavy components

## Netlify Deployment

The project uses `@astrojs/netlify` adapter. Build output goes to Netlify automatically via git integration.

## Dependencies

- **Framework**: Astro 5.x with React 19
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Icons**: lucide-react (import directly)
- **UI Primitives**: Radix UI
- **Utils**: clsx, tailwind-merge, class-variance-authority
- **Adapter**: @astrojs/netlify

## Additional Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [React Docs](https://react.dev)
