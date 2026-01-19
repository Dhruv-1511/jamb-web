# Jamb Monorepo

A high-performance, full-stack monorepo template built with **Next.js 16 (App Router)**, **Sanity CMS**, **Shadcn UI**, and **Turborepo**.

![Project Banner](https://raw.githubusercontent.com/robotostudio/turbo-start-sanity/main/turbo-start-sanity-og.png)

## 🚀 Key Features

### 📦 Modern Monorepo Architecture

- **Turborepo**: High-performance build system with remote caching.
- **Apps**: High-speed Next.js frontend (`/web`) & Headless Sanity Studio (`/studio`).
- **Packages**: Shared UI components, configurations (Typescript, ESLint), and utilities.
- **Biome**: Unified tool for ultra-fast formatting and linting.

### 🌐 Frontend (Next.js 16)

- **App Router**: Leveraging React Server Components (RSC) and Server Actions.
- **Micro-Animations**: Smooth UI transitions using Framer Motion.
- **Smart Search**: Integrated fuzzy search with `fuse.js`.
- **Theming**: Dark and light mode support with `next-themes`.
- **Optimized Assets**: Next-generation image handling with Sanity Image URL builder.

### ✍️ Content Management (Sanity Studio)

- **Visual Editing**: Real-time live preview of content changes.
- **Custom Schemas**: Pre-configured for Blog, FAQ, Careers, and generic Pages.
- **Media Management**: Robust asset pipeline for images and files.
- **Type Safety**: Fully typed schemas using Sanity Typegen.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Build System**: [Turborepo](https://turbo.build/)
- **PackageManager**: [pnpm](https://pnpm.io/)
- **Linter/Formatter**: [Biome](https://biomejs.dev/)

---

## 🚦 Getting Started

### 1. Prerequisites

Ensure you have **Node.js v22+** and **pnpm** installed.

### 2. Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

### 3. Environment Variables

You need to set up environment variables in both `apps/web/.env` and `apps/studio/.env`.

**Web (`apps/web/.env`):**

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-08-29"
SANITY_API_READ_TOKEN="your_read_token"
```

**Studio (`apps/studio/.env`):**

```env
SANITY_STUDIO_PROJECT_ID="your_project_id"
SANITY_STUDIO_DATASET="production"
```

### 4. Development

Start both the Frontend and the Studio simultaneously:

```bash
pnpm run dev
```

- **Web App**: `http://localhost:3000`
- **Sanity Studio**: `http://localhost:3333`

---

## 📜 Available Scripts

| Command                | Action                                       |
| :--------------------- | :------------------------------------------- |
| `pnpm run dev`         | Start all apps in development mode           |
| `pnpm run build`       | Build all apps for production                |
| `pnpm run format`      | Auto-format code using Biome/Ultracite       |
| `pnpm run lint`        | Check for linting errors                     |
| `pnpm run check-types` | Run TypeScript type checking across the repo |

---

## 📂 Project Structure

```text
├── apps/
│   ├── web/          # Next.js Frontend
│   └── studio/       # Sanity CMS Studio
├── packages/
│   ├── ui/           # Shared Shadcn UI components
│   ├── typescript/   # Shared TS configurations
│   └── env/          # Shared environment variable logic
└── turbo.json        # Turborepo configuration
```

---

## 🚢 Deployment

### Deploying the Studio

Navigate to the studio directory and use the Sanity CLI:

```bash
cd apps/studio
npx sanity deploy
```

### Deploying the Web App

The Next.js app is optimized for **Vercel**. Simply connect your GitHub repository and set the Root Directory to `apps/web`.

---

## ⚖️ License

This project is licensed under the MIT License.
