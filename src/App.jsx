import { useState, useEffect, useRef } from "react";

/* ─── THEME ─────────────────────────────────────────────────────────────── */
const DARK = {
  bg: "#050510", card: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)",
  text: "#e8e8ff", muted: "#7070a0",
  a1: "#a78bfa", a2: "#38bdf8", a3: "#f472b6", a4: "#34d399",
  glow: "rgba(167,139,250,0.15)",
};
const LIGHT = {
  bg: "#f0f0ff", card: "rgba(0,0,0,0.04)", border: "rgba(0,0,0,0.08)",
  text: "#1a1a3e", muted: "#6060a0",
  a1: "#7c3aed", a2: "#0284c7", a3: "#db2777", a4: "#059669",
  glow: "rgba(124,58,237,0.08)",
};

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const JOURNEY = [
  { year: "2022", title: "HSC — Science (PCB)", org: "Unnati Madhyamik Vidyalaya, Nashik", detail: "82.83%", icon: "🎓", type: "edu" },
  { year: "2022–25", title: "BBA-CA", org: "Savitribai Phule Pune University", detail: "CGPA: 7.06/10", icon: "📚", type: "edu" },
  { year: "Aug 2024", title: "AI for Students Workshop", org: "NxtWave", detail: "Generative AI & Model Building", icon: "🤖", type: "cert" },
  { year: "Aug 2024 – Jan 2025", title: "Full Stack Java Training", org: "Symbiosis / Capgemini", detail: "Java · Spring Boot · Angular · MySQL", icon: "☕", type: "work" },
  { year: "Jan 2025", title: "Full Stack Java Certification", org: "Symbiosis / Capgemini", detail: "Industry-backed certification", icon: "🏆", type: "cert" },
  { year: "Nov 2025 – Jan 2026", title: "E-Medical Management System", org: "Team Project", detail: "Spring Boot · Angular · MySQL", icon: "🏥", type: "project" },
  { year: "Jan 2026", title: "IBM AI & Cloud Certifications", org: "IBM SkillsBuild", detail: "AI Fundamentals + Cloud Computing", icon: "🧠", type: "cert" },
  { year: "Jan 2026", title: "React JS Frontend Intern", org: "Techgarner IT Services, Nashik", detail: "20 days · Agile/Scrum · Git workflows", icon: "⚛️", type: "work" },
  { year: "Feb 2026", title: "Forage Simulations", org: "JPMorgan · Walmart · AWS", detail: "Kafka · Heap DSA · AWS Architecture", icon: "💼", type: "work" },
  { year: "Feb – Mar 2026", title: "LifeFlow — Blood Bank System", org: "Individual Full-Stack", detail: "PHP · MySQL · Chart.js · PDF Certs", icon: "🩸", type: "project" },
  { year: "Mar 2026", title: "AWS Cloud Practitioner", org: "AWS Training & Certification", detail: "Cloud architecture & services", icon: "☁️", type: "cert" },
  { year: "Mar 2026", title: "AWS Foundations: ML Basics", org: "AWS Training & Certification", detail: "Machine Learning on AWS", icon: "🧬", type: "cert" },
  { year: "May 2026 🆕", title: "AWS AI & ML Learning Plan", org: "AWS Training & Certification", detail: "Completed May 13, 2026", icon: "🌟", type: "cert" },
  { year: "May 2026", title: "Technical Blogger", org: "DEV.to", detail: "Writing about tech & projects", icon: "✍️", type: "work" },
  { year: "2025–27", title: "MCA @ K.K. Wagh Institute", org: "KKWIEER, Nashik · SPPU", detail: "Sem 1 CGPA: 8.09/10 · Ongoing", icon: "🎯", type: "edu" },
];

