# AUTEEN Shopping Homepage

A clean white-base shopping homepage for automation software products.

## Project Structure

- `frontend/`: React + Vite user-facing storefront UI
- `backend/`: Express API server (product/tool data)

This keeps frontend and backend responsibilities clearly separated.

## Features

- AUTEEN brand landing page with hero, categories, and featured products
- Login button UI only (no auth logic yet)
- Product list fetched from backend API
- Automation tool logo section (Selenium, Playwright, UiPath, Zapier, GitHub Actions, Make)
- Responsive layout for desktop/mobile

## Local Run

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## API Endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/tools`

## Vercel Deployment Note

For frontend deployment on Vercel, set:

- `VITE_API_BASE_URL` to your deployed backend URL.

(Backend can be deployed separately as a Node service or moved to Vercel Functions later.)
