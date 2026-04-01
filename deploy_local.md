# Local Deployment Guide — Benka's Workbench

## Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 9+
- PostgreSQL 15+ (for database features)
- Git

## Quick Start (UI only, without database)

```bash
# 1. Clone the repository
git clone <repo-url>
cd benka-dashboard

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open http://localhost:3000 — the app works with mock data, no database required.

## Full Setup (with PostgreSQL)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/benka_workbench"
NEXTAUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

Replace `USER` and `PASSWORD` with your PostgreSQL credentials.

### 3. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run dev`        | Start dev server (http://localhost:3000) |
| `npm run build`      | Create production build              |
| `npm run start`      | Start production server              |
| `npm run lint`       | Run ESLint                           |
| `npx prisma studio`  | Open database GUI (port 5555)       |
| `npx prisma db push` | Sync schema to database             |
| `npx prisma generate`| Regenerate Prisma client            |

## Production Build

```bash
npm run build
npm run start
```

## Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Prisma client not found:**
```bash
npx prisma generate
```

**Database connection refused:**
- Check that PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Ensure the database `benka_workbench` exists:
  ```sql
  CREATE DATABASE benka_workbench;
  ```
