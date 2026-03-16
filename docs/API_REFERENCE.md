# API Reference

This document provides technical reference for utilities, hooks, types, and helper functions available in the Spark Template.

## 📚 Table of Contents

- [Utilities](#utilities)
- [Hooks](#hooks)
- [Error Handling](#error-handling)
- [Type Definitions](#type-definitions)
- [Configuration Options](#configuration-options)
- [Environment Variables](#environment-variables)

## 🛠️ Utilities

### `cn()`

Utility function for conditionally joining class names together using `clsx` and merging Tailwind CSS classes with `tailwind-merge`.

**Location:** `src/lib/utils.ts`

**Signature:**
```typescript
function cn(...inputs: ClassValue[]): string
```

**Parameters:**
- `inputs`: Variable number of class values (strings, objects, arrays)

**Returns:**
- `string`: Merged class names

**Usage:**
```typescript
import { cn } from '@/lib/utils'

// Simple usage
cn('text-lg', 'font-bold')
// => 'text-lg font-bold'

// Conditional classes
cn('text-lg', isActive && 'text-blue-500')
// => 'text-lg text-blue-500' (if isActive is true)
// => 'text-lg' (if isActive is false)

// Object syntax
cn('text-lg', {
  'text-blue-500': isActive,
  'text-gray-500': !isActive
})

// With component props
function Button({ className, variant, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-900',
        className
      )}
      {...props}
    />
  )
}
```

**Why `cn()` over plain string concatenation:**
- Handles conditional logic cleanly
- Merges conflicting Tailwind classes (e.g., `"p-4 p-6"` becomes `"p-6"`)
- Removes falsy values automatically
- Type-safe with TypeScript

**Examples:**

```typescript
// Merging conflicting classes
cn('px-2 py-1', 'px-4')
// => 'py-1 px-4' (px-2 is overridden by px-4)

// Array of classes
cn(['flex', 'items-center'], 'gap-2')
// => 'flex items-center gap-2'

// Complex conditional logic
cn(
  'base-class',
  {
    'active-class': isActive,
    'disabled-class': isDisabled,
  },
  size === 'sm' && 'text-sm',
  size === 'lg' && 'text-lg'
)
```

## 🪝 Hooks

### `useIsMobile()`

Custom hook to detect if the current viewport is mobile-sized (less than 768px).

**Location:** `src/hooks/use-mobile.ts`

**Signature:**
```typescript
function useIsMobile(): boolean
```

**Returns:**
- `boolean`: `true` if viewport width is less than 768px, `false` otherwise

**Usage:**
```typescript
import { useIsMobile } from '@/hooks/use-mobile'

function MyComponent() {
  const isMobile = useIsMobile()

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}
```

**Features:**
- Automatically updates on window resize
- Uses `window.matchMedia` for efficient tracking
- Returns `undefined` initially, then `boolean` after mount
- Cleans up event listeners on unmount

**Examples:**

```typescript
// Conditional rendering
function Navigation() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileMenu />
  }

  return <DesktopMenu />
}

// Conditional styling
function Card() {
  const isMobile = useIsMobile()

  return (
    <div className={cn(
      'card',
      isMobile ? 'p-4' : 'p-6'
    )}>
      Content
    </div>
  )
}

// Conditional logic
function Dashboard() {
  const isMobile = useIsMobile()

  const columns = isMobile ? 1 : 3

  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {/* content */}
    </div>
  )
}
```

**Breakpoint:**
- Default: 768px
- Modify by changing `MOBILE_BREAKPOINT` constant in the source file

### Creating Custom Hooks

**Pattern for custom hooks:**

```typescript
// hooks/use-window-size.ts
import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

## 🛡️ Error Handling

### `ErrorFallback`

Error boundary fallback component that displays when a runtime error occurs.

**Location:** `src/ErrorFallback.tsx`

**Props:**
```typescript
interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}
```

**Parameters:**
- `error`: The error object that was thrown
- `resetErrorBoundary`: Function to reset the error boundary and retry

**Behavior:**
- In development mode: Re-throws the error for better debugging
- In production mode: Shows user-friendly error UI with:
  - Error alert message
  - Error details (error message)
  - "Try Again" button to reset

**Usage:**

The component is already configured in `src/main.tsx`:

```typescript
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from './ErrorFallback'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
)
```

**Customizing Error Handling:**

```typescript
// Custom error boundary with logging
import { ErrorBoundary } from "react-error-boundary"

function logError(error: Error, info: { componentStack: string }) {
  console.error('Error occurred:', error)
  console.error('Component stack:', info.componentStack)
  // Send to error tracking service
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={logError}
  onReset={() => {
    // Reset app state
  }}
>
  <App />
</ErrorBoundary>
```

## 📘 Type Definitions

### Common Type Patterns

**Component Props:**

```typescript
// Basic component props
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

// Extending HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

// Polymorphic component
interface ButtonProps<T extends React.ElementType> {
  as?: T
  children: React.ReactNode
}
```

**Form Types:**

```typescript
// Form data
interface LoginFormData {
  email: string
  password: string
}

// With validation
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginFormData = z.infer<typeof loginSchema>
```

**API Response Types:**

```typescript
// API response
interface ApiResponse<T> {
  data: T
  error: string | null
  status: number
}

// Usage
type UserResponse = ApiResponse<User>
type UsersResponse = ApiResponse<User[]>
```

### Vite Environment Types

**Location:** `src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_KEY: string
  // Add more env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## ⚙️ Configuration Options

### Vite Configuration API

**Location:** `vite.config.ts`

**Key Options:**

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  // Server options
  server: {
    port: 5173,           // Dev server port
    open: true,           // Auto-open browser
    cors: true,           // Enable CORS
    host: true,           // Listen on all addresses
  },

  // Build options
  build: {
    outDir: 'dist',       // Output directory
    sourcemap: true,      // Generate source maps
    minify: 'esbuild',    // Minification method
    target: 'es2015',     // Target browser support
  },

  // Preview options
  preview: {
    port: 4173,           // Preview server port
    open: true,           // Auto-open browser
  },

  // Path aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@lib': resolve(__dirname, 'src/lib'),
    },
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
})
```

### TypeScript Configuration API

**Location:** `tsconfig.json`

**Key Options:**

```json
{
  "compilerOptions": {
    // Language and environment
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",

    // Module resolution
    "module": "ESNext",
    "moduleResolution": "bundler",

    // Type checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    // Path mapping
    "paths": {
      "@/*": ["./src/*"]
    },

    // Emit
    "noEmit": true,
    "isolatedModules": true
  }
}
```

### Tailwind Configuration API

**Location:** `tailwind.config.js`

**Key Options:**

```javascript
export default {
  // Content sources
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Dark mode
  darkMode: 'class', // or 'media'

  // Theme customization
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
      spacing: {
        // Custom spacing
      },
      // ... other customizations
    },
  },

  // Plugins
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
}
```

## 🌍 Environment Variables

### Available Variables

All environment variables must be prefixed with `VITE_` to be exposed to the client.

**Common Variables:**

```env
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key_here

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false