const PROJECTS = [
  {
    title: "LifeFlow", sub: "Blood Bank Management System",
    desc: "Full-stack web app with role-based portals for Admin, Hospital & Donor. PHP session auth, 8 CRUD modules, Chart.js analytics, PDF certificate generation with unique IDs, PRG pattern & MVC architecture.",
    tech: ["PHP", "MySQL", "JavaScript", "Chart.js", "Postman"],
    type: "Individual · Full-Stack", period: "Feb – Mar 2026", color: "#f472b6", icon: "🩸",
    highlights: ["8 CRUD Modules", "Role-Based Auth", "PDF Certificates", "Analytics Dashboard"],
  },
  {
    title: "E-Medical", sub: "Management System",
    desc: "Healthcare platform with role-based access, RESTful APIs, Angular reactive forms. Reduced DB query time ~25–30% via column indexing and optimized JPA queries.",
    tech: ["Spring Boot", "Angular", "MySQL", "REST APIs"],
    type: "Team Project · Full-Stack", period: "Nov 2025 – Jan 2026", color: "#38bdf8", icon: "🏥",
    highlights: ["~25-30% Faster Queries", "RESTful APIs", "Role-Based Access", "Angular Forms"],
  },
  {
    title: "Weather App", sub: "Real-Time SPA",
    desc: "Responsive real-time SPA with OpenWeather API. Reduced redundant API calls ~40% using response caching and debounced input handling.",
    tech: ["React.js", "OpenWeather API", "JavaScript"],
    type: "Mini Project · Frontend", period: "Jan 2026", color: "#a78bfa", icon: "🌤️",
    highlights: ["~40% Fewer API Calls", "Response Caching", "Debounced Input"],
  },
  {
    title: "Sorting Visualizer", sub: "Algorithm Education Tool",
    desc: "Interactive step-by-step visualizer for Bubble, Insertion, Merge & Quick Sort with adjustable animation speed. Pure vanilla JS.",
    tech: ["HTML", "CSS", "JavaScript"],
    type: "Mini Project · Frontend", period: "2025", color: "#34d399", icon: "📊",
    highlights: ["4 Algorithms", "Adjustable Speed", "Vanilla JS", "Educational"],
  },
];

const SKILLS = [
  { name: "Java", level: 88, cat: "Backend" }, { name: "Spring Boot", level: 82, cat: "Backend" },
  { name: "React.js", level: 85, cat: "Frontend" }, { name: "Angular", level: 75, cat: "Frontend" },
  { name: "MySQL", level: 83, cat: "Database" }, { name: "AWS", level: 78, cat: "Cloud" },
  { name: "PHP", level: 80, cat: "Backend" }, { name: "JavaScript", level: 87, cat: "Frontend" },
  { name: "Kafka", level: 65, cat: "Backend" }, { name: "Hibernate", level: 72, cat: "Backend" },
  { name: "Python", level: 60, cat: "Backend" }, { name: "TypeScript", level: 70, cat: "Frontend" },
];

const CERTS = [
  { title: "AWS AI & ML Learning Plan", org: "AWS Training & Certification", date: "May 13, 2026", skills: ["Artificial Intelligence", "Machine Learning", "AWS AI Services"], color: "#FF9900", badge: "🌟", isNew: true },
  { title: "AWS Cloud Practitioner Essentials", org: "AWS Training & Certification", date: "Mar 2026", skills: ["EC2", "S3", "Cloud Architecture", "Security"], color: "#FF9900", badge: "☁️" },
  { title: "AWS Foundations: ML Basics", org: "AWS Training & Certification", date: "Mar 2026", skills: ["Machine Learning", "AWS AI/ML", "Data Foundations"], color: "#FF9900", badge: "🧬" },
  { title: "AI Fundamentals", org: "IBM SkillsBuild", date: "Jan 2026", skills: ["NLP", "Deep Learning", "IBM Watson Studio", "AI Ethics"], color: "#0062ff", badge: "🧠" },
  { title: "Cloud Computing Fundamentals", org: "IBM SkillsBuild", date: "Jan 2026", skills: ["Cloud Services", "Virtualization", "Deployment Models"], color: "#0062ff", badge: "🏗️" },
  { title: "Full Stack Java Development", org: "Symbiosis / Capgemini", date: "Jan 2025", skills: ["Java", "Spring Boot", "Angular", "MySQL"], color: "#a78bfa", badge: "☕" },
];

