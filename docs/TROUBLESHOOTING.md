# Troubleshooting Guide

This guide helps you resolve common issues when working with the Spark Template.

## 🔍 Quick Diagnostics

### Check System Status

```bash
# Check Node.js version
node --version  # Should be 18.x or later

# Check npm version
npm --version   # Should be 9.x or later

# Check if project builds
npm run build

# Check for errors
npm run lint
```

## 🚨 Installation Issues

### Problem: `npm install` Fails

**Symptoms:**
- Installation errors
- Permission denied errors
- Network timeouts

**Solutions:**

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Fix permissions (macOS/Linux)**
   ```bash
   sudo chown -R $(whoami) ~/.npm
   sudo chown -R $(whoami) /usr/local/lib/node_modules
   ```

3. **Use different registry**
   ```bash
   npm config set registry https://registry.npmjs.org/
   npm install
   ```

4. **Try with legacy peer deps**
   ```bash
   npm install --legacy-peer-deps
   ```

### Problem: Node Version Mismatch

**Symptoms:**
- "Unsupported engine" errors
- Build failures

**Solution:**

1. **Check required version**
   ```bash
   cat package.json | grep "node"
   ```

2. **Install correct Node version**
   
   Using nvm:
   ```bash
   nvm install 18
   nvm use 18
   ```

3. **Verify installation**
   ```bash
   node --version
   ```

### Problem: Dependency Conflicts

**Symptoms:**
- "Unable to resolve dependency tree" errors
- Conflicting peer dependencies

**Solutions:**

1. **Force install (use cautiously)**
   ```bash
   npm install --force
   ```

2. **Use legacy peer deps**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Manual resolution**
   - Check conflicting packages
   - Update to compatible versions
   - Review package.json

## 🏃 Development Server Issues

### Problem: Port Already in Use

**Symptoms:**
- "Port 5173 is already in use"
- Server won't start

**Solutions:**

1. **Kill process on port**
   
   macOS/Linux:
   ```bash
   lsof -ti:5173 | xargs kill -9
   ```
   
   Or use the built-in script:
   ```bash
   npm run kill  # Kills port 5000
   ```

2. **Use different port**
   ```bash
   npm run dev -- --port 3000
   ```

3. **Find and kill process manually**
   ```bash
   # Find process
   lsof -i :5173
   
   # Kill process
   kill -9 <PID>
   ```

### Problem: Hot Module Replacement (HMR) Not Working

**Symptoms:**
- Changes don't reflect automatically
- Page needs manual refresh

**Solutions:**

1. **Restart dev server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Clear Vite cache**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Check file watchers (Linux)**
   ```bash
   # Increase limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

4. **Disable browser cache**
   - Open DevTools
   - Go to Network tab
   - Check "Disable cache"

### Problem: Blank Page in Development

**Symptoms:**
- White screen
- No errors in terminal
- Console errors in browser

**Solutions:**

1. **Check browser console**
   - Open DevTools (F12)
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Verify entry point**
   - Check `index.html` exists
   - Verify `src/main.tsx` is correct
   - Ensure root div exists

3. **Clear browser cache**
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear site data in DevTools

4. **Check for syntax errors**
   ```bash
   npm run lint
   ```

## 🏗️ Build Issues

### Problem: Build Fails

**Symptoms:**
- `npm run build` fails
- TypeScript compilation errors
- Vite build errors

**Solutions:**

1. **Check TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

2. **Fix type errors**
   - Review error messages
   - Add missing type definitions
   - Fix incorrect types

3. **Clear build cache**
   ```bash
   rm -rf dist node_modules/.vite
   npm run build
   ```

4. **Check for circular dependencies**
   - Review import statements
   - Refactor circular imports

### Problem: Build Succeeds but App Doesn't Work

**Symptoms:**
- Build completes successfully
- Preview shows errors
- Production deployment broken

**Solutions:**

1. **Test production build locally**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check environment variables**
   - Verify all VITE_ prefixed variables
   - Check production values
   - Ensure secrets are set

3. **Review console for errors**
   - Check browser DevTools
   - Look for 404s on assets
   - Verify API endpoints

4. **Check base path configuration**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/correct-path/',
   })
   ```

