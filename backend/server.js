import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: "auteen-rpa-1",
    category: "RPA",
    name: "AUTEEN Flow Builder",
    description: "반복 사무 작업을 드래그 앤 드롭으로 자동화하는 입문형 솔루션",
    price: 129000,
    badge: "BEST"
  },
  {
    id: "auteen-qa-1",
    category: "QA",
    name: "AUTEEN Test Runner",
    description: "웹앱 회귀 테스트를 일정 기반으로 실행하고 리포트까지 생성",
    price: 239000,
    badge: "NEW"
  },
  {
    id: "auteen-devops-1",
    category: "DEVOPS",
    name: "AUTEEN Deploy Guard",
    description: "배포 전 체크리스트와 자동 점검 파이프라인을 구성하는 팀용 패키지",
    price: 319000,
    badge: "HOT"
  },
  {
    id: "auteen-data-1",
    category: "DATA",
    name: "AUTEEN Crawl Studio",
    description: "수집부터 가공, 대시보드 전송까지 데이터 자동화를 한 번에",
    price: 179000,
    badge: "NEW"
  },
  {
    id: "auteen-infra-1",
    category: "INFRA",
    name: "AUTEEN Monitor Pulse",
    description: "서버 상태를 모니터링하고 경고 액션을 자동 수행하는 운영 패키지",
    price: 209000,
    badge: "BEST"
  },
  {
    id: "auteen-ai-1",
    category: "AI AGENT",
    name: "AUTEEN Agent Starter",
    description: "업무 요청을 자동 분류하고 후속 작업을 실행하는 AI 자동화 도구",
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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "auteen-backend" });
});

app.get("/api/products", (_req, res) => {
  res.json({ items: products });
});

app.get("/api/tools", (_req, res) => {
  res.json({ items: automationTools });
});

app.listen(PORT, () => {
  console.log(`AUTEEN backend running on http://localhost:${PORT}`);
});