# App Configuration
VITE_APP_NAME=My App
VITE_APP_VERSION=1.0.0

# Third-party Services
VITE_SENTRY_DSN=https://...
VITE_GA_TRACKING_ID=UA-...
```

### Accessing Environment Variables

```typescript
// Access variable
const apiUrl = import.meta.env.VITE_API_URL

// With default value
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Type-safe access (after defining in vite-env.d.ts)
const apiUrl: string = import.meta.env.VITE_API_URL
```

### Mode-Specific Variables

Create mode-specific files:

```
.env                # All environments
.env.local          # Local overrides (not committed)
.env.development    # Development only
.env.production     # Production only
```

## 📦 Component API Patterns

### Button Component Example

```typescript
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  asChild?: boolean
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        variant === 'default' && 'bg-blue-500 text-white',
        variant === 'outline' && 'border border-gray-300',
        size === 'sm' && 'text-sm px-2 py-1',
        size === 'default' && 'text-base px-4 py-2',
        className
      )}
      {...props}
    />
  )
}
```

## 🔧 Utility Type Helpers

```typescript
// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P]
}

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// Example usage
interface User {
  id: string
  name: string
  email: string
  password: string
}

type UserProfile = Omit<User, 'password'>
// Result: { id: string; name: string; email: string }
```

## 📚 Related Documentation

- [Getting Started](GETTING_STARTED.md) - Setup guide
- [Components](COMPONENTS.md) - UI components
- [Development](DEVELOPMENT.md) - Development workflow
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues

---

[← Back to Documentation](README.md)