### Problem: Large Bundle Size

**Symptoms:**
- Build warnings about chunk size
- Slow page load times
- Poor performance

**Solutions:**

1. **Analyze bundle**
   ```bash
   npm install -D rollup-plugin-visualizer
   ```
   
   Add to `vite.config.ts`:
   ```typescript
   import { visualizer } from 'rollup-plugin-visualizer'
   
   export default defineConfig({
     plugins: [
       visualizer({ open: true })
     ]
   })
   ```

2. **Implement code splitting**
   ```typescript
   import { lazy } from 'react'
   
   const HeavyComponent = lazy(() => import('./HeavyComponent'))
   ```

3. **Optimize dependencies**
   - Remove unused packages
   - Use lighter alternatives
   - Import only what you need

## 🎨 Styling Issues

### Problem: Tailwind Classes Not Working

**Symptoms:**
- Classes have no effect
- Styles not applied
- Missing CSS

**Solutions:**

1. **Verify Tailwind is imported**
   
   Check `src/index.css`:
   ```css
   @import "tailwindcss";
   ```

2. **Check content paths**
   
   In `tailwind.config.js`:
   ```javascript
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
   ```

3. **Restart dev server**
   ```bash
   # Stop and restart
   npm run dev
   ```

4. **Check for typos**
   - Verify class names
   - Check Tailwind version syntax

### Problem: Custom CSS Not Loading

**Symptoms:**
- Custom styles not applied
- CSS file not found

**Solutions:**

1. **Verify import order**
   
   In `src/main.tsx`:
   ```typescript
   import "./main.css"
   import "./index.css"
   import "./styles/theme.css"
   ```

2. **Check file paths**
   - Verify file exists
   - Check import path is correct
   - Use absolute paths with @

3. **Clear cache**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### Problem: Dark Mode Not Working

**Symptoms:**
- Dark mode classes don't apply
- Theme doesn't switch

**Solutions:**

1. **Enable dark mode in Tailwind**
   
   In `tailwind.config.js`:
   ```javascript
   export default {
     darkMode: 'class', // or 'media'
     // ...
   }
   ```

2. **Add dark mode toggle**
   ```typescript
   // Toggle dark class on html element
   document.documentElement.classList.toggle('dark')
   ```

3. **Use next-themes package**
   ```bash
   npm install next-themes
   ```

## 🔧 TypeScript Issues

### Problem: Type Errors

**Symptoms:**
- Red squiggly lines in editor
- Build fails with type errors
- "Type X is not assignable to type Y"

**Solutions:**

1. **Check type definitions**
   ```bash
   npm install -D @types/node
   ```

2. **Add missing types**
   ```typescript
   // For library without types
   declare module 'some-library'
   ```

3. **Use type assertions (carefully)**
   ```typescript
   const value = data as MyType
   ```

4. **Fix incorrect types**
   - Review error message
   - Correct type annotation
   - Add proper interface

### Problem: Import Errors

**Symptoms:**
- "Cannot find module '@/...'"
- Import paths not resolving

**Solutions:**

1. **Verify path mapping**
   
   In `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```
   
   In `vite.config.ts`:
   ```typescript
   resolve: {
     alias: {
       '@': resolve(__dirname, 'src')
     }
   }
   ```

2. **Restart TypeScript server (VS Code)**
   - Cmd/Ctrl + Shift + P
   - "TypeScript: Restart TS Server"

3. **Check file exists**
   - Verify file path
   - Check file extension
   - Ensure export exists

## 🐛 Runtime Errors

### Problem: "Module not found" in Browser

**Symptoms:**
- 404 errors in console
- Failed to load module

**Solutions:**

1. **Check import path**
   ```typescript
   // Use @ alias
   import { Button } from '@/components/ui/button'
   ```

2. **Verify file exists**
   - Check file location
   - Verify filename case sensitivity

3. **Restart dev server**
   ```bash
   npm run dev
   ```

### Problem: "React is not defined"

**Symptoms:**
- Runtime error about React
- Components won't render

**Solutions:**

1. **Check React import**
   ```typescript
   // For React 17+, not needed
   // For components with JSX, automatic
   ```

2. **Verify Vite config**
   ```typescript
   // Should have react plugin
   plugins: [react()]
   ```

