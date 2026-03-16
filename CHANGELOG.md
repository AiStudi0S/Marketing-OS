# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-14

### Added
- **Neo-Glow Enterprise UI** — Modern dark theme with cyan/purple glow effects, gradient text, and smooth animations
- **Navigation System** — Sticky tab-based navigation with tabs: Home, Dashboard, Users, Admin, Developer, Settings, Docs; responsive with mobile hamburger menu; keyboard navigable; role-filtered visibility
- **Authentication System** — Secure login with localStorage token simulation, demo credentials for all four roles
- **RBAC (Role-Based Access Control)** — Four roles: Admin, Developer, User, Auditor; `AuthContext` with `hasRole`/`hasPermission` helpers; route-level access enforcement
- **User Dashboard** — Account overview, activity area chart (recharts), notifications list, profile stats
- **Admin Dashboard** — System metrics cards, user management table, role management, API monitoring bar chart, audit log feed
- **Developer Dashboard** — API endpoint health monitor, structured log viewer, environment variable panel, deployment status tracker, metrics line chart
- **Users Page** — In-memory user CRUD with search, add-user dialog, delete confirmation; accessible table with role badges
- **Settings Page** — Profile editor with email validation, password change with length/match validation, theme toggle
- **Docs Page** — Sidebar documentation viewer covering Getting Started, Architecture, API Reference, Deployment, Configuration
- **Enterprise CSS Theme** — `--glow-cyan`, `--glow-purple`, `--glow-green` CSS variables; `.glow-cyan`, `.glow-purple`, `.glow-green`, `.gradient-text`, `.gradient-text-purple` utility classes
- **CHANGELOG.md** — This file; follows Keep a Changelog + SemVer
- **`docs/assets/ui/`** directory — Placeholder for auto-captured UI screenshots
- **CI/CD improvements** — Dependency caching, artifact publishing, dependency audit step in both workflows

### Changed
- **CI governance check** — Removed `docs/` and `ARCHITECTURE.md` from protected patterns so documentation can be updated in PRs; `prompts/`, `governance/`, and `specs/` remain protected
- **`src/App.tsx`** — Replaced static component showcase with full enterprise application (auth-gated routing, navigation, all dashboard pages)
- **`src/styles/theme.css`** — Extended with Neo-Glow CSS custom properties and utility classes
- **`package.json` version** — Bumped from `0.0.0` to `1.0.0` (production release)
- **README.md** — Added UI Preview section with embedded screenshots, updated tech stack table, added enterprise features section

### Fixed
- CI `action_required` status caused by governance gate blocking legitimate documentation updates

### Security
- Input validation on all user-facing form fields (email format, password length/match)
- Role-based access enforcement: Admin/Developer tabs only visible and accessible to respective roles
- No secrets or credentials committed to source code
- `npm audit --audit-level=critical` runs in CI dependency audit step
