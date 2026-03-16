# UI Component Showcase

This page provides visual examples of the UI components available in the Spark Template.

## Overview

The Spark Template includes **45+ pre-built UI components** that are accessible, customizable, and production-ready. All components are built on top of Radix UI primitives and styled with Tailwind CSS.

## Live Showcase

### Main Interface

The showcase demonstrates the template's capabilities with a clean, modern interface featuring:

- **Header**: Navigation with branding and version badges
- **Alert Banner**: Welcome message highlighting key features
- **Feature Cards**: Three cards showcasing the main technologies (Components, TypeScript, Tailwind CSS)
- **Interactive Tabs**: Demonstrating different component categories
- **Accordion**: Documentation quick links
- **Call-to-Action Card**: Ready to build section with action buttons

![Spark Template Showcase - Main View](https://github.com/user-attachments/assets/7520fad1-fb33-40ef-9ec2-01620dd93897)

*Main showcase view displaying buttons, feature cards, tabs, and documentation links*

---

## Component Categories

### 1. Button Components

The template includes multiple button variants and sizes:

**Variants:**
- Default (primary blue)
- Secondary (gray)
- Destructive (red)
- Outline (bordered)
- Ghost (transparent)
- Link (text-only)

**Sizes:**
- Small
- Default
- Large

![Button Components](https://github.com/user-attachments/assets/7520fad1-fb33-40ef-9ec2-01620dd93897)

---

### 2. Form Components

Comprehensive form elements for user input:

**Available Components:**
- **Input Fields**: Text, email, password inputs with labels
- **Checkboxes**: For binary selections
- **Switches**: Toggle controls for settings
- **Labels**: Accessible form labels
- **Submit Buttons**: Full-width action buttons

![Form Components](https://github.com/user-attachments/assets/f2092d35-8fdb-4209-b77d-44ec13067054)

*Form example showing email input, password field, checkbox, switch, and submit button*

---

### 3. Feedback Components

Components for user feedback and status:

**Available Components:**
- **Alert (Success)**: Green alert with checkmark icon for positive feedback
- **Alert (Destructive)**: Red alert with warning icon for errors
- **Progress Bar**: Loading indicators with percentage display
- **Labels**: Descriptive text for progress states

![Feedback Components](https://github.com/user-attachments/assets/93fe457a-3669-420d-b642-65ca8ae2f64b)

*Feedback components including success alert, error alert, and progress bar*

---

## Additional Components

Beyond what's shown in the showcase, the template includes:

### Display Components
- **Card**: Container with header, content, and footer sections
- **Badge**: Small status indicators (shown in header with version)
- **Avatar**: User profile images
- **Skeleton**: Loading placeholders
- **Separator**: Horizontal dividers (visible between sections)
- **Aspect Ratio**: Responsive media containers
- **Table**: Data tables
- **Chart**: Data visualization components

### Overlay Components
- **Dialog**: Modal dialogs
- **Sheet**: Slide-in panels
- **Drawer**: Bottom drawer
- **Alert Dialog**: Confirmation dialogs
- **Popover**: Contextual overlays
- **Hover Card**: Tooltip-like cards
- **Tooltip**: Hover tooltips

### Navigation Components
- **Tabs**: Tabbed interfaces (shown in Component Examples)
- **Accordion**: Collapsible sections (shown in Documentation Quick Links)
- **Breadcrumb**: Navigation trail
- **Pagination**: Page navigation
- **Navigation Menu**: Dropdown menus
- **Menubar**: Menu bar
- **Command**: Command palette
- **Sidebar**: Side navigation panels

### Menu Components
- **Dropdown Menu**: Context menus with actions
- **Context Menu**: Right-click menus

### Layout Components
- **Scroll Area**: Custom scrollbars
- **Resizable**: Resizable panels
- **Collapsible**: Expandable sections
- **Carousel**: Image/content sliders

### Date Components
- **Calendar**: Date picker calendar

## Key Features

### 🎨 **Fully Customizable**
- All components accept `className` prop for custom styling
- Tailwind CSS utilities for rapid customization
- CSS variables for theming

### ♿ **Accessible by Default**
- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA attributes

### 🔧 **TypeScript Support**
- Fully typed props
- IntelliSense support
- Type-safe development

### 📱 **Responsive Design**
- Mobile-first approach
- Responsive breakpoints
- Touch-friendly interactions

## Usage Example

Here's how the showcase page was built:

```tsx
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'

function Showcase() {
  return (
    <div>
      <Alert>
        <AlertTitle>Welcome</AlertTitle>
        <AlertDescription>
          This showcase demonstrates 45+ pre-built components
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="buttons">
        <TabsList>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buttons">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

## Getting Started

To start using these components in your application:

1. **Import the component**
   ```tsx
   import { Button } from '@/components/ui/button'
   ```

2. **Use in your JSX**
   ```tsx
   <Button variant="default" size="lg">
     Click me
   </Button>
   ```

3. **Customize with Tailwind**
   ```tsx
   <Button className="bg-purple-600 hover:bg-purple-700">
     Custom Button
   </Button>
   ```

## Next Steps

- 📖 **[Component Documentation](COMPONENTS.md)** - Detailed API reference for all components
- 🚀 **[Getting Started Guide](GETTING_STARTED.md)** - Setup and installation
- 💻 **[Development Guide](DEVELOPMENT.md)** - Best practices and patterns
- 🎨 **[Configuration Guide](CONFIGURATION.md)** - Customize theme and styling

## Live Demo

To see the showcase in action:

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to explore the interactive component showcase.

---

**Note**: The showcase page (`src/App.tsx`) serves as a visual reference. Feel free to modify or replace it with your own application code.
