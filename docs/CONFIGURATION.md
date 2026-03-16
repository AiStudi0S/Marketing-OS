# Configuration Guide

This guide covers all configuration files and settings in the Spark Template project.

## 📋 Configuration Files Overview

| File | Purpose | Description |
|------|---------|-------------|
| `vite.config.ts` | Build Configuration | Vite bundler and dev server settings |
| `tsconfig.json` | TypeScript Settings | TypeScript compiler options |
| `tailwind.config.js` | Styling Configuration | Tailwind CSS theme and plugins |
| `components.json` | Component Settings | Shadcn UI component configuration |
| `package.json` | Project Metadata | Dependencies, scripts, and project info |
| `.gitignore` | Git Settings | Files to exclude from version control |
| `spark.meta.json` | Spark Metadata | GitHub Spark specific settings |
| `theme.json` | Theme Settings | Application theme configuration |

## ⚙️ Vite Configuration

**File:** `vite.config.ts`

### Current Configuration

```typescript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";
import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createIconImportProxy() as PluginOption,
    sparkPlugin() as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
});
```

### Key Settings

#### Plugins

1. **@vitejs/plugin-react-swc**
   - Fast React refresh using SWC
   - Faster than Babel
   - Hot Module Replacement (HMR)

2. **@tailwindcss/vite**
   - Tailwind CSS v4 Vite plugin
   - Automatic PostCSS processing
   - JIT compilation

3. **createIconImportProxy**
   - Proxies Phosphor icon imports
   - Required for Spark compatibility
   - DO NOT REMOVE

4. **sparkPlugin**
   - GitHub Spark integration
   - Custom transformations
   - DO NOT REMOVE

#### Path Aliases

```typescript
resolve: {
  alias: {
    '@': resolve(projectRoot, 'src')
  }
}
```

**Usage in code:**
```typescript
import { Button } from '@/components/ui/button'  // Instead of '../../../components/ui/button'
import { cn } from '@/lib/utils'                // Instead of '../../lib/utils'
```

### Advanced Vite Configuration

#### Development Server

```typescript
export default defineConfig({
  server: {
    port: 5173,              // Dev server port
    open: true,              // Auto-open browser
    host: true,              // Listen on all addresses
    cors: true,              // Enable CORS
  },
})
```

#### Build Options

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',          // Output directory
    sourcemap: true,         // Generate source maps
    minify: 'esbuild',       // Minification method
    target: 'es2015',        // Target browser support
    chunkSizeWarningLimit: 1000,  // Chunk size warning (KB)
  },
})
```

#### Preview Server

```typescript
export default defineConfig({
  preview: {
    port: 4173,              // Preview server port
    open: true,              // Auto-open browser
  },
})
```

## 📘 TypeScript Configuration

**File:** `tsconfig.json`

### Current Configuration

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strictNullChecks": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### Key Settings Explained

#### Compiler Options

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | ES2020 | JavaScript version to compile to |
| `lib` | ES2020, DOM | Include type definitions |
| `jsx` | react-jsx | Use new JSX transform |
| `module` | ESNext | Use ES modules |
| `moduleResolution` | bundler | Modern module resolution |
| `strict` | Implicit | Enable strict type checking |
| `noEmit` | true | Don't emit JS (Vite handles this) |

#### Path Mapping

```json
"paths": {
  "@/*": ["./src/*"]
}
```

Enables clean imports:
```typescript
// Before
import { Button } from '../../../components/ui/button'

// After
import { Button } from '@/components/ui/button'
```

### Extending Configuration

For stricter checks, add:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 🎨 Tailwind CSS Configuration

**File:** `tailwind.config.js`

### Current Configuration

```javascript
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
  ],
};
```

### Key Settings

#### Content Paths

```javascript
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

Tells Tailwind where to look for class names.

#### Theme Extension