3. **Clear cache and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Problem: "Cannot read property of undefined"

**Symptoms:**
- Runtime error
- Component crashes

**Solutions:**

1. **Add null checks**
   ```typescript
   // ❌ Unsafe
   const name = user.name
   
   // ✅ Safe
   const name = user?.name
   ```

2. **Provide default values**
   ```typescript
   const { data = [] } = useQuery(...)
   ```

3. **Add loading states**
   ```typescript
   if (isLoading) return <div>Loading...</div>
   if (!data) return null
   ```

## 🔌 Component Issues

### Problem: Component Not Rendering

**Symptoms:**
- Component doesn't appear
- No errors shown

**Solutions:**

1. **Check import/export**
   ```typescript
   // Export
   export function MyComponent() { }
   
   // Import
   import { MyComponent } from './MyComponent'
   ```

2. **Verify component is used**
   ```tsx
   <MyComponent />  // ✅
   MyComponent      // ❌
   ```

3. **Check conditional rendering**
   ```typescript
   // Make sure condition is met
   {isVisible && <MyComponent />}
   ```

### Problem: Props Not Working

**Symptoms:**
- Props not received
- Default props used

**Solutions:**

1. **Check prop names**
   ```tsx
   // Pass
   <Button label="Click" />
   
   // Receive (exact match)
   function Button({ label }: { label: string }) {}
   ```

2. **Verify props are passed**
   - Check parent component
   - Console.log props
   - Check for typos

## 💾 State Management Issues

### Problem: State Not Updating

**Symptoms:**
- State changes don't reflect in UI
- Component doesn't re-render

**Solutions:**

1. **Don't mutate state directly**
   ```typescript
   // ❌ Wrong
   state.items.push(item)
   setState(state)
   
   // ✅ Correct
   setState({ ...state, items: [...state.items, item] })
   ```

2. **Use functional updates**
   ```typescript
   setCount(prev => prev + 1)
   ```

3. **Check dependencies array**
   ```typescript
   useEffect(() => {
     // effect
   }, [dependency]) // Must include all dependencies
   ```

## 🌐 API/Network Issues

### Problem: API Calls Failing

**Symptoms:**
- Network errors
- CORS errors
- 404 on API calls

**Solutions:**

1. **Check API URL**
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL
   console.log('API URL:', API_URL)
   ```

2. **Handle CORS**
   - Configure backend CORS
   - Use proxy in development
   
   In `vite.config.ts`:
   ```typescript
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3000',
           changeOrigin: true,
         },
       },
     },
   })
   ```

3. **Check network tab**
   - Open DevTools
   - Go to Network tab
   - Inspect failed requests

## 📚 Frequently Asked Questions (FAQ)

### Q: How do I add a new component?

**A:** Create a new file in `src/components/` and export your component:

```typescript
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Hello</div>
}
```

### Q: How do I add environment variables?

**A:** Create `.env.local` file and prefix variables with `VITE_`:

```env
VITE_API_URL=http://localhost:3000
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

### Q: How do I add routing?

**A:** Install React Router:

```bash
npm install react-router-dom
```

Set up routes:
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Q: How do I customize colors?

**A:** Edit `tailwind.config.js`:

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

### Q: How do I add icons?

**A:** Use included icon libraries:

```typescript
import { Check } from 'lucide-react'
import { Heart } from '@phosphor-icons/react'

<Check className="w-4 h-4" />
<Heart size={16} />
```

### Q: How do I deploy to production?

**A:** See the [Deployment Guide](DEPLOYMENT.md) for detailed instructions.

## 🆘 Getting More Help

If your issue isn't covered here:

1. **Search existing issues** on GitHub
2. **Check documentation** in the docs/ folder
3. **Ask in Discussions** on GitHub
4. **Create a new issue** with detailed information

### Creating a Good Issue Report

Include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if relevant
- Environment details (OS, browser, Node version)
- Relevant code snippets

## 📚 Related Documentation

- [Getting Started](GETTING_STARTED.md) - Setup guide
- [Development](DEVELOPMENT.md) - Development workflow
- [Configuration](CONFIGURATION.md) - Configuration files

---

[← Back to Documentation](README.md)