const SIMS = [
  { company: "JPMorgan Chase", role: "Software Engineering", date: "Feb 2026", desc: "Built Kafka-integrated Spring Boot microservice for real-time transaction processing; RESTful APIs with RestTemplate.", icon: "🏦", color: "#1a3a6b" },
  { company: "Walmart USA", role: "Advanced Software Engineering", date: "Feb 2026", desc: "Designed custom heap data structure in Java for shipping optimization; created UML class diagrams and ER models.", icon: "🛒", color: "#0071ce" },
  { company: "AWS APAC", role: "Solutions Architecture", date: "Feb 2026", desc: "Architected scalable AWS Elastic Beanstalk solution for high-traffic app; cost estimates and infra recommendations.", icon: "⚡", color: "#FF9900" },
];

const TECH = ["Java", "Spring Boot", "React.js", "Angular", "TypeScript", "JavaScript", "PHP", "Python", "C++", "SQL", "MySQL", "Hibernate", "Kafka", "REST APIs", "Microservices", "HTML5", "CSS3", "AWS", "EC2", "Elastic Beanstalk", "Git/GitHub", "Maven", "Postman", "JUnit", "DSA", "OOP", "Agile/Scrum"];
const TC = ["#a78bfa", "#38bdf8", "#f472b6", "#34d399", "#fb923c", "#FF9900"];
const TYPE_C = { edu: "#a78bfa", work: "#38bdf8", cert: "#f472b6", project: "#34d399" };
const TYPE_L = { edu: "Education", work: "Experience", cert: "Certification", project: "Project" };
const CAT_GRAD = { Backend: "linear-gradient(90deg,#a78bfa,#7c3aed)", Frontend: "linear-gradient(90deg,#38bdf8,#0284c7)", Cloud: "linear-gradient(90deg,#FF9900,#f59e0b)", Database: "linear-gradient(90deg,#34d399,#059669)" };

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

function useTilt(ref) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
      el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);
}

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @keyframes spin { to { transform: rotate(360deg) } }
  @keyframes spinR { to { transform: rotate(-360deg) } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(22px)} }
  @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes glow { 0%,100%{filter:drop-shadow(0 0 8px rgba(167,139,250,0.6))} 50%{filter:drop-shadow(0 0 22px rgba(56,189,248,0.8))} }
  @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
  @keyframes loaderOut { to { opacity:0; pointer-events:none } }
  * { cursor: none !important; }