Customize your theme:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#0ea5e9',
        900: '#0c4a6e',
      },
      custom: '#ff6b6b',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    spacing: {
      '128': '32rem',
      '144': '36rem',
    },
    borderRadius: {
      'xl': '1rem',
      '2xl': '2rem',
    },
  },
}
```

#### Plugins

1. **@tailwindcss/container-queries**
   - Container-based responsive design
   - More flexible than media queries

2. **tailwindcss-animate**
   - Pre-built animation utilities
   - Used by UI components

### Custom Utilities

Add custom utilities:

```javascript
plugins: [
  plugin(function({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }
    })
  })
]
```

### Dark Mode

Enable dark mode support:

```javascript
export default {
  darkMode: 'class', // or 'media'
  // ... rest of config
}
```

## 📦 Package Configuration

**File:** `package.json`

### Scripts

```json
{
  "scripts": {
    "dev": "vite",                              // Start dev server
    "build": "tsc -b --noCheck && vite build",  // Build for production
    "lint": "eslint .",                         // Run linter
    "preview": "vite preview",                  // Preview production build
    "optimize": "vite optimize",                // Optimize dependencies
    "kill": "fuser -k 5000/tcp"                 // Kill port 5000
  }
}
```

### Adding Custom Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "build:analyze": "vite build --mode analyze"
  }
}
```

### Dependencies Management

#### Production Dependencies

Required at runtime:
```json
"dependencies": {
  "react": "^19.0.0",
  "@github/spark": ">=0.43.1 <1",
  // ... other runtime deps
}
```

#### Development Dependencies

Only needed during development:
```json
"devDependencies": {
  "vite": "^7.2.6",
  "typescript": "~5.7.2",
  // ... other dev deps
}
```

### Workspaces

```json
{
  "workspaces": {
    "packages": ["packages/*"]
  }
}
```

Supports monorepo structure if needed.

## 🎯 Components Configuration

**File:** `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Key Settings

- **style**: Component design style (new-york or default)
- **tsx**: Use TypeScript
- **baseColor**: Base color palette
- **cssVariables**: Use CSS variables for theming

## 🌈 Theme Configuration

**File:** `theme.json`

```json
{}
```

Currently minimal. Can be extended for:
- Color schemes
- Typography settings
- Custom theme values

**Example extended configuration:**

```json
{
  "colors": {
    "primary": "#0066cc",
    "secondary": "#6366f1",
    "accent": "#f59e0b"
  },
  "typography": {
    "fontFamily": "Inter, sans-serif",
    "headingWeight": "700",
    "bodyWeight": "400"
  }
}
```

## ⚡ Spark Configuration

**File:** `spark.meta.json`

```json
{
  "templateVersion": 1
}
```

Metadata for GitHub Spark integration. Version tracking for template updates.

## 🔒 Git Configuration

**File:** `.gitignore`

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
```

### Adding Environment-Specific Ignores

```
# Build artifacts
*.tsbuildinfo
.vite/

# Logs
logs/
*.log

# OS files
Thumbs.db
```

## 🌍 Environment Variables

### Creating .env Files

```bash
# .env.local (not committed)
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your_api_key
VITE_ENABLE_ANALYTICS=true
```

### Using Environment Variables

```typescript
const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY
const analyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true'
```

### Environment Variable Types

Create `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_KEY: string
  readonly VITE_ENABLE_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 📝 ESLint Configuration

The project uses ESLint 9 with flat config. Configuration can be added to `eslint.config.js`:

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```

## 🔧 Additional Configuration Files

### index.html

Entry HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Spark Template</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### .editorconfig

Add for consistent coding style:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## 🚀 Deployment Configuration

### Vercel

`vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Netlify

`netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📚 Related Documentation

- [Getting Started](GETTING_STARTED.md) - Setup guide
- [Architecture](ARCHITECTURE.md) - Project architecture
- [Development](DEVELOPMENT.md) - Development workflow

---

[← Back to Documentation](README.md) | [Next: Development Guide →](DEVELOPMENT.md)
