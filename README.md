# WorkLoop Canvas Flow

AI-powered version control, feedback, and collaboration for creative teams.


## Overview

WorkLoop Canvas Flow helps creative teams track file versions, compare visual changes, and collect AI-augmented feedback. The UI supports images, PDFs, designs, and documents and includes collaborative comments, version summaries, and integrations.

## Features

- AI-powered feedback and suggestions
- Visual side-by-side version comparison
- Collaborative commenting and mentions
- Automatic version summaries
- Centralized dashboard for files and activity
- Integrations (Figma, Google Drive, Notion — stubs)
- User settings (theme, AI model, integrations)
- Responsive layout with dark/light mode

## Quick Start

Prerequisites:

- Node.js (recommended v18+)
- npm (or use your preferred package manager)

Clone and run locally:

```bash
git clone <YOUR_GIT_URL>
cd workloop-canvas-flow
npm install
npm run dev
```

The dev server (Vite) typically runs at `http://localhost:5173`.

Build for production:

```bash
npm run build
npm run preview
```

## Development

- The app uses Vite + React + TypeScript. Hot reload is enabled in development.
- Tailwind CSS is used for styling. Configuration is in `tailwind.config.ts`.
- The component library is built using shadcn-style Radix primitives and custom UI components in `src/components/ui/`.

If you add new dependencies, run `npm install` and consider updating `README.md` to document them.

## Project Structure

Top-level layout:

```
src/
	components/    # UI and feature components (layout, dashboard, viewer, auth, ui primitives)
	hooks/         # Custom React hooks
	lib/           # Utilities
	pages/         # Page routes (Landing, Index, Files, FileViewer, Feedback, Settings, Login)
	main.tsx       # App entry
	App.tsx        # Router + providers
public/          # Static assets
package.json
vite.config.ts
tailwind.config.ts
```

Key files:

- `src/App.tsx` — App root, routing, and providers
- `src/pages/` — Route pages (Landing, Dashboard, Files, FileViewer, Feedback, Settings, Login)
- `src/components/layout/` — `Navbar.tsx`, `Sidebar.tsx`, `Footer.tsx`
- `src/components/viewer/` — `FileDiff.tsx` (visual diff UI)
- `src/components/feedback/` — `AIFeedbackPanel.tsx` (AI suggestions)

## Available Scripts

- `npm run dev` — Start development server (Vite)
- `npm run build` — Build production assets
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint

See `package.json` for the full dependency list.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Radix UI + shadcn UI primitives
- lucide-react icons
- @tanstack/react-query (data fetching & caching)
- react-router-dom (routing)

## Core Components & Flow

- Authentication: `src/components/auth/LoginForm.tsx` and `src/pages/Login.tsx` (local stubbed flows)
- Dashboard: `src/pages/Index.tsx` and `src/components/dashboard/*` (file lists, filters)
- File Viewer: `src/pages/FileViewer.tsx` and `src/components/viewer/FileDiff.tsx` (version selection and visual diffs)
- Feedback: `src/pages/Feedback.tsx` and `src/components/feedback/AIFeedbackPanel.tsx` (AI and team feedback)
- Settings: `src/pages/Settings.tsx` (theme, AI model, integrations)

## Customization

- Theme tokens and Tailwind utilities live in `tailwind.config.ts`. Update there to alter colors, fonts, or spacing.
- UI primitives are in `src/components/ui/` — reuse or extend these components across the app.

## Contributing

1. Fork the repo and create a feature branch.
2. Run `npm install` and `npm run dev` to test changes locally.
3. Follow existing code style and component patterns.
4. Open a PR with a clear description and link to any related issues.

See `CONTRIBUTING.md` for more details.

## License

Specify your license here (e.g., MIT) or add a `LICENSE` file.

---

If you'd like, I can also:

- Add screenshots or example assets to `public/` and reference them here
- Add deployment instructions for Vercel / Netlify
- Add an API section if you plan to wire a backend

Let me know which additions you want and I will update `README.md` accordingly.
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e4f9fa5b-55a4-421a-b13e-ca55f749df2c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
