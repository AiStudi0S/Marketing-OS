# Contributing to Spark Template

Thank you for your interest in contributing to Spark Template! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all participants to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Our Standards

**Positive behavior includes:**
- Being respectful and professional
- Providing constructive feedback
- Accepting responsibility for mistakes
- Focusing on collaborative problem-solving

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18.x or later
- npm 9.x or later
- Git
- A GitHub account
- Basic knowledge of TypeScript and React

### Setting Up Development Environment

1. **Fork the Repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/spark-template.git
   cd spark-template
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/SMSDAO/spark-template.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Contribution Types

### Bug Reports

Found a bug? Help us fix it!

**Before submitting:**
- Check if the issue already exists
- Verify it's reproducible
- Gather relevant information

**Creating a bug report:**

Use this template:

```markdown
## Bug Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node Version: [e.g., 18.17.0]
- npm Version: [e.g., 9.6.7]

## Additional Context
Any other relevant information.
```

### Feature Requests

Have an idea? We'd love to hear it!

**Before submitting:**
- Check if it's already requested
- Ensure it aligns with project goals
- Consider implementation complexity

**Creating a feature request:**

```markdown
## Feature Description
Clear description of the proposed feature.

## Problem It Solves
What problem does this address?

## Proposed Solution
How should it work?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Any mockups, examples, or references.
```

### Documentation Improvements

Documentation is always welcome!

**Areas to improve:**
- Clarifying existing docs
- Adding examples
- Fixing typos
- Adding translations
- Creating tutorials

### Code Contributions

Ready to code? Here's how:

## 💻 Development Workflow

### 1. Branch Naming Convention

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-dark-mode` |
| Bug Fix | `fix/description` | `fix/button-hover-state` |
| Documentation | `docs/description` | `docs/update-readme` |
| Refactor | `refactor/description` | `refactor/api-service` |
| Performance | `perf/description` | `perf/optimize-images` |
| Test | `test/description` | `test/add-button-tests` |
| Chore | `chore/description` | `chore/update-deps` |

### 2. Making Changes

**Write Quality Code:**
- Follow existing code style
- Write clear, descriptive variable names
- Add comments for complex logic
- Keep functions small and focused
- Use TypeScript types properly

**Example:**

```typescript
// ✅ Good
interface UserProfile {
  id: string
  name: string
  email: string
  createdAt: Date
}

function formatUserName(user: UserProfile): string {
  return `${user.name} (${user.email})`
}

// ❌ Avoid
function format(u: any) {
  return u.name + " (" + u.email + ")"
}
```

### 3. Testing Your Changes

Before submitting:

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Preview production build
npm run preview
```

**Manual testing:**
- Test in multiple browsers (Chrome, Firefox, Safari)
- Test responsive design
- Test keyboard navigation
- Test with screen readers (if applicable)

### 4. Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**

```bash
# Simple commit
git commit -m "feat: add user authentication"

# Detailed commit
git commit -m "fix(button): correct hover state in dark mode

The button hover state was not visible in dark mode due to
incorrect color contrast. Updated the Tailwind classes to use
the proper dark mode color variants.

Fixes #123"
```

**Commit Message Rules:**
- Use present tense ("add" not "added")
- Keep subject line under 72 characters
- Capitalize first letter of subject
- Don't end subject with period
- Separate subject from body with blank line
- Use body to explain what and why, not how

### 5. Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Checkout your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### 6. Creating a Pull Request

**Before creating PR:**
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass (if applicable)
- [ ] Build succeeds

**PR Template:**

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to not work)
- [ ] Documentation update

## Related Issue
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
Add screenshots showing the changes.

## Testing Done
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested responsive design
- [ ] Tested accessibility

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes
```

**Creating the PR:**

1. Push your branch
   ```bash
   git push origin feature/your-feature-name
   ```

2. Go to the repository on GitHub

3. Click "Compare & pull request"

4. Fill in the PR template

5. Submit the pull request

### 7. PR Review Process

**What to expect:**
- Maintainers will review your PR
- Feedback may be provided
- Changes may be requested
- Discussion may occur

**Responding to feedback:**
- Address all comments
- Ask questions if unclear
- Make requested changes
- Push updates to same branch
- Re-request review when ready

**If changes are requested:**

```bash
# Make the changes
# Stage and commit
git add .
git commit -m "fix: address review comments"

# Push to update PR
git push origin feature/your-feature-name
```

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

```typescript
// Use descriptive names
const userCount = 10 // ✅
const n = 10 // ❌

// Use const by default
const API_URL = 'https://api.example.com' // ✅
let API_URL = 'https://api.example.com' // ❌

// Type everything
function getUser(id: string): User { // ✅
function getUser(id) { // ❌

// Use template literals
const message = `Hello, ${name}!` // ✅
const message = 'Hello, ' + name + '!' // ❌
```

### React Components

```tsx
// Use function declarations
export function MyComponent() { // ✅
const MyComponent = () => { // ❌ (except for simple cases)

// Props interface above component
interface MyComponentProps {
  title: string
  count: number
}

export function MyComponent({ title, count }: MyComponentProps) {
  return <div>{title}: {count}</div>
}
```

### CSS/Tailwind

```tsx
// Order: layout, spacing, typography, visual, interactive
<div className="flex items-center gap-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600">
  
// Use cn() for conditional classes
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className
)}>
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] Functionality works as expected
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive on mobile, tablet, desktop
- [ ] Works in Chrome, Firefox, Safari
- [ ] Keyboard navigation works
- [ ] Screen reader accessible (if applicable)
- [ ] Performance is acceptable

### Adding Tests (Optional)

If adding tests:

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## 📖 Documentation Guidelines

### Documentation Standards

- Use clear, concise language
- Include code examples
- Add screenshots when helpful
- Keep formatting consistent
- Use proper markdown syntax

### Markdown Style

```markdown
# H1 for main title
## H2 for sections
### H3 for subsections

**Bold** for emphasis
*Italic* for terms
`code` for inline code

\```typescript
// Code blocks with language
const example = 'value'
\```

- Unordered lists
1. Ordered lists

[Link text](URL)
![Alt text](image-url)
```

## 🏆 Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- GitHub contributors page

## 📞 Getting Help

Need help contributing?

- **Documentation**: Read the [docs](README.md)
- **Discussions**: Use GitHub Discussions
- **Issues**: Comment on relevant issues
- **Questions**: Create a discussion post

## 🎯 Contribution Focus Areas

Current areas where contributions are especially welcome:

1. **Documentation improvements**
2. **Bug fixes**
3. **Accessibility enhancements**
4. **Performance optimizations**
5. **Test coverage**
6. **Example applications**
7. **Component enhancements**

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute!

## 📚 Related Documentation

- [Getting Started](GETTING_STARTED.md) - Setup guide
- [Development Workflow](DEVELOPMENT.md) - Development practices
- [Architecture](ARCHITECTURE.md) - Project structure

---

[← Back to Documentation](README.md) | [Next: API Reference →](API_REFERENCE.md)
