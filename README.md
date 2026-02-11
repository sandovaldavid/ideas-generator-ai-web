# Ideas Generator AI Web
> Modern interface for generating business ideas using AI.

![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38bdf8?style=flat&logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-3.0.0-729B1B?style=flat&logo=vitest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](LICENSE)

---

## Overview

**Business Problem**: Entrepreneurs and creators often face "blank page syndrome" when trying to brainstorm unique business concepts tailored to specific industries or niches.

**Technical Solution**: A high-performance Single Page Application (SPA) that interfaces with an AI-powered backend to generate structured, actionable business ideas in real-time.

**Key Results**:
- **Instant Ideation**: Generates structured business concepts in seconds via AI integration.
- **Optimized UX**: Seamless loading states and error handling for asynchronous operations.
- **Responsive Design**: Fully adaptive interface for mobile and desktop users.

---

## Architecture and Design Decisions

This project implements a **Component-Based Architecture** with clear separation of concerns between UI, State Management, and Data Fetching layers.

```
┌─────────────────┐
│  Presentation   │  React Components (Atomic Design principles)
├─────────────────┤
│ State Management│  React Hooks (Local UI State)
├─────────────────┤
│ Data Fetching   │  TanStack Query (Server State, Caching, Mutations)
├─────────────────┤
│ Infrastructure  │  Vite (Build), Vercel (Hosting), Backend API
└─────────────────┘
```

### Technical Stack and Rationale

| Component | Technology | Rationale | Alternative Considered |
|-----------|-----------|-----------|------------------------|
| **Frontend Framework** | React 19 | Component reusability, concurrent features, vast ecosystem | Vue.js (rejected: preferred React ecosystem) |
| **Language** | TypeScript 5 | Static typing, improved developer experience, catch errors early | JavaScript (rejected: lack of type safety) |
| **Build Tool** | Vite 7 | Instant HMR, optimized build performance, ES modules | Webpack (rejected: slower build times) |
| **Styling** | Tailwind CSS v4 | Utility-first, zero-runtime overhead, design consistency | CSS Modules (rejected: slower dev velocity) |
| **State Management** | TanStack Query v5 | Robust server state management, declarative data fetching | Redux (rejected: overkill for server state) |
| **Performance** | React Compiler | Automatic memoization (babel-plugin-react-compiler) | Manual `useMemo` (rejected: maintenance overhead) |
| **Testing** | Vitest + MSW | Fast unit testing, network mocking for integration tests | Jest (rejected: slower execution) |

### Critical Trade-offs

**Trade-off 1: Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)**
- **Decision**: CSR with Vite
- **Rationale**: Highly interactive application with no SEO requirements for generated content; faster initial development and cheaper hosting (static).
- **Impact**: Fast transitions after initial load, simple deployment to CDNs/Vercel.

**Trade-off 2: Tailwind CSS vs. Component Library**
- **Decision**: Tailwind CSS (Utility-first)
- **Rationale**: Full control over design system without fighting library overrides; smaller bundle size with purging.
- **Impact**: Faster styling iterations, custom unique look, but requires building components from scratch.

---

## Performance Characteristics

### Optimization Strategy

| Metric | Strategy | Implementation |
|--------|----------|----------------|
| **Bundle Size** | Tree Shaking | Vite + Rollup build optimization |
| **Render Performance** | Memoization | React Compiler (Babel plugin) |
| **Network Requests** | Deduplication | TanStack Query query client |
| **LCP (Largest Contentful Paint)** | Asset Optimization | Optimized images and lazy loading components |

### Monitoring

Integrated with **Vercel Analytics** and **Speed Insights** to track real-user performance metrics in production.

---

## Quick Start

### Prerequisites

```bash
# Required
- Node.js 18+ or Bun
- Backend API running locally (or configured remote URL)
```

### Setup

```bash
# Clone repository
git clone https://github.com/dev-sandoval/ideas-generator-ai-web.git
cd ideas-generator-ai-web

# Install dependencies
npm install
# or
bun install

# Configure Environment
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL (default: http://localhost:3000)

# Start Development Server
npm run dev
# or
bun dev
```

### Running Tests

```bash
# Run unit and integration tests
npm run test
# or
bun test
```

The application will be available at `http://localhost:5173`.

---

## Technical Features

### Core Functionality

**Idea Generation**
- **Real-time Interaction**: Interface with backend API via `POST /api/generate-ideas`.
- **Dynamic Content**: Renders structured ideas (Title, Description, Category) dynamically.
- **Input Validation**: Prevents empty submissions and sanitizes input.

