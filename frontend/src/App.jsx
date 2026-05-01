import { useEffect, useMemo, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:4000/api");

const fallbackProducts = [
  {
    id: "fallback-1",
    category: "RPA",
    name: "AUTEEN AutoFlow Starter",
    description: "Starter package for small-team workflow automation",
    price: 149000,
    badge: "BEST"
  },
  {
    id: "fallback-2",
    category: "QA",
    name: "AUTEEN QA Bot Pro",
    description: "Automated regression testing suite with report generation",
    price: 219000,
    badge: "NEW"
  },
  {
    id: "fallback-3",
    category: "SCRAPING",
    name: "AUTEEN Data Miner",
    description: "Web data collection and scheduled reporting automation",
    price: 189000,
    badge: "HOT"
  }
];

function joinUrl(base, path) {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedPath}`;
}

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
          fetch(joinUrl(API_BASE, "products")),
          fetch(joinUrl(API_BASE, "tools"))
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
      } catch {
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
          <button className="icon-btn" aria-label="Search">⌕</button>
          <button className="icon-btn" aria-label="Cart">🛒</button>
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
            AUTEEN is a shopping homepage where teams can compare and adopt automation software
            for QA, workflow automation, and data operations.
          </p>
          <div className="hero-buttons">
            <button type="button" className="primary-btn">SHOP PROGRAMS</button>
            <button type="button" className="secondary-btn">EXPLORE STACK</button>
          </div>
        </section>

        <section className="split" id="api">
          <article className="split-card">
            <h3>Frontend</h3>
            <p>React + Vite storefront UI that renders products and tool logos from backend APIs.</p>
          </article>
          <article className="split-card">
            <h3>Backend</h3>
            <p>Express API server that returns product and automation-tool data as JSON.</p>
          </article>
        </section>

        <section className="tool-section" id="automation">
          <div className="section-title-row">
            <h2>Automation Tool Marks</h2>
            <span>Representative logos</span>
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
