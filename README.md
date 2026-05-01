# AUTEEN Shopping Homepage

White-base ecommerce landing page for automation software products.

## Structure

- `frontend/`: React + Vite storefront UI
- `backend/`: Express API server
- `vercel.json`: Vercel Services multi-service routing config

Frontend and backend responsibilities are intentionally separated.

## Features

- AUTEEN brand landing section and product catalog
- Login button UI only (no auth logic yet)
- Product cards and automation tool logos loaded from backend API
- Responsive desktop/mobile layout

## Local Development

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- API routes: `http://localhost:4000/api/*`

If you want frontend-to-backend connection exactly like the env-local flow:

```bash
# frontend/.env.local
VITE_API_BASE_URL=http://localhost:4000/api
```

## API Endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/tools`

## Vercel Deployment

### Option A: One project with Services (if your account has Services access)

1. Keep **Framework Preset = Services**.
2. Keep **Root Directory = `./`**.
3. Ensure root `vercel.json` exists (already included in this repo).
4. Deploy.

In this mode, frontend is routed at `/` and backend at `/api`.
The frontend defaults to `/api` in production, so no extra env var is required unless you want to override it.

### Option B: Two separate Vercel projects (fallback when Services is unavailable)

1. Create frontend project with root directory `frontend`.
2. Create backend project with root directory `backend`.
3. In frontend project env vars, set:

```bash
VITE_API_BASE_URL=https://<your-backend-domain>/api
```

Then redeploy frontend.
