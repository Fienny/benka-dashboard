# Benka's Workbench

Engineering dashboard, project file manager and admin panel for the Benka engineering company.

## Features

- **Dashboard** — overview metrics, charts by project type/region, monthly activity, progress tracking
- **Projects** — browse and filter projects by type, region, status; search by code or name
- **File Manager** — per-project file storage with drag-and-drop upload, list/grid views, category tabs (documents, photos, videos)
- **Admin Panel** — user management, role assignment (Admin / Engineer / Viewer), project-to-user assignments

## Project Naming Convention

Projects follow the format `TYPE-REGION-ID`:

| Part   | Description                     | Examples                    |
|--------|---------------------------------|-----------------------------|
| TYPE   | Project type (2-3 letters)      | PJ, STC, TO, TEO, AO, EA   |
| REGION | Uzbekistan region (3 letters)   | TAS, SUR, SAM, BUX, FER... |
| ID     | Internal numeric identifier     | 1001, 2050, 3012            |

Example codes: `PJ-TAS-1001`, `STC-SUR-2050`, `TO-SAM-3012`, `TEO-BUX-4400`

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui**
- **PostgreSQL** + **Prisma ORM**
- **NextAuth.js** (authentication)
- **Recharts** (dashboard charts)
- **Lucide React** (icons)

## Getting Started

See [deploy_local.md](./deploy_local.md) for full setup instructions.

Quick start (no database needed):

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── dashboard/       — Metrics & charts
│   ├── projects/        — Project list & file manager
│   └── admin/           — User & role management
├── components/
│   ├── sidebar.tsx      — Navigation
│   ├── dashboard-charts.tsx
│   └── ui/              — shadcn/ui components
├── lib/
│   ├── mock-data.ts     — Prototype data
│   └── prisma.ts        — Database client
prisma/
└── schema.prisma        — Database schema
```

## User Roles

| Role     | Access                                                     |
|----------|------------------------------------------------------------|
| Admin    | Full access: users, roles, all projects, settings          |
| Engineer | Work on assigned projects, upload/download files           |
| Viewer   | Read-only access to assigned projects                      |

## License

Private — Benka Engineering Company
