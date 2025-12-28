# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hono Development

Use the `hono` CLI for efficient development. View all commands with `hono --help`.

### Core Commands

- **`hono docs [path]`** - Browse Hono documentation
- **`hono search <query>`** - Search documentation
- **`hono request [file]`** - Test app requests without starting a server

### Quick Examples

```bash
# Search for topics
hono search middleware
hono search "getting started"

# View documentation
hono docs /docs/api/context
hono docs /docs/guides/middleware

# Test your app
hono request -P /api/users src/index.ts
hono request -P /api/users -X POST -d '{"name":"Alice"}' src/index.ts
```

### Workflow

1. Search documentation: `hono search <query>`
2. Read relevant docs: `hono docs [path]`
3. Test implementation: `hono request [file]`

## Project Overview

This is a Cloudflare Workers application built with Hono and server-side rendered JSX. The app uses Vite for development and bundling, with SSR components support via `vite-ssr-components`.

## Architecture

The application follows a minimal SSR architecture:

- **Entry Point**: `src/index.tsx` - Defines the Hono app instance and routes
- **Renderer**: `src/renderer.tsx` - JSX renderer middleware that wraps all pages with HTML structure, includes Vite client for HMR, and handles stylesheets
- **Runtime**: Cloudflare Workers (configured via `wrangler.jsonc`)

JSX is configured to use Hono's JSX runtime (`jsxImportSource: "hono/jsx"`), not React.

## Common Commands

Development:
```bash
npm run dev          # Start Vite dev server with HMR
```

Build and deploy:
```bash
npm run build        # Build for production
npm run preview      # Build and preview locally
npm run deploy       # Build and deploy to Cloudflare Workers
```

Type generation:
```bash
npm run cf-typegen   # Generate TypeScript types from Wrangler config
```

## TypeScript Configuration

When using Cloudflare bindings, pass `CloudflareBindings` as a generic to Hono:

```ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

Run `npm run cf-typegen` after modifying `wrangler.jsonc` to sync types.

## Key Dependencies

- **hono**: Web framework for Cloudflare Workers
- **vite-ssr-components**: SSR utilities for Vite (provides `<ViteClient />` and `<Link />`)
- **@cloudflare/vite-plugin**: Enables Cloudflare Workers development with Vite
- **wrangler**: Cloudflare Workers deployment tool
