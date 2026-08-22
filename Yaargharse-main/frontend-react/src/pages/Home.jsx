import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = [
  { to: "/messes", icon: "mess", label: "Mess", desc: "Find verified mess & tiffin near you" },
  { to: "/rooms", icon: "rooms", label: "Rooms", desc: "PG and room listings, verified" },
  { to: "/vehicles", icon: "vehicles", label: "Vehicles", desc: "Rent a scooty, bike, or car" },
  { to: "/libraries", icon: "libraries", label: "Libraries", desc: "Study spaces with seats & hours" },
  { to: "/services", icon: "services", label: "Daily Services", desc: "Laundry, printing, water & more" },
  { to: "/marketplace", icon: "marketplace", label: "Buy & Sell", desc: "Books, furniture, electronics" },
  { to: "/smart-match", icon: "smartmatch", label: "Smart Match", desc: "Find your perfect room by budget" },
  { to: "/nearby", icon: "nearby", label: "Nearby Everything", desc: "Everything close to you, sorted" },
  { to: "/student-package", icon: "studentpackage", label: "Student Package", desc: "Plan your monthly budget" },
  { to: "/student-help", icon: "studenthelp", label: "Student Help", desc: "Emergency contacts & local help" }
];

const HOW_IT_WORKS = [
  { title: "Browse & Search", desc: "Explore verified mess, rooms, vehicles, libraries and more — filtered for students, near you." },
  { title: "Compare & Shortlist", desc: "Check ratings, photos, safety scores and pricing side by side before you decide." },
  { title: "Connect & Book", desc: "Reach out to real, reviewed owners directly and lock in your next stay with confidence." }
];

