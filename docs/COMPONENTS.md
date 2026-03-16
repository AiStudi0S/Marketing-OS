# Components Documentation

This guide covers all the pre-built UI components available in the Spark Template, based on Radix UI primitives and styled with Tailwind CSS.

> 💡 **Visual Learner?** Check out the **[UI Component Showcase](UI_SHOWCASE.md)** for screenshots and visual examples of all components in action!

## 📦 Component Overview

The template includes **45+ pre-built components** located in `src/components/ui/`. All components are:

- ✅ **Accessible** - WCAG 2.1 compliant
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Customizable** - Easily styled with Tailwind
- ✅ **Composable** - Designed for composition
- ✅ **Production-ready** - Battle-tested components

## 🎯 Component Categories

### Form Components
- [Input](#input)
- [Textarea](#textarea)
- [Select](#select)
- [Checkbox](#checkbox)
- [Radio Group](#radio-group)
- [Switch](#switch)
- [Slider](#slider)
- [Form](#form)
- [Label](#label)
- [Input OTP](#input-otp)

### Button Components
- [Button](#button)
- [Toggle](#toggle)
- [Toggle Group](#toggle-group)

### Display Components
- [Card](#card)
- [Badge](#badge)
- [Avatar](#avatar)
- [Skeleton](#skeleton)
- [Separator](#separator)
- [Aspect Ratio](#aspect-ratio)
- [Table](#table)
- [Chart](#chart)

### Overlay Components
- [Dialog](#dialog)
- [Sheet](#sheet)
- [Drawer](#drawer)
- [Alert Dialog](#alert-dialog)
- [Popover](#popover)
- [Hover Card](#hover-card)
- [Tooltip](#tooltip)

### Navigation Components
- [Tabs](#tabs)
- [Accordion](#accordion)
- [Breadcrumb](#breadcrumb)
- [Pagination](#pagination)
- [Navigation Menu](#navigation-menu)
- [Menubar](#menubar)
- [Command](#command)
- [Sidebar](#sidebar)

### Feedback Components
- [Alert](#alert)
- [Progress](#progress)
- [Sonner (Toast)](#sonner)

### Menu Components
- [Dropdown Menu](#dropdown-menu)
- [Context Menu](#context-menu)

### Layout Components
- [Scroll Area](#scroll-area)
- [Resizable](#resizable)
- [Collapsible](#collapsible)
- [Carousel](#carousel)

### Date Components
- [Calendar](#calendar)

## 🚀 Quick Start

### Importing Components

```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
```

### Basic Usage

```tsx
function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

## 📚 Component Reference

### Button

Versatile button component with multiple variants.

**Import:**
```typescript
import { Button } from '@/components/ui/button'
```

**Usage:**
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔥</Button>
```

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `asChild`: boolean - Use with Radix Slot for custom rendering

---

### Input

Text input component for forms.

**Import:**
```typescript
import { Input } from '@/components/ui/input'
```

**Usage:**
```tsx
<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled input" />
```

**Props:**
- All standard HTML input attributes
- Fully accessible with ARIA labels

---

### Card

Container component for grouping content.

**Import:**
```typescript
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
```

**Usage:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Dialog

Modal dialog overlay component.

**Import:**
```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
```

**Usage:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Select

Dropdown selection component.

**Import:**
```typescript
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
```

**Usage:**
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

---

### Tabs

Tabbed interface component.

**Import:**
```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
```

**Usage:**
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
  <TabsContent value="tab3">Content 3</TabsContent>
</Tabs>
```

---

### Accordion

Collapsible content sections.

**Import:**
```typescript
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
```

**Usage:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### Form

Form component with validation support (uses React Hook Form).

**Import:**
```typescript
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
```

**Usage:**
```tsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  username: z.string().min(2),
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>Your public username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

---

### Alert

Alert message component.

**Import:**
```typescript
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
```

**Usage:**
```tsx
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

---

### Badge

Small status indicator or label.

**Import:**
```typescript
import { Badge } from '@/components/ui/badge'
```

**Usage:**
```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

---

### Tooltip

Hoverable tooltip component.

**Import:**
```typescript
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
```

**Usage:**
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Sonner (Toast)

Toast notification component.

**Import:**
```typescript
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
```

**Usage:**
```tsx
// Add to your app root
function App() {
  return (
    <>
      <YourApp />
      <Toaster />
    </>
  )
}

// Use anywhere
toast('Event has been created')
toast.success('Success message')
toast.error('Error message')
toast.warning('Warning message')
toast.info('Info message')
```

---

## 🎨 Customization

### Using Tailwind Classes

All components accept `className` prop for custom styling:

```tsx
<Button className="bg-purple-600 hover:bg-purple-700">
  Custom Button
</Button>
```

### Using CVA Variants

Components use Class Variance Authority (CVA) for variants:

```typescript
// In component definition
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        custom: "your-custom-classes",
      },
    },
  }
)
```

### Theme Customization

Edit `tailwind.config.js` to customize the theme:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
    },
  },
}
```

## 🔧 Creating Custom Components

### Pattern 1: Composition

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function ActionCard({ title, action }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <Button onClick={action}>Take Action</Button>
      </CardContent>
    </Card>
  )
}
```

### Pattern 2: Wrapper Component

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LabeledInput({ label, ...props }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  )
}
```

### Pattern 3: Extending with Radix

```tsx
import * as RadixDialog from '@radix-ui/react-dialog'

export function CustomModal({ children }) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger>{/* trigger */}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay />
        <RadixDialog.Content>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
```

## 📦 Component API Reference

For detailed API documentation of Radix UI primitives used in these components, refer to:

- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🔍 Finding Components

### By Use Case

| Use Case | Components |
|----------|------------|
| Data entry | Input, Textarea, Select, Checkbox, Radio, Switch |
| Actions | Button, Toggle, Toggle Group |
| Display data | Card, Table, Badge, Avatar, Chart |
| Navigation | Tabs, Accordion, Breadcrumb, Pagination, Sidebar |
| Overlays | Dialog, Sheet, Drawer, Popover, Tooltip |
| Feedback | Alert, Progress, Sonner |
| Layout | Scroll Area, Resizable, Separator |

### Component File Structure

```
src/components/ui/
├── button.tsx              # Button component
├── input.tsx               # Input component
├── card.tsx                # Card with sub-components
└── ...                     # Other components
```

## 🧪 Testing Components

Example test with React Testing Library:

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

## ⚡ Performance Tips

1. **Lazy Load Heavy Components**
   ```tsx
   const Chart = lazy(() => import('@/components/ui/chart'))
   ```

2. **Memoize Expensive Renders**
   ```tsx
   const MemoizedCard = memo(Card)
   ```

3. **Use Virtualization for Lists**
   - Consider adding `react-window` for large lists

## 📚 Related Documentation

- [Architecture](ARCHITECTURE.md) - Overall architecture
- [Development](DEVELOPMENT.md) - Development workflow
- [Getting Started](GETTING_STARTED.md) - Setup guide

## 🆘 Need Help?

- Check component source code in `src/components/ui/`
- Review [Radix UI docs](https://www.radix-ui.com)
- See [Troubleshooting Guide](TROUBLESHOOTING.md)

---

[← Back to Documentation](README.md) | [Next: Configuration →](CONFIGURATION.md)
