# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks
- `npm start` - Serve production build

### Development Notes
- Default port: 8080 (configured in vite.config.ts)
- Chat API endpoint: Currently configured to localhost:5005 in src/pages/Advisor.tsx
- Path alias: `@/` resolves to `./src/`

## Tech Stack

- **React 18.3** with TypeScript
- **Vite** build tool with React SWC plugin
- **shadcn/ui** component library (extensive Radix UI primitives)
- **TailwindCSS** for styling
- **React Router v6** for routing
- **TanStack Query** for server state management
- **React Hook Form + Zod** for form validation
- **Recharts** for data visualization
- **Three.js (React Three Fiber)** for 3D graphics

## Architecture Overview

### Mobile-First PWA
- Maximum container width: 432px
- PWA-enabled with service worker and manifest
- Mobile-optimized UI components

### Directory Structure
```
src/
├── pages/                    # Route components
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── widgets/             # Domain-specific widgets
│   ├── transactions/        # Transaction features
│   ├── insights/            # Analytics/insights features
│   ├── navigation/          # Navigation components
│   └── stories/             # Story-related components
├── data/                    # Static data files
├── hooks/                   # Custom React hooks
└── lib/                     # Utilities and themes
```

### Key Patterns
- **Component Library**: Using shadcn/ui for consistent UI components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state
- **Styling**: TailwindCSS with custom theme configuration
- **Type Safety**: Comprehensive TypeScript usage

### Lovable Platform Integration
This project is built with Lovable AI platform (Project URL: https://lovable.dev/projects/90742c3b-fd51-4519-b24b-ab07e4cbdfda). Changes made via Lovable are automatically committed to this repository.