`;

/* ─── LOADER ─────────────────────────────────────────────────────────────── */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.random() * 11 + 3;
      if (v >= 100) { v = 100; clearInterval(t); setTimeout(onDone, 500); }
      setPct(Math.min(Math.round(v), 100));
    }, 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, background: "#050510", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: 32 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid transparent", borderTopColor: "#a78bfa", animation: "spin 2s linear infinite" }} />
        <div style={{ position: "absolute", inset: 10, borderRadius: "50%", border: "2px solid transparent", borderBottomColor: "#38bdf8", animation: "spinR 1.5s linear infinite" }} />
        <div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "2px solid transparent", borderLeftColor: "#f472b6", animation: "spin 1s linear infinite" }} />
      </div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#a78bfa", letterSpacing: 5, marginBottom: 24 }}>INITIALIZING PORTFOLIO</div>
      <div style={{ width: 280, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#a78bfa,#38bdf8,#f472b6)", borderRadius: 4, transition: "width 0.08s" }} />
      </div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#38bdf8", marginTop: 10 }}>{pct}%</div>
    </div>
  );
}

/* ─── CURSOR ─────────────────────────────────────────────────────────────── */
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [click, setClick] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const m = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }); };
    const d = () => setClick(true); const u = () => setClick(false);
    window.addEventListener("mousemove", m);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    let raf;
    const animate = () => {
      setTrail(t => ({ x: t.x + (posRef.current.x - t.x) * 0.12, y: t.y + (posRef.current.y - t.y) * 0.12 }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", m); window.removeEventListener("mousedown", d); window.removeEventListener("mouseup", u); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div style={{ position: "fixed", left: trail.x, top: trail.y, width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(167,139,250,0.55)", transform: `translate(-50%,-50%) scale(${click ? 0.7 : 1})`, pointerEvents: "none", zIndex: 99999, transition: "transform 0.1s" }} />
      <div style={{ position: "fixed", left: pos.x, top: pos.y, width: 7, height: 7, borderRadius: "50%", background: "#a78bfa", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 99999 }} />
    </>
  );
}

/* ─── PARTICLES ──────────────────────────────────────────────────────────── */
function Particles({ dark }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      op: Math.random() * 0.45 + 0.1, c: ["#a78bfa", "#38bdf8", "#f472b6"][Math.floor(Math.random() * 3)],
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + Math.floor(p.op * (dark ? 255 : 100)).toString(16).padStart(2, "0");
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ─── NAV ────────────────────────────────────────────────────────────────── */
function Nav({ T, dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = ["about", "journey", "projects", "skills", "certifications", "contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: scrolled ? (dark ? "rgba(5,5,16,0.88)" : "rgba(240,240,255,0.88)") : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${T.border}` : "none", transition: "all 0.4s" }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        AS<span style={{ WebkitTextFillColor: T.muted, fontSize: 13 }}>.dev</span>
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {links.map(l => (
          <a key={l} href={`#${l}`} style={{ color: T.muted, fontSize: 12, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = T.a1} onMouseLeave={e => e.target.style.color = T.muted}>{l}</a>
        ))}
        <button onClick={() => setDark(d => !d)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: "6px 14px", color: T.text, fontSize: 16, transition: "all 0.3s" }}>{dark ? "☀️" : "🌙"}</button>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero({ T }) {
  const [gi, setGi] = useState(0);
  const grads = ["linear-gradient(135deg,#a78bfa,#38bdf8)", "linear-gradient(135deg,#f472b6,#a78bfa)", "linear-gradient(135deg,#38bdf8,#34d399)", "linear-gradient(135deg,#fb923c,#f472b6)", "linear-gradient(135deg,#a78bfa,#34d399)"];
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => { const t = setInterval(() => setGi(i => (i + 1) % grads.length), 2800); return () => clearInterval(t); }, []);
  useEffect(() => { const h = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }); window.addEventListener("mousemove", h); return () => window.removeEventListener("mousemove", h); }, []);
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>
      {/* Blobs */}
      {[
        { w: 500, h: 500, c: "rgba(167,139,250,0.10)", t: "10%", l: "-8%", a: "float1 9s ease-in-out infinite" },
        { w: 420, h: 420, c: "rgba(56,189,248,0.08)", b: "10%", r: "-5%", a: "float2 11s ease-in-out infinite" },
        { w: 320, h: 320, c: "rgba(244,114,182,0.07)", t: "55%", r: "22%", a: "float1 13s ease-in-out infinite reverse" },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", width: b.w, height: b.h, borderRadius: "50%", background: `radial-gradient(circle,${b.c} 0%,transparent 70%)`, top: b.t, left: b.l, bottom: b.b, right: b.r, animation: b.a, pointerEvents: "none" }} />
      ))}
      {/* Mouse parallax glow */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle,${T.glow} 0%,transparent 70%)`, left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%`, transform: "translate(-50%,-50%)", pointerEvents: "none", transition: "left 0.3s,top 0.3s", zIndex: 1 }} />

      <div style={{ maxWidth: 900, width: "100%", textAlign: "center", zIndex: 2, animation: "fadeUp 0.9s 0.1s both" }}>
        <div style={{ display: "inline-block", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 20, padding: "6px 20px", fontSize: 11, color: T.a1, letterSpacing: 3, marginBottom: 28, fontFamily: "'Space Mono',monospace" }}>
          MCA STUDENT · FULL STACK DEVELOPER · CLOUD ENTHUSIAST
        </div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(52px,10vw,100px)", lineHeight: 1, color: T.text, animation: "fadeUp 0.9s 0.2s both" }}>Anushka</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(52px,10vw,100px)", lineHeight: 1, marginBottom: 28, animation: "fadeUp 0.9s 0.3s both" }}>
          <span style={{ backgroundImage: grads[gi], backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", transition: "background-image 1.5s ease", animation: "glow 3s ease-in-out infinite" }}>Shinde</span>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(15px,2.5vw,19px)", color: T.muted, maxWidth: 570, margin: "0 auto 40px", lineHeight: 1.75, animation: "fadeUp 0.9s 0.4s both" }}>
          Building real-world apps with Java, Spring Boot, React & AWS. Exploring cloud computing, AI, and modern web development.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.9s 0.5s both" }}>
          {[
            { label: "View Projects →", href: "#projects", bg: "linear-gradient(135deg,#a78bfa,#38bdf8)", color: "#fff", shadow: "0 0 30px rgba(167,139,250,0.4)" },
            { label: "GitHub ↗", href: "https://github.com/Anushka9904", bg: "transparent", color: T.text, border: `1px solid ${T.border}` },
            { label: "DEV Blog ✍️", href: "https://dev.to/anushka_shinde_99", bg: "transparent", color: T.text, border: `1px solid ${T.border}` },
            { label: "LinkedIn ↗", href: "https://linkedin.com/in/anushka-shinde-69a93a316", bg: "transparent", color: T.text, border: `1px solid ${T.border}` },
          ].map(b => (
            <a key={b.label} href={b.href} target={b.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
              style={{ background: b.bg, color: b.color, padding: "13px 28px", borderRadius: 50, fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textDecoration: "none", border: b.border || "none", boxShadow: b.shadow || "none", transition: "transform 0.3s, box-shadow 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>{b.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 64, flexWrap: "wrap", animation: "fadeUp 0.9s 0.7s both" }}>
          {[["6+", "CERTIFICATIONS"], ["4+", "PROJECTS BUILT"], ["3", "INDUSTRY SIMS"], ["8.09", "MCA CGPA"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 34, background: "linear-gradient(135deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
              <div style={{ color: T.muted, fontSize: 10, letterSpacing: 2, marginTop: 4, fontFamily: "'DM Sans',sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float2 2.2s ease-in-out infinite" }}>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(167,139,250,0.6),transparent)" }} />
        <div style={{ color: T.muted, fontSize: 9, letterSpacing: 3, fontFamily: "'Space Mono',monospace" }}>SCROLL</div>
      </div>
    </section>
  );
}

/* ─── SECTION WRAPPER ────────────────────────────────────────────────────── */
function Section({ id, label, title, labelColor, lineGrad, children, T }) {
  const ref = useRef();
  const v = useInView(ref);
  return (
    <section id={id} ref={ref} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: labelColor || T.a1, letterSpacing: 4, marginBottom: 12, textTransform: "uppercase" }}>{label}</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(30px,5vw,50px)", color: T.text, lineHeight: 1.1 }}>{title}</h2>
        <div style={{ width: 56, height: 3, background: lineGrad || "linear-gradient(90deg,#a78bfa,#38bdf8)", borderRadius: 4, marginTop: 14 }} />
      </div>
      {children}
    </section>
  );
}

/* ─── TILT CARD ──────────────────────────────────────────────────────────── */
function TCard({ children, style, onClick }) {
  const ref = useRef();
  useTilt(ref);
  return <div ref={ref} style={{ transition: "transform 0.15s ease", willChange: "transform", ...style }} onClick={onClick}>{children}</div>;
}

/* ─── JOURNEY ────────────────────────────────────────────────────────────── */
function Journey({ T }) {
  return (
    <Section id="journey" label="// the story so far" title="My Journey" T={T}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${T.a1},${T.a2},transparent)`, transform: "translateX(-50%)" }} />
        {JOURNEY.map((item, i) => {
          const c = TYPE_C[item.type];
          return (
            <div key={i} style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-end" : "flex-start", marginBottom: 24, paddingRight: i % 2 === 0 ? "calc(50% + 28px)" : 0, paddingLeft: i % 2 === 0 ? 0 : "calc(50% + 28px)", position: "relative" }}>
              <div style={{ position: "absolute", left: "50%", top: 18, width: 13, height: 13, borderRadius: "50%", background: c, transform: "translateX(-50%)", boxShadow: `0 0 12px ${c}` }} />
              <TCard style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "14px 18px", maxWidth: 310, width: "100%", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ color: c, fontSize: 9, border: `1px solid ${c}50`, borderRadius: 10, padding: "2px 7px", fontFamily: "'Space Mono',monospace", letterSpacing: 1 }}>{TYPE_L[item.type]}</span>
                </div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: T.muted, marginBottom: 4 }}>{item.year}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: c, marginBottom: 3 }}>{item.org}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{item.detail}</div>
              </TCard>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────────────────── */
function Projects({ T }) {
  const [active, setActive] = useState(null);
  return (
    <Section id="projects" label="// things I've built" title="Projects" T={T}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
        {PROJECTS.map((p, i) => (
          <TCard key={i} onClick={() => setActive(active === i ? null : i)}
            style={{ background: T.card, border: `1px solid ${active === i ? p.color : T.border}`, borderRadius: 20, padding: 26, cursor: "pointer", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden", boxShadow: active === i ? `0 0 28px ${p.color}25` : "none", transition: "border-color 0.3s, box-shadow 0.3s" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.color},transparent)` }} />
            <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: T.text, marginBottom: 4 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: p.color, marginBottom: 12 }}>{p.sub}</div>
            <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {p.tech.map(t => <span key={t} style={{ background: `${p.color}18`, border: `1px solid ${p.color}40`, color: p.color, fontSize: 10, padding: "3px 9px", borderRadius: 10, fontFamily: "'Space Mono',monospace" }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, color: T.muted, fontFamily: "'Space Mono',monospace" }}>{p.period}</span>
              <span style={{ fontSize: 11, color: T.muted }}>{p.type}</span>
            </div>
            {active === i && (
              <div style={{ marginTop: 14, padding: "12px 0 0", borderTop: `1px solid ${T.border}`, animation: "fadeUp 0.3s ease" }}>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 8, fontFamily: "'Space Mono',monospace" }}>KEY HIGHLIGHTS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.highlights.map(h => <span key={h} style={{ background: `${p.color}20`, color: p.color, fontSize: 11, padding: "4px 10px", borderRadius: 8 }}>✓ {h}</span>)}
                </div>
              </div>
            )}
          </TCard>
        ))}
      </div>
    </Section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────────────────── */
