import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const fallbackProducts = [
  {
    id: "fallback-1",
    category: "RPA",
    name: "AUTEEN AutoFlow Starter",
    description: "중소팀을 위한 업무 자동화 시작 패키지",
    price: 149000,
    badge: "BEST"
  },
  {
    id: "fallback-2",
    category: "QA",
    name: "AUTEEN QA Bot Pro",
    description: "반복 테스트 자동화를 위한 검증 솔루션",
    price: 219000,
    badge: "NEW"
  },
  {
    id: "fallback-3",
    category: "SCRAPING",
    name: "AUTEEN Data Miner",
    description: "웹 데이터 수집과 리포트 자동 생성을 한번에",
    price: 189000,
    badge: "HOT"
  }
];

function formatKrw(value) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0
  }).format(value);
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [productRes, toolRes] = await Promise.all([
          fetch(`${API_BASE}/api/products`),
          fetch(`${API_BASE}/api/tools`)
        ]);

        if (!productRes.ok || !toolRes.ok) {
          throw new Error("API response error");
        }

        const productData = await productRes.json();
        const toolData = await toolRes.json();

        if (!cancelled) {
          setProducts(productData.items || []);
          setTools(toolData.items || []);
        }
      } catch (error) {
        if (!cancelled) {
          setProducts(fallbackProducts);
          setTools([
            { name: "Selenium", logoUrl: "https://cdn.simpleicons.org/selenium/43B02A" },
            { name: "Playwright", logoUrl: "https://cdn.simpleicons.org/playwright/2EAD33" },
            { name: "UiPath", logoUrl: "https://cdn.simpleicons.org/uipath/FA4616" },
            { name: "Zapier", logoUrl: "https://cdn.simpleicons.org/zapier/FF4F00" },
            { name: "GitHub Actions", logoUrl: "https://cdn.simpleicons.org/githubactions/2088FF" },
            { name: "Make", logoUrl: "https://cdn.simpleicons.org/make/6D00CC" }
          ]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(() => (products.length ? products : fallbackProducts), [products]);

  return (
    <div className="page-shell">
      <div className="blur-orb orb-left" />
      <div className="blur-orb orb-right" />

      <header className="navbar">
        <div className="logo">AUTEEN</div>
        <nav className="menu">
          <a href="#featured">BEST TOOLS</a>
          <a href="#catalog">PROGRAMS</a>
          <a href="#automation">AUTOMATION STACK</a>
          <a href="#api">API</a>
        </nav>
        <div className="actions">
          <button className="icon-btn" aria-label="검색">⌕</button>
          <button className="icon-btn" aria-label="장바구니">🛒</button>
          <button className="login-btn" type="button">LOGIN</button>
        </div>
      </header>

      <main>
        <section className="hero" id="featured">
          <p className="eyebrow">AUTOMATION MARKETPLACE</p>
          <h1>
            BUILD FASTER,
            <br />
            SELL SMARTER.
          </h1>
          <p>
            AUTEEN은 테스트 자동화, 업무 자동화, 데이터 자동화 프로그램을 한 곳에서 비교하고
            바로 도입할 수 있는 쇼핑몰입니다.
          </p>
          <div className="hero-buttons">
            <button type="button" className="primary-btn">SHOP PROGRAMS</button>
            <button type="button" className="secondary-btn">EXPLORE STACK</button>
          </div>
        </section>

        <section className="split" id="api">
          <article className="split-card">
            <h3>Frontend</h3>
            <p>React + Vite 기반 UI. 제품 목록/툴 로고를 백엔드 API에서 받아 렌더링합니다.</p>
          </article>
          <article className="split-card">
            <h3>Backend</h3>
            <p>Express API 서버. 상품 데이터와 자동화 툴 정보를 JSON으로 제공합니다.</p>
          </article>
        </section>

        <section className="tool-section" id="automation">
          <div className="section-title-row">
            <h2>Automation Tool Marks</h2>
            <span>대표 툴 로고</span>
          </div>
          <div className="tools-grid">
            {tools.map((tool) => (
              <article className="tool-card" key={tool.name}>
                <img src={tool.logoUrl} alt={tool.name} loading="lazy" />
                <p>{tool.name}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog" id="catalog">
          <div className="section-title-row">
            <h2>Featured Programs</h2>
            <span>{loading ? "Loading..." : `${featured.length} items`}</span>
          </div>
          <div className="products-grid">
            {featured.map((item) => (
              <article className="product-card" key={item.id}>
                <span className="badge">{item.badge}</span>
                <p className="category">{item.category}</p>
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">{formatKrw(item.price)}</p>
                <button type="button" className="cart-btn">ADD TO CART</button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
