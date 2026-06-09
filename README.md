# OpenSourcePulse

A modern, real-time metrics dashboard for tracking the most influential open-source projects on GitHub. Built with React + TypeScript, TailwindCSS, and deployed on GitHub Pages with automated daily data fetching.

📊 **Dashboard URL**: https://opensourcepulse.github.io/opensourcepulse/

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Tracked Projects](#tracked-projects)
- [Setup & Deployment](#setup--deployment)
- [Development](#development)
- [Workflows](#workflows)
- [Contributing](#contributing)

## Overview

OpenSourcePulse is a single-page application (SPA) that displays real-time metrics (commits, issues, and open PRs) for 10 major open-source projects. The application features:

- **Protocol-Inspired Design** with a modern, clean aesthetic
- **Dark/Light Mode Toggle** for comfortable viewing
- **Responsive Layout** optimized for mobile, tablet, and desktop
- **Automated Data Pipeline** with daily GitHub API updates
- **Interactive Charts** powered by Google Charts
- **GitHub Pages Hosting** with zero server costs

## Features

### ✨ Design & UX
- **Protocol-Inspired Layout**: Sticky navigation header with logo, hero section with gradient text, modern card-based dashboard
- **Dark/Light Mode**: Manual toggle button with persistent preference via localStorage, automatic detection via `prefers-color-scheme`
- **Responsive Design**: Mobile-first approach with TailwindCSS breakpoints (sm, md, lg, xl)
- **Smooth Transitions**: Dark mode color transitions, hover effects, and animations

### 📊 Data Visualization
- **3 Interactive Column Charts**:
  - Commits by Repository
  - Issues by Repository
  - Open Pull Requests by Repository
- **Google Charts Integration**: Responsive charts with dark mode styling
- **Last Updated Timestamp**: Shows when metrics were last fetched

### 🤖 Automation
- **Daily Data Fetching**: GitHub Actions workflow runs at 00:00 UTC
- **GitHub Public API**: No authentication needed (60 req/hr limit safely managed)
- **Auto-Commit**: Changes committed when metrics data updates
- **Respects Rate Limits**: 30 requests/day (well under 60 req/hr limit)

### 🚀 Deployment
- **GitHub Pages Ready**: Vite configured with base path `/opensourcepulse/`
- **Auto-Deploy on Push**: Deploy workflow runs on push to main branch
- **Production Build**: Optimized Vite build with asset minification

## Project Structure

```
opensourcepulse/
├── .github/workflows/
│   ├── fetch-data.yml              # Daily metrics fetching
│   └── deploy.yml                  # Build & deploy to GitHub Pages
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx           # Sticky header + dark mode toggle
│   │   │   └── HeroSection.tsx      # Hero intro with stats cards
│   │   ├── Charts/
│   │   │   ├── ColumnChart.tsx      # Google Charts wrapper
│   │   │   └── ChartCard.tsx        # Card container component
│   │   └── Dashboard.tsx            # 3-chart metrics dashboard
│   ├── data/
│   │   ├── repositories.json        # 10 tracked projects config
│   │   └── metrics.json             # Generated metrics (updated daily)
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── hooks/
│   │   └── useMetrics.ts            # Data loading hook
│   ├── styles/
│   │   └── theme.ts                 # Design system tokens
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # React entry point
│   └── index.css                    # TailwindCSS + global styles
├── public/
│   └── index.html                   # HTML template with dark mode script
├── vite.config.ts                   # Vite configuration
├── tailwind.config.ts               # TailwindCSS config (dark mode + colors)
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
└── .eslintrc.cjs                    # ESLint configuration
```

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **TailwindCSS** | Utility-first styling |
| **PostCSS** | CSS processing |
| **Google Charts** | Data visualization |
| **GitHub Actions** | CI/CD automation |
| **GitHub Pages** | Hosting |

## Tracked Projects

The dashboard monitors metrics for these 10 influential open-source projects:

1. **[golang/go](https://github.com/golang/go)** - The Go programming language
2. **[rust-lang/rust](https://github.com/rust-lang/rust)** - Rust programming language
3. **[Microsoft/TypeScript](https://github.com/Microsoft/TypeScript)** - TypeScript language
4. **[facebook/react](https://github.com/facebook/react)** - React UI library
5. **[expressjs/express](https://github.com/expressjs/express)** - Express.js web framework
6. **[rails/rails](https://github.com/rails/rails)** - Ruby on Rails framework
7. **[kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)** - Kubernetes orchestration
8. **[microsoft/vscode](https://github.com/microsoft/vscode)** - Visual Studio Code editor
9. **[pytorch/pytorch](https://github.com/pytorch/pytorch)** - PyTorch ML framework
10. **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)** - TensorFlow ML platform

## Setup & Deployment

### Prerequisites

- Node.js 18+ and npm
- Git
- GitHub repository

### Local Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: implement opensourcepulse dashboard"
   git push origin main
   ```

2. **Enable GitHub Pages** (one-time setup):
   - Go to repository **Settings** → **Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
   - Click **Save**

3. **Site goes live** at:
   ```
   https://<your-username>.github.io/opensourcepulse/
   ```

4. **Deploy workflow** automatically runs on every push to main branch

### GitHub Actions Configuration

The repository includes two workflows:

#### `.github/workflows/fetch-data.yml`
- **Trigger**: Daily at 00:00 UTC (or manual trigger)
- **What it does**:
  - Fetches commits, issues, and open PRs from GitHub API
  - Aggregates metrics for all 10 repositories
  - Updates `src/data/metrics.json`
  - Auto-commits changes if data modified
  - Respects 60 req/hr public API rate limit

#### `.github/workflows/deploy.yml`
- **Trigger**: Push to main branch
- **What it does**:
  - Installs dependencies
  - Builds React app with Vite
  - Uploads build artifacts
  - Deploys to GitHub Pages (gh-pages branch)

## Development

### Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Customization

#### Add More Projects
Edit `src/data/repositories.json` and add new repository objects:
```json
{
  "id": "owner-repo",
  "owner": "owner",
  "name": "repo",
  "fullName": "owner/repo",
  "url": "https://github.com/owner/repo",
  "description": "Project description"
}
```

#### Change Color Scheme
Edit `tailwind.config.ts` colors configuration:
```typescript
colors: {
  primary: { /* blue colors */ },
  secondary: { /* purple colors */ },
  accent: { /* indigo colors */ }
}
```

#### Modify Metrics
Edit `src/hooks/useMetrics.ts` and `src/components/Dashboard.tsx` to add or remove metrics.

## Workflows

### Data Fetching Workflow

The `fetch-data.yml` workflow:
1. Runs daily at 00:00 UTC
2. Fetches data from GitHub public API (no authentication)
3. Aggregates commits, issues, and open PRs
4. Updates `src/data/metrics.json`
5. Commits and pushes if data changed
6. Manages rate limits safely (30 req/day vs 60 req/hr limit)

### Deployment Workflow

The `deploy.yml` workflow:
1. Triggers on push to main branch
2. Installs dependencies
3. Builds app with `npm run build`
4. Creates optimized dist/ folder
5. Uploads to GitHub Pages artifact
6. Deploys to gh-pages branch
7. Site updates automatically at GitHub Pages URL

## Contributing

Contributions are welcome! Feel free to:

- Report issues or bugs
- Suggest new features or projects to track
- Improve documentation
- Optimize performance
- Enhance the UI/UX

To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Last Updated**: June 9, 2026

**Dashboard**: [https://opensourcepulse.github.io/opensourcepulse/](https://opensourcepulse.github.io/opensourcepulse/)

**Repository**: [https://github.com/opensourcepulse/opensourcepulse](https://github.com/opensourcepulse/opensourcepulse)
