# CLAUDE.md — Benka's Workbench Development Log

> This file is the source of truth for what has been done and what is planned.
> Always read this file before making changes. Always update it after making changes.
> Do not repeat work that is already marked as completed.

---

## Project Overview

**Benka's Workbench** — engineering dashboard, project file manager and admin panel for the Benka engineering company. Built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui (base-ui), Prisma + PostgreSQL, Recharts.

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 16.2.2 (App Router, Turbopack) |
| Language    | TypeScript                          |
| Styling     | Tailwind CSS v4 + shadcn/ui (base-ui) |
| Database    | PostgreSQL (via Prisma ORM)         |
| Auth        | NextAuth.js (planned)               |
| Charts      | Recharts                            |
| Icons       | Lucide React                        |
| Package Mgr | npm                                 |

## Project Naming Convention

Format: `TYPE-REGION-ID`

**Types:** PJ, STC, TO, TEO, AO, EA
**Regions:** TAS, SUR, SAM, BUX, FER, AND, NAM, NAV, QAS, JIZ, SIR, XOR, KAR
**ID:** Internal numeric identifier

Examples: `PJ-TAS-1001`, `STC-SUR-2050`, `TO-SAM-3012`

## File Structure

```
src/
├── app/
│   ├── layout.tsx          — Root layout with Sidebar
│   ├── page.tsx            — Redirects to /dashboard
│   ├── dashboard/page.tsx  — Metrics + 4 charts (Recharts)
│   ├── projects/page.tsx   — Project list with filters (type/region/status/search)
│   ├── projects/[id]/page.tsx — File manager (drag-drop, list/grid, tabs)
│   └── admin/page.tsx      — User management, roles, project assignments
├── components/
│   ├── sidebar.tsx         — Navigation sidebar with search + user dropdown
│   ├── dashboard-charts.tsx — Recharts chart components
│   └── ui/                 — shadcn/ui components (button, card, badge, etc.)
├── lib/
│   ├── mock-data.ts        — Mock data for UI prototype
│   ├── prisma.ts           — Prisma client (safe import, works without DB)
│   └── utils.ts            — cn() utility
prisma/
└── schema.prisma           — DB schema (User, Role, UserRole, Project, ProjectMember, File)
```

## Completed Work

### 2026-04-01 — Initial Build
- [x] Initialized Next.js 16 project with TypeScript, Tailwind v4, shadcn/ui
- [x] Installed dependencies: prisma, @prisma/client, next-auth, recharts, lucide-react
- [x] Created Prisma schema (User, Role, UserRole, Project, ProjectMember, File)
- [x] Built Sidebar component with navigation, search, user dropdown
- [x] Built Dashboard page with 6 metric cards and 4 charts
- [x] Built Projects page with search + type/region/status filters + project cards
- [x] Built File Manager (per-project) with drag-drop, list/grid views, category tabs
- [x] Built Admin Panel with user table, add user dialog, roles tab, project assignments
- [x] Created mock data (8 projects, 11 files, 6 users)
- [x] Fixed build: removed Google Fonts (not available), fixed asChild → base-ui, fixed Select typing
- [x] Created CLAUDE.md, README.md, deploy_local.md

## Known Issues / Notes

- **shadcn/ui v4 uses base-ui, NOT Radix.** No `asChild` prop — wrap triggers with children directly
- **Select `onValueChange`** passes `string | null`, not `string` — always handle null: `(v) => setValue(v ?? "default")`
- **Google Fonts** not available in this environment — using system font stack
- **Prisma client** — `src/lib/prisma.ts` uses dynamic require to avoid build errors when client is not generated
- **Auth** — NextAuth not yet configured, currently using mock user in sidebar

## Pending / TODO

- [ ] Connect PostgreSQL database (set DATABASE_URL, run prisma generate + db push)
- [ ] Configure NextAuth.js (login/logout, session, role-based access)
- [ ] Replace mock data with real Prisma queries (server components + server actions)
- [ ] Implement file upload API (POST /api/files with multipart form data)
- [ ] Add file download/delete functionality
- [ ] Add "Create Project" dialog with type/region/id form
- [ ] Add user-to-project assignment API
- [ ] Role-based route protection (middleware or layout-level checks)
- [ ] Dark mode toggle
- [ ] Mobile responsiveness polish