function Icon({ name, ...props }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  };
  switch (name) {
    case "mess":
      return (
        <svg {...common}>
          <path d="M4 11h16a1 1 0 0 1 1 1 8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8 1 1 0 0 1 1-1Z" />
          <path d="M9 11V7a3 3 0 0 1 6 0v4" />
          <path d="M12 3v2" />
        </svg>
      );
    case "rooms":
      return (
        <svg {...common}>
          <path d="M4 11 12 4l8 7" />
          <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "vehicles":
      return (
        <svg {...common}>
          <circle cx="6" cy="18" r="2.4" />
          <circle cx="18" cy="18" r="2.4" />
          <path d="M6 18h6l3-7h4" />
          <path d="M9 8h4l2.5 3" />
        </svg>
      );
    case "libraries":
      return (
        <svg {...common}>
          <path d="M12 5.5c-1.6-1.2-4-1.7-6-1.5a1 1 0 0 0-1 1v12.6a1 1 0 0 0 1.1 1c2-.2 4.3.3 5.9 1.4V5.5Z" />
          <path d="M12 5.5c1.6-1.2 4-1.7 6-1.5a1 1 0 0 1 1 1v12.6a1 1 0 0 1-1.1 1c-2-.2-4.3.3-5.9 1.4V5.5Z" />
        </svg>
      );
    case "services":
      return (
        <svg {...common}>
          <path d="M4 9h16l-1.4 10.1a2 2 0 0 1-2 1.9H7.4a2 2 0 0 1-2-1.9Z" />
          <path d="M9 9V7a3 3 0 0 1 6 0v2" />
          <path d="M9.5 13v4M14.5 13v4" />
        </svg>
      );
    case "marketplace":
      return (
        <svg {...common}>
          <path d="M6 8h12l1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "smartmatch":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="12" cy="12" r="0.6" fill="currentColor" />
        </svg>
      );
    case "nearby":
      return (
        <svg {...common}>
          <path d="M12 21s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12Z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
      );
    case "studentpackage":
      return (
        <svg {...common}>
          <path d="m12 2.5 2.85 6.1 6.65.65-5 4.5 1.45 6.55L12 16.9l-5.95 3.4 1.45-6.55-5-4.5 6.65-.65Z" />
        </svg>
      );
    case "studenthelp":
      return (
        <svg {...common}>
          <path d="M12 2.5 4.5 5.3v5.9c0 4.8 3.2 8.4 7.5 8.8 4.3-.4 7.5-4 7.5-8.8V5.3Z" />
          <path d="M9.2 12.3 11 14l3.8-3.8" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} strokeWidth="2.4">
          <path d="M5 12.5 9.5 17 19 7" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 2.5 4.5 5.3v5.9c0 4.8 3.2 8.4 7.5 8.8 4.3-.4 7.5-4 7.5-8.8V5.3Z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <circle cx="17.5" cy="9" r="2.3" />
          <path d="M15 12.2c2.6 0 4.7 1.9 5 4.4" />
        </svg>
      );
    default:
      return null;
  }
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CATEGORIES.filter(
      (c) => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filtered.length > 0) {
      navigate(filtered[0].to);
      setQuery("");
    } else if (query.trim()) {
      navigate("/nearby");
      setQuery("");
    }
  };

  return (
    <div className="home">
      {/* ---------- Hero ---------- */}
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="sign-tag">✦ YaarGharSe · verified for students</span>

          <h1 className="home-hero-title">
            Ghar jaisa mess &amp; <span className="grad-text">rooms nearby</span>
          </h1>

          <p className="home-hero-text">
            Verified mess and PG/room listings for students — added by real owners,
            reviewed by our team before they go live. No fake listings, no guesswork.
          </p>

          <form className="home-search" onSubmit={handleSearchSubmit} role="search">
            <Icon name="search" />
            <input
              type="text"
              className="home-search-input"
              placeholder="Search rooms, mess, vehicles, libraries…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search YaarGharSe"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          {query.trim() && (
            <div className="home-search-panel">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    className="home-search-suggestion"
                    onClick={() => setQuery("")}
                  >
                    <Icon name={c.icon} />
                    <span>
                      <span className="home-search-suggestion-label">{c.label}</span>
                      <br />
                      <span className="home-search-suggestion-desc">{c.desc}</span>
                    </span>
                  </Link>
                ))
              ) : (
                <p className="home-search-empty">
                  No matches — try “room”, “mess”, “library”, “vehicle”…
                </p>
              )}
            </div>
          )}

          <div className="hero-actions">
            <Link to="/messes" className="btn btn-primary">Find a Mess</Link>
            <Link to="/rooms" className="btn btn-outline">Find a Room</Link>
          </div>

          <div className="home-trust-row">
            <span className="home-trust-chip"><Icon name="check" /> Verified by our team</span>
            <span className="home-trust-chip"><Icon name="shield" /> Real owners only</span>
            <span className="home-trust-chip"><Icon name="users" /> Built for students</span>
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <span className="hero-orb hero-orb-teal" />
          <span className="hero-orb hero-orb-gold" />

          <div className="hero-mock">
            <span className="hero-mock-badge"><Icon name="check" /> Verified</span>

            <div className="hero-mock-row">
              <span className="hero-mock-thumb"><Icon name="rooms" /></span>
              <div className="hero-mock-lines">
                <span className="hero-mock-bar w60" />
                <span className="hero-mock-bar w40" />
              </div>
            </div>

            <div className="hero-mock-divider" />

            <div className="hero-mock-row">
              <span className="hero-mock-thumb"><Icon name="mess" /></span>
              <div className="hero-mock-lines">
                <span className="hero-mock-bar w80" />
                <span className="hero-mock-bar w40" />
              </div>
            </div>

            <div className="hero-mock-divider" />

            <div className="hero-mock-footer">
              <span className="hero-mock-price">₹4,500/mo</span>
              <span className="hero-mock-rating">★ 4.6 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      <section className="home-section">
        <div className="home-section-head">
          <h2 className="home-section-title">Explore Everything</h2>
          <p className="home-section-sub">Everything a student needs, in one trusted place</p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((c, i) => (
            <Link
              to={c.to}
              key={c.to}
              className="category-card"
              style={{ "--delay": `${i * 0.06}s` }}
            >
              <span className="category-icon-wrap"><Icon name={c.icon} /></span>
              <span className="category-label">{c.label}</span>
              <span className="category-desc">{c.desc}</span>
              <span className="category-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="home-section">
        <Reveal className="home-section-head">
          <h2 className="home-section-title">How It Works</h2>
          <p className="home-section-sub">Three simple steps to your next stay</p>
        </Reveal>

        <div className="home-how-grid">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.title} className="home-how-step" style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className="home-step-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA banner ---------- */}
      <Reveal as="section" className="home-cta">
        <div className="home-cta-inner">
          <h2>Ready to find your next place?</h2>
          <p>
            Join as a student to start browsing, or register as an owner to list your
            mess, room, vehicle or service — verified onboarding takes minutes.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}