function Skills({ T }) {
  const ref = useRef();
  const v = useInView(ref);
  const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(SKILLS.map(s => s.cat))];
  const filtered = cat === "All" ? SKILLS : SKILLS.filter(s => s.cat === cat);
  return (
    <section id="skills" ref={ref} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: T.a2, letterSpacing: 4, marginBottom: 12 }}>// TECHNICAL ARSENAL</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(30px,5vw,50px)", color: T.text }}>Skills & Stack</h2>
        <div style={{ width: 56, height: 3, background: "linear-gradient(90deg,#38bdf8,#a78bfa)", borderRadius: 4, marginTop: 14, marginBottom: 40 }} />
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ background: cat === c ? "linear-gradient(135deg,#a78bfa,#38bdf8)" : T.card, border: `1px solid ${cat === c ? "transparent" : T.border}`, color: cat === c ? "#fff" : T.muted, padding: "8px 20px", borderRadius: 20, fontSize: 12, fontFamily: "'DM Sans',sans-serif", transition: "all 0.3s" }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
        {filtered.map((s, i) => (
          <div key={s.name} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "17px 18px", backdropFilter: "blur(10px)", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.5s ${i * 0.04}s, transform 0.5s ${i * 0.04}s` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, color: T.text }}>{s.name}</span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: T.a1 }}>{s.level}%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: v ? `${s.level}%` : "0%", background: CAT_GRAD[s.cat] || "linear-gradient(90deg,#a78bfa,#38bdf8)", borderRadius: 4, transition: `width 1.2s ${i * 0.05}s cubic-bezier(0.16,1,0.3,1)` }} />
            </div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 6, fontFamily: "'Space Mono',monospace" }}>{s.cat}</div>
          </div>
        ))}
      </div>
      {/* Tech cloud */}
      <div style={{ marginTop: 52, padding: "36px 32px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 22, backdropFilter: "blur(10px)", textAlign: "center" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: T.muted, letterSpacing: 3, marginBottom: 20 }}>FULL TECH STACK</div>
        <div>{TECH.map((t, i) => {
          const c = TC[i % TC.length];
          return (
            <span key={t} style={{ display: "inline-block", margin: 4, background: `${c}14`, border: `1px solid ${c}30`, color: c, fontSize: 12, padding: "6px 14px", borderRadius: 20, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${c}26`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${c}14`; e.currentTarget.style.transform = ""; }}>{t}</span>
          );
        })}</div>
      </div>
    </section>
  );
}

/* ─── CLOUD SECTION ──────────────────────────────────────────────────────── */
function CloudSection({ T }) {
  return (
    <div style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: T.card, border: `1px solid ${T.border}`, borderRadius: 26, padding: "52px 40px", backdropFilter: "blur(20px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {["☁️", "⛅", "🌤️", "☁️", "🌥️", "⛅"].map((e, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 28 + (i % 3) * 8, opacity: 0.12, top: `${15 + (i % 3) * 25}%`, left: `${i * 17}%`, animation: `${i % 2 === 0 ? "float1" : "float2"} ${7 + i * 1.3}s ease-in-out infinite`, animationDelay: `${i * 0.6}s`, pointerEvents: "none" }}>{e}</div>
        ))}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>☁️</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, color: T.text, marginBottom: 14 }}>Cloud & AI Explorer</h3>
          <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.75, maxWidth: 500, margin: "0 auto 28px" }}>3 AWS certifications including the brand-new <strong style={{ color: "#FF9900" }}>AWS AI & ML Learning Plan</strong> (May 13, 2026). Building cloud-native solutions and exploring artificial intelligence.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[["☁️ AWS Cloud Practitioner", "#FF9900"], ["🌟 AWS AI & ML Learning Plan", "#FF9900"], ["🧬 AWS ML Basics", "#FF9900"], ["🧠 IBM AI Fundamentals", "#4d8fff"], ["🏗️ IBM Cloud Computing", "#4d8fff"]].map(([l, c]) => (
              <span key={l} style={{ background: `${c}14`, border: `1px solid ${c}38`, color: c, fontSize: 12, padding: "7px 16px", borderRadius: 20, fontFamily: "'DM Sans',sans-serif" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CERTIFICATIONS ─────────────────────────────────────────────────────── */
function Certifications({ T }) {
  const [sel, setSel] = useState(null);
  return (
    <Section id="certifications" label="// credentials & achievements" title="Certifications" labelColor={T.a3} lineGrad={`linear-gradient(90deg,${T.a3},${T.a1})`} T={T}>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: T.a3, letterSpacing: 3, marginBottom: 18 }}>INDUSTRY SIMULATIONS · FORAGE</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 16, marginBottom: 48 }}>
        {SIMS.map((s, i) => (
          <TCard key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22, backdropFilter: "blur(10px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: T.text }}>{s.company}</div>
                <div style={{ fontSize: 11, color: T.a2 }}>{s.role}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.65, marginBottom: 8 }}>{s.desc}</div>
            <div style={{ fontSize: 10, color: T.muted, fontFamily: "'Space Mono',monospace" }}>{s.date}</div>
          </TCard>
        ))}
      </div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: T.a1, letterSpacing: 3, marginBottom: 18 }}>CERTIFICATIONS</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 18 }}>
        {CERTS.map((c, i) => (
          <div key={i} onClick={() => setSel(sel === i ? null : i)}
            style={{ background: T.card, border: `1px solid ${sel === i ? c.color : T.border}`, borderRadius: 18, padding: 22, cursor: "pointer", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden", boxShadow: sel === i ? `0 0 28px ${c.color}28` : "none", transition: "all 0.3s" }}
            onMouseEnter={e => { if (sel !== i) { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = `0 0 18px ${c.color}18`; } }}
            onMouseLeave={e => { if (sel !== i) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; } }}>
            {c.isNew && <div style={{ position: "absolute", top: 12, right: 12, background: "linear-gradient(135deg,#f472b6,#a78bfa)", color: "#fff", fontSize: 9, padding: "3px 8px", borderRadius: 10, letterSpacing: 1, fontFamily: "'Space Mono',monospace" }}>🆕 NEW</div>}
            <div style={{ fontSize: 30, marginBottom: 12 }}>{c.badge}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: T.text, marginBottom: 5 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: c.color, marginBottom: 4 }}>{c.org}</div>
            <div style={{ fontSize: 11, color: T.muted, fontFamily: "'Space Mono',monospace" }}>{c.date}</div>
            {sel === i && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}`, display: "flex", flexWrap: "wrap", gap: 6, animation: "fadeUp 0.3s ease" }}>
                {c.skills.map(s => <span key={s} style={{ background: `${c.color}18`, color: c.color, fontSize: 10, padding: "3px 8px", borderRadius: 8 }}>{s}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────────────── */
function Contact({ T }) {
  const ref = useRef();
  const v = useInView(ref);
  return (
    <section id="contact" ref={ref} style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: "all 0.85s" }}>
      <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,0.07),rgba(56,189,248,0.07))", border: `1px solid ${T.border}`, borderRadius: 26, padding: "60px 40px", textAlign: "center", backdropFilter: "blur(20px)" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: T.a1, letterSpacing: 4, marginBottom: 16 }}>// LET'S CONNECT</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,5vw,44px)", color: T.text, marginBottom: 16 }}>Open to Opportunities</h2>
        <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.75, maxWidth: 460, margin: "0 auto 40px" }}>Looking for Software Engineering, Java Developer, or Cloud Computing roles as a fresher. Let's build something amazing!</p>
        <div style={{ marginBottom: 32 }}>
          <a href="mailto:anushka99shinde@gmail.com"
            style={{ background: "linear-gradient(135deg,#a78bfa,#38bdf8)", color: "#fff", padding: "14px 36px", borderRadius: 50, fontSize: 14, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, boxShadow: "0 0 30px rgba(167,139,250,0.4)", display: "inline-block" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>📧 Email Me</a>
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {[["LinkedIn ↗", "https://linkedin.com/in/anushka-shinde-69a93a316", "#0a66c2"], ["GitHub ↗", "https://github.com/Anushka9904", T.a1], ["DEV.to ↗", "https://dev.to/anushka_shinde_99", T.a2]].map(([l, h, c]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer"
              style={{ color: T.muted, fontSize: 13, textDecoration: "none", border: `1px solid ${T.border}`, padding: "10px 22px", borderRadius: 30, fontFamily: "'DM Sans',sans-serif", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.color = c; e.currentTarget.style.borderColor = c; }} onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border; }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ color: T.muted, fontSize: 13 }}>📱 +91 7841950019</div>
          <div style={{ color: T.muted, fontSize: 13 }}>📍 Nashik, Maharashtra</div>
        </div>
      </div>
    </section>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const T = dark ? DARK : LIGHT;

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ background: T.bg, color: T.text, minHeight: "100vh", transition: "background 0.4s, color 0.4s", fontFamily: "'DM Sans',sans-serif" }}>
        {loading && <Loader onDone={() => setLoading(false)} />}
        {!loading && (
          <>
            <Cursor />
            <Particles dark={dark} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <Nav T={T} dark={dark} setDark={setDark} />
              <Hero T={T} />
              <Journey T={T} />
              <Projects T={T} />
              <Skills T={T} />
              <CloudSection T={T} />
              <Certifications T={T} />
              <Contact T={T} />
              <footer style={{ textAlign: "center", padding: "28px", borderTop: `1px solid ${T.border}`, color: T.muted, fontSize: 12, fontFamily: "'Space Mono',monospace" }}>
                Designed & Built by <span style={{ color: T.a1 }}>Anushka Shinde</span> · 2026
              </footer>
            </div>
          </>
        )}
      </div>
    </>
  );
}
