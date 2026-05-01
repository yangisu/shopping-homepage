import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: "auteen-rpa-1",
    category: "RPA",
    name: "AUTEEN Flow Builder",
    description: "Drag-and-drop starter toolkit for repetitive office workflows",
    price: 129000,
    badge: "BEST"
  },
  {
    id: "auteen-qa-1",
    category: "QA",
    name: "AUTEEN Test Runner",
    description: "Scheduled web regression tests with automatic reporting",
    price: 239000,
    badge: "NEW"
  },
  {
    id: "auteen-devops-1",
    category: "DEVOPS",
    name: "AUTEEN Deploy Guard",
    description: "Pre-deploy checks and pipeline guard rails for production teams",
    price: 319000,
    badge: "HOT"
  },
  {
    id: "auteen-data-1",
    category: "DATA",
    name: "AUTEEN Crawl Studio",
    description: "Collection, transformation, and dashboard delivery in one flow",
    price: 179000,
    badge: "NEW"
  },
  {
    id: "auteen-infra-1",
    category: "INFRA",
    name: "AUTEEN Monitor Pulse",
    description: "Infrastructure monitoring with automated alert actions",
    price: 209000,
    badge: "BEST"
  },
  {
    id: "auteen-ai-1",
    category: "AI AGENT",
    name: "AUTEEN Agent Starter",
    description: "AI-powered task triage and automated follow-up execution",
    price: 359000,
    badge: "HOT"
  }
];

const automationTools = [
  { name: "Selenium", logoUrl: "https://cdn.simpleicons.org/selenium/43B02A" },
  { name: "Playwright", logoUrl: "https://cdn.simpleicons.org/playwright/2EAD33" },
  { name: "UiPath", logoUrl: "https://cdn.simpleicons.org/uipath/FA4616" },
  { name: "Zapier", logoUrl: "https://cdn.simpleicons.org/zapier/FF4F00" },
  { name: "GitHub Actions", logoUrl: "https://cdn.simpleicons.org/githubactions/2088FF" },
  { name: "Make", logoUrl: "https://cdn.simpleicons.org/make/6D00CC" }
];

// Support both:
// 1) Local/separate backend deployment: /api/*
// 2) Vercel Services routePrefix "/api": backend receives stripped paths /*
app.get(["/health", "/api/health"], (_req, res) => {
  res.json({ ok: true, service: "auteen-backend" });
});

app.get(["/products", "/api/products"], (_req, res) => {
  res.json({ items: products });
});

app.get(["/tools", "/api/tools"], (_req, res) => {
  res.json({ items: automationTools });
});

app.listen(PORT, () => {
  console.log(`AUTEEN backend running on http://localhost:${PORT}`);
});
