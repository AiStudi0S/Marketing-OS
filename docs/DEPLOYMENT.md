# Deployment Guide

This guide covers deploying your Spark Template application to various platforms and environments.

## 🏗️ Production Build

### Creating a Production Build

```bash
npm run build
```

This command:
1. Runs TypeScript compilation (`tsc -b --noCheck`)
2. Bundles the application with Vite
3. Optimizes assets
4. Outputs to the `dist/` directory

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js      # Main JavaScript bundle
│   ├── index-[hash].css     # Compiled CSS
│   └── ...                  # Other assets
└── index.html               # Entry HTML file
```

### Previewing Production Build

Test the production build locally:

```bash
npm run preview
```

This starts a local server serving the production build at `http://localhost:4173`.

## 🌐 Deployment Platforms

### Vercel (Recommended)

Vercel provides zero-configuration deployment for Vite applications.

#### Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow Prompts**
   - Link to existing project or create new
   - Configure settings
   - Deploy

#### Deploy via GitHub Integration

1. **Import Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Automatic deployments on push to main branch

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### Netlify

Netlify offers easy deployment with continuous deployment from Git.

#### Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

#### Deploy via GitHub Integration

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository

2. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)

3. **Deploy**
   - Click "Deploy site"

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### GitHub Pages

Deploy to GitHub Pages for free static hosting.

#### Setup

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Add Deploy Script**
   
   Update `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Configure Base Path**
   
   Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/repo-name/', // Replace with your repo name
     // ... other config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

Your site will be available at `https://username.github.io/repo-name/`

---

### Cloudflare Pages

Fast, secure hosting with edge computing capabilities.

#### Deploy via Dashboard

1. **Connect Repository**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your Git provider

2. **Configure Build**
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: (leave empty)

3. **Deploy**
   - Click "Save and Deploy"

#### Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

---

### AWS S3 + CloudFront

Enterprise-grade hosting with AWS infrastructure.

#### Prerequisites

- AWS Account
- AWS CLI installed and configured

#### Steps

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-bucket-name
   ```

2. **Configure Bucket for Website Hosting**
   ```bash
   aws s3 website s3://your-bucket-name \
     --index-document index.html \
     --error-document index.html
   ```

3. **Set Bucket Policy**
   
   Create `bucket-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```
   
   Apply policy:
   ```bash
   aws s3api put-bucket-policy \
     --bucket your-bucket-name \
     --policy file://bucket-policy.json
   ```

4. **Build and Upload**
   ```bash
   npm run build
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

5. **Create CloudFront Distribution** (Optional but recommended)
   - Improved performance
   - HTTPS support
   - Custom domain support

---

### Docker

Containerize your application for deployment anywhere.

#### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
```

#### Build and Run

```bash
# Build image
docker build -t spark-template .

# Run container
docker run -p 8080:80 spark-template
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## 🔧 Environment Configuration

### Environment Variables

#### Development

Create `.env.local`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Spark Template Dev
VITE_ENABLE_ANALYTICS=false
```

#### Production

Set environment variables in your deployment platform:

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Environment Variables

**GitHub Actions:**
- Repository Settings → Secrets and variables → Actions

### Platform-Specific Variables

```env
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false

# Third-party Services
VITE_SENTRY_DSN=https://...
VITE_GA_TRACKING_ID=UA-...
```

## ⚡ Performance Optimization

### Build Optimizations

#### Vite Configuration

Update `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    // Target modern browsers
    target: 'es2015',
    
    // Minification
    minify: 'esbuild',
    
    // Source maps (disable in production)
    sourcemap: false,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Manual chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
})
```

### Asset Optimization

1. **Image Optimization**
   - Use WebP format
   - Compress images
   - Use appropriate sizes
   - Lazy load images

2. **Font Optimization**
   - Use system fonts when possible
   - Subset fonts
   - Use font-display: swap

3. **Code Splitting**
   - Lazy load routes
   - Dynamic imports for heavy components

### CDN Configuration

Use CDN for static assets:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
```

## 🔒 Security Considerations

### Headers Configuration

#### Netlify

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

#### Vercel

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Environment Secrets

- Never commit `.env` files
- Use platform environment variables
- Rotate secrets regularly
- Use different keys per environment

## 📊 Monitoring and Analytics

### Error Tracking with Sentry

1. **Install Sentry**
   ```bash
   npm install @sentry/react
   ```

2. **Configure**
   ```typescript
   import * as Sentry from "@sentry/react"

   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.MODE,
     integrations: [
       new Sentry.BrowserTracing(),
       new Sentry.Replay(),
     ],
     tracesSampleRate: 1.0,
     replaysSessionSampleRate: 0.1,
     replaysOnErrorSampleRate: 1.0,
   })
   ```

### Analytics

Add analytics provider of choice (Google Analytics, Plausible, etc.)

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 📚 Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run preview`
- [ ] Verify all environment variables are set
- [ ] Check that API endpoints are correct
- [ ] Ensure error tracking is configured
- [ ] Test on multiple browsers
- [ ] Verify responsive design
- [ ] Check accessibility (WCAG compliance)
- [ ] Run security audit (`npm audit`)
- [ ] Update documentation
- [ ] Test all critical user flows
- [ ] Set up monitoring and alerts
- [ ] Configure CDN and caching
- [ ] Set security headers
- [ ] Enable HTTPS

## 🆘 Troubleshooting Deployment

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_`
- Check platform-specific configuration
- Restart development server

### 404 Errors on Refresh

Configure your host for SPA:
- Netlify: Add `_redirects` or use `netlify.toml`
- Vercel: Automatically handled
- Nginx: Configure try_files

### Performance Issues

- Enable gzip compression
- Configure CDN
- Optimize images
- Enable caching headers

## 📚 Related Documentation

- [Getting Started](GETTING_STARTED.md) - Setup guide
- [Configuration](CONFIGURATION.md) - Config files
- [Development](DEVELOPMENT.md) - Development workflow

---

[← Back to Documentation](README.md) | [Next: Contributing Guide →](CONTRIBUTING.md)