**User Experience**
- **Loading States**: Custom loader animations during AI processing.
- **Error Handling**: Graceful error messages for network failures or API errors.
- **Responsive Layout**: Adapts from single-column (mobile) to multi-column (desktop) grids.
- **Theme System**: Native Dark Mode support with toggle and system preference detection.
- **Clipboard Integration**: One-click copy functionality for generated ideas.

### Code Quality Standards

- **Linting**: ESLint with React and TypeScript recommended rules.
- **Formatting**: Consistent code style enforced.
- **Type Safety**: Strict TypeScript configuration (`noImplicitAny`, etc.).
- **Testing**: Comprehensive integration tests covering happy paths and error scenarios (Chaos Engineering).

---

## Engineering Challenges and Solutions

### Challenge 1: Managing Asynchronous AI Request States

**Context**: The application relies heavily on the backend API for generating content. Managing the complex state lifecycle (loading, error, success, data) manually in components led to repetitive boilerplate code and potential race conditions.

**Root Cause Analysis**:
- Imperative data fetching logic mixed with UI rendering.
- Difficulty in handling race conditions if the user submits multiple requests quickly.

**Solution Implementation**:
Adopting **TanStack Query (React Query)** specifically `useMutation` hook to encapsulate the asynchronous logic.

```typescript
// src/hooks/useIdeasGenerator.ts
export const useIdeasGenerator = () => {
  const mutation = useMutation({
    mutationFn: fetchIdeas,
  });

  return {
    generateIdeas: mutation.mutate,
    ideas: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    // ...
  };
};
```

**Results**:
- **Declarative UI**: Components simply react to `isLoading` and `error` states.
- **Robustness**: Automatic handling of request states and error propagation.
- **Maintainability**: Separated data fetching logic from presentation components.

### Challenge 2: Ensuring Reliability without a Real Backend

**Context**: Developing the frontend in parallel with the backend introduced dependencies on an unstable API. We needed a way to verify frontend logic robustly without relying on the actual server availability.

**Root Cause Analysis**:
- Flaky end-to-end tests due to network issues or backend downtime.
- Difficulty in reproducing specific error scenarios (e.g., 500 Server Error) on demand.

**Solution Implementation**:
Implemented integration tests using **Vitest** combined with **MSW (Mock Service Worker)** to intercept network requests at the network level.

```typescript
// src/App.test.tsx (Chaos Engineering Scenario)
it('Scenario B: Chaos Engineering - API returns 500', async () => {
  server.use(
    http.post(getUrl(), () => {
      return new HttpResponse(null, { status: 500 }); // Force 500 Error
    })
  );

  // Test asserts that the UI gracefully handles the error
  await waitFor(() => {
    expect(screen.getByText(/Error del servidor: 500/i)).toBeInTheDocument();
  });
});
```

**Results**:
- **Confidence**: 100% deterministic tests for both success and failure paths.
- **Velocity**: Developers can work offline or without running the backend locally.
- **Quality**: Regressions in error handling logic are caught immediately in CI.

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx       # Main application layout
│   ├── GeneratorForm.tsx # Input form component
│   ├── IdeasDisplay.tsx # Results visualization
│   └── icons/           # Icon components
├── config/              # Configuration constants
│   └── constants.ts     # API URLs, messages
├── hooks/               # Custom React Hooks
│   └── useIdeasGenerator.ts # Data fetching logic
├── types/               # TypeScript interfaces
│   └── index.ts         # Domain models
├── utils/               # Helper functions
│   └── helpers.ts       # Clipboard logic, delays
├── App.tsx              # Root component
├── App.test.tsx         # Integration tests
└── main.tsx             # Entry point
```

---

## Deployment

### Production Deployment (Vercel)

This project is optimized for deployment on Vercel.

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL of the backend API | `https://api.example.com` |

---

## Roadmap and Future Enhancements

### Immediate Priorities
- [ ] Implement "History" feature to view previously generated ideas (Local Storage).
- [ ] Add PWA (Progressive Web App) support for offline access.

### Mid-term Goals
- [ ] User Authentication (Save history to cloud).
- [ ] Social Sharing integration (Twitter/X, LinkedIn).
- [ ] Export ideas to PDF or Notion.

---

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Juan David Sandoval**
Software Engineer

- **Portfolio**: [devsandoval.me](https://devsandoval.me)
- **LinkedIn**: [linkedin.com/in/devsandoval](https://linkedin.com/in/devsandoval)
- **GitHub**: [@sandovaldavid](https://github.com/sandovaldavid)

*This project demonstrates modern frontend development practices using React ecosystem tools.*
