# Development Workflow

This guide covers development best practices, workflows, and coding standards for the Spark Template project.

## 🛠️ Development Environment Setup

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/SMSDAO/spark-template.git
   cd spark-template
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173`

### IDE Configuration

#### VS Code Recommended Extensions

Install these extensions for the best experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "Vue.volar",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 📝 Coding Standards

### TypeScript Guidelines

#### Type Annotations

Always use explicit types for function parameters and return values:

```typescript
// ✅ Good
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

// ❌ Avoid
function calculateTotal(price, quantity) {
  return price * quantity
}
```

#### Interface vs Type

Use `interface` for object shapes, `type` for unions/intersections:

```typescript
// ✅ Good
interface User {
  id: string
  name: string
  email: string
}

type Status = 'active' | 'inactive' | 'pending'

// ✅ Also good for complex types
type ApiResponse<T> = {
  data: T
  error: string | null
}
```

#### Avoid `any`

Use `unknown` or proper types instead of `any`:

```typescript
// ✅ Good
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}

// ❌ Avoid
function processData(data: any) {
  return data.toUpperCase()
}
```

### React Best Practices

#### Component Structure

```typescript
// 1. Imports
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface MyComponentProps {
  title: string
  onAction: () => void
}

// 3. Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  // 4. Hooks
  const [count, setCount] = useState(0)

  // 5. Effects
  useEffect(() => {
    // effect logic
  }, [])

  // 6. Event handlers
  const handleClick = () => {
    setCount(prev => prev + 1)
    onAction()
  }

  // 7. Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Count: {count}</Button>
    </div>
  )
}
```

#### Props Destructuring

Destructure props in the function signature:

```typescript
// ✅ Good
function UserCard({ name, email, avatar }: UserCardProps) {
  return <div>...</div>
}

// ❌ Avoid
function UserCard(props: UserCardProps) {
  return <div>{props.name}</div>
}
```

#### Event Handlers

Prefix event handler functions with `handle`:

```typescript
function MyComponent() {
  const handleClick = () => {
    // handle click
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // handle submit
  }

  return <Button onClick={handleClick}>Click</Button>
}
```

#### Custom Hooks

Prefix custom hooks with `use`:

```typescript
// hooks/use-window-size.ts
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `use-auth.ts` |
| Utils | camelCase | `format-date.ts` |
| Types | PascalCase | `User.ts` or `types.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |

### Folder Structure

```
src/
├── components/
│   ├── ui/              # Base UI components
│   ├── features/        # Feature-specific components
│   └── layouts/         # Layout components
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── services/            # API services
├── types/               # Type definitions
├── constants/           # Constants
└── styles/              # Global styles
```

## 🎨 Styling Guidelines

### Tailwind CSS Usage

#### Class Organization

Order classes logically:

```tsx
// Layout → Sizing → Spacing → Typography → Visual → Interactive
<div className="flex items-center justify-between w-full h-12 px-4 py-2 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg">
  Content
</div>
```

#### Using `cn()` Utility

Combine classes conditionally:

```tsx
import { cn } from '@/lib/utils'

function Button({ variant, className, ...props }) {
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

#### Extract Repeated Patterns

Create custom components for repeated patterns:

```tsx
// ❌ Avoid repetition
<div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
  Content 1
</div>
<div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
  Content 2
</div>

// ✅ Create a component
function Card({ children }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
      {children}
    </div>
  )
}
```

### CSS Custom Properties

Use CSS variables for theming in `src/styles/theme.css`:

```css
:root {
  --color-primary: 220 90% 56%;
  --color-secondary: 240 5% 64%;
  --radius: 0.5rem;
}

.dark {
  --color-primary: 220 90% 66%;
  --color-secondary: 240 5% 84%;
}
```

## 🔄 State Management

### Local State

Use `useState` for component-specific state:

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
```

### Form State

Use React Hook Form for complex forms:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  )
}
```

### Server State

Use React Query for API data:

```tsx
import { useQuery, useMutation } from '@tanstack/react-query'

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Global State (Optional)

If needed, add Zustand:

```bash
npm install zustand
```

```typescript
// stores/use-auth-store.ts
import { create } from 'zustand'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
```

## 🧪 Testing Strategy

### Setup Testing (Optional)

Install Vitest:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Configure `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

### Component Testing

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Hook Testing

```tsx
import { renderHook, act } from '@testing-library/react'
import { useCounter } from '@/hooks/use-counter'

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

## 🔍 Code Quality Tools

### ESLint

Run linter:

```bash
npm run lint
```

Fix automatically:

```bash
npm run lint -- --fix
```

### TypeScript Type Checking

```bash
npx tsc --noEmit
```

### Prettier (Optional)

Install Prettier:

```bash
npm install -D prettier
```

`.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

Format code:

```bash
npx prettier --write .
```

## 📦 Dependency Management

### Adding Dependencies

```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update specific package
npm update package-name

# Update all packages (use cautiously)
npm update
```

### Security Audits

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## 🔄 Git Workflow

### Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/user-authentication` |
| Bug Fix | `fix/description` | `fix/login-error` |
| Docs | `docs/description` | `docs/update-readme` |
| Refactor | `refactor/description` | `refactor/api-service` |

### Commit Messages

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Examples:

```
feat(auth): add login functionality

Implement user login with email and password validation.
Includes error handling and loading states.

Closes #123
```

```
fix(button): correct hover state styling

The button hover state was not applying correctly in dark mode.
Updated the Tailwind classes to use proper dark mode variants.
```

### Pull Request Process

1. **Create Branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push Branch**
   ```bash
   git push origin feature/my-feature
   ```

4. **Create PR on GitHub**
   - Provide clear description
   - Reference related issues
   - Request reviews

5. **Address Review Comments**
   - Make requested changes
   - Push updates

6. **Merge**
   - After approval
   - Delete branch

## 🚀 Performance Optimization

### Code Splitting

```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react'

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// Memoize components
const MemoizedComponent = memo(Component)
```

### Image Optimization

```tsx
// Use lazy loading
<img src="image.jpg" loading="lazy" alt="Description" />

// Use appropriate formats
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

## 📚 Related Documentation

- [Getting Started](GETTING_STARTED.md) - Setup guide
- [Architecture](ARCHITECTURE.md) - Project structure
- [Components](COMPONENTS.md) - UI components
- [Configuration](CONFIGURATION.md) - Config files

---

[← Back to Documentation](README.md) | [Next: Deployment Guide →](DEPLOYMENT.md)
