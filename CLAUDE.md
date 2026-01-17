# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
# Development (runs both web and studio)
pnpm dev

# Run individual apps
pnpm dev:web      # Next.js frontend at http://localhost:3000
pnpm dev:studio   # Sanity Studio at http://localhost:3333

# Build
pnpm build        # Build all packages
pnpm build:web    # Build web only
pnpm build:studio # Build studio only

# Linting and formatting (uses Ultracite/Biome)
pnpm lint         # Check for issues
pnpm format       # Fix issues automatically
pnpm check-types  # TypeScript type checking

# Generate Sanity types (run from apps/studio)
cd apps/studio && pnpm type
# Or manually:
sanity schema extract --enforce-required-fields && sanity typegen generate
```

## Architecture Overview

### Monorepo Structure
- **apps/web**: Next.js 16 frontend with App Router, React Server Components
- **apps/studio**: Sanity Studio v4 for content management
- **packages/ui**: Shared Shadcn/Radix UI components with Tailwind CSS
- **packages/env**: Type-safe environment variables using @t3-oss/env-nextjs and Zod
- **packages/logger**: Shared logging utilities

### Data Flow: Sanity to Frontend

1. **Schema Definition** (`apps/studio/schemaTypes/`):
   - `documents/`: Content types (blog, page, author, settings, navbar, footer)
   - `blocks/`: Page builder components (hero, cta, faq-accordion, etc.)
   - `definitions/`: Reusable field types (button, custom-url, rich-text, pagebuilder)

2. **GROQ Queries** (`apps/web/src/lib/sanity/query.ts`):
   - Queries use fragment composition pattern with reusable fragments
   - All queries wrapped with `defineQuery()` for type inference
   - Fragment naming: prefix with underscore for internal fragments

3. **Type Generation**:
   - Types generated to `apps/web/src/lib/sanity/sanity.types.ts`
   - Run type generation after schema changes

4. **PageBuilder Pattern** (`apps/web/src/components/pagebuilder.tsx`):
   - Dynamic component rendering based on `_type` field
   - Block components mapped in `BLOCK_COMPONENTS` constant
   - Supports Sanity Visual Editing via `data-sanity` attributes
   - Uses optimistic updates for live preview

### Key Patterns

**Sanity Schema**: Always use `defineType`, `defineField`, and `defineArrayMember` from 'sanity'. Include icons using `lucide-react` or `@sanity/icons`.

**GROQ Queries**: Use fragment composition. Do not expand images unless necessary. Use `select()` for conditional projections.

**Frontend Components**:
- Use `SanityImage` component for Sanity images
- Use `SanityButtons` resolver for button arrays
- Prefer CSS Grid over Flexbox unless working with two siblings
- Use semantic HTML elements

**Environment Variables**: Managed through `@workspace/env` package with Zod validation. Client vars in `packages/env/src/client.ts`, server vars in `server.ts`.

## File Naming

- Use **kebab-case** for all files: `user-profile.tsx`, `blog-card.tsx`
- `.tsx` for React components, `.ts` for utilities
- Schema files mirror component names

## Sanity Studio Specific

- Singleton documents: homePage, navbar, footer, settings, blogIndex
- Run `pnpm type` after schema changes to regenerate types
- Import seed data: `npx sanity dataset import ./seed-data.tar.gz production --replace`
