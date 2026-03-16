# Getting Started with Spark Template

This guide will help you set up and start developing with the Spark Template.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or later recommended)
- **npm** (version 9.x or later) or **yarn** (version 1.22.x or later)
- **Git** for version control
- A code editor (VS Code recommended)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SMSDAO/spark-template.git
cd spark-template
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

This will install all required dependencies including:
- React and React DOM
- GitHub Spark framework
- Tailwind CSS
- Radix UI components
- TypeScript
- Vite and build tools

### 3. Verify Installation

Check that everything is installed correctly:

```bash
npm list --depth=0
```

## 🏃‍♂️ Running the Development Server

Start the development server:

```bash
npm run dev
```

This will:
- Start the Vite development server
- Enable hot module replacement (HMR)
- Open your application at `http://localhost:5173` (default)

You should see a blank page, which is expected as the template provides a minimal starting point.

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

This command:
1. Runs TypeScript compilation
2. Bundles your application with Vite
3. Optimizes assets for production
4. Outputs to the `dist` directory

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 🛠️ Available Scripts

The template includes several npm scripts:

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server |
| `build` | `tsc -b --noCheck && vite build` | Build for production |
| `lint` | `eslint .` | Run ESLint to check code quality |
| `preview` | `vite preview` | Preview production build |
| `optimize` | `vite optimize` | Optimize dependencies |
| `kill` | `fuser -k 5000/tcp` | Kill process on port 5000 |

## 📁 Project Structure Overview

```
spark-template/
├── src/
│   ├── components/      # Reusable UI components
│   │   └── ui/         # Pre-built UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── styles/         # CSS styles
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── docs/               # Documentation
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🎯 First Steps

### 1. Explore the Template

The template starts with a minimal setup. The main files to look at:

- `src/App.tsx` - Your main application component (currently empty)
- `src/main.tsx` - Application entry point with error boundary
- `src/components/ui/` - Pre-built UI components from Radix UI

### 2. Create Your First Component

Edit `src/App.tsx`:

```tsx
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Spark Template
        </h1>
        <p className="text-lg text-gray-600">
          Start building your application here!
        </p>
      </div>
    </div>
  )
}

export default App
```

### 3. Use Pre-built Components

The template includes many pre-built components. Example using a button:

```tsx
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="p-8">
      <Button onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </div>
  )
}

export default App
```

### 4. Add Routing (Optional)

If you need routing, install React Router:

```bash
npm install react-router-dom
```

### 5. Add State Management (Optional)

Consider adding state management based on your needs:
- **React Query** (already included) - For server state
- **Zustand** or **Redux Toolkit** - For client state

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=My Spark App
```

Access in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

### Customizing Tailwind

Edit `tailwind.config.js` to customize your theme:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: '#0066cc',
      },
    },
  },
}
```

## 🐛 Common Issues

### Port Already in Use

If port 5173 is busy:

```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Restart your TypeScript server in VS Code:
- Press `Cmd/Ctrl + Shift + P`
- Type "TypeScript: Restart TS Server"

## 📚 Next Steps

- Read the [Architecture Guide](ARCHITECTURE.md) to understand the project structure
- Explore [Components Documentation](COMPONENTS.md) to learn about available UI components
- Check out [Development Workflow](DEVELOPMENT.md) for best practices
- Review [Configuration Guide](CONFIGURATION.md) for advanced setup options

## 🆘 Need Help?

- Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
- Review the [FAQ section](TROUBLESHOOTING.md#faq)
- Open an issue on GitHub

---

[← Back to Documentation](README.md) | [Next: Architecture Guide →](ARCHITECTURE.md)
