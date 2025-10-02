// Contact + social
const LINKS = {
  email: "mailto:ysayaovong@gmail.com",
  linkedin: "https://www.linkedin.com/in/yengkongsayaovong"
};

// Only the three projects requested
const PROJECTS = [
  {
    title: "Worship Analytics Dashboard — Song Usage & KPI Tracking",
    subtitle: "Ministry analytics with attendance, engagement, and song rotation KPIs.",
    tags: ["Excel", "Dashboard", "KPI", "Operations"],
    metrics: [
      { label: "Reporting time", value: "↓ 40%", hint: "Streamlined CCLI reporting" },
      { label: "Setlist balance", value: "↑ Consistency", hint: "Rotation & top-10 tracking" }
    ],
    blurb:
      "Tracks song usage trends, setlist rotation, and reporting readiness. Designed for clear weekly review and annual rollups.",
    github: "https://github.com/YSayaovong/Worship-Analytics-Dashboard-Song-Usage-Trends-KPI-Tracking",
    live: "https://ysayaovong.github.io/Worship-Analytics-Dashboard-Song-Usage-Trends-KPI-Tracking/"
  },
  {
    title: "NBA Game Performance Analytics",
    subtitle: "Game-level insights: pace, efficiency, shot profile, and matchup notes.",
    tags: ["NBA", "SQL", "Python", "Visualization"],
    metrics: [
      { label: "Shot profile", value: "Zone %", hint: "Rim / Mid / 3PT splits" },
      { label: "Impact", value: "Per-game KPIs", hint: "PACE, ORtg/DRtg, REB%" }
    ],
    blurb:
      "Analyzes game logs to surface patterns in pace and efficiency. Includes reproducible SQL/Python and visuals.",
    github: "https://github.com/YSayaovong/NBA-Game-Performance-Analytics",
    live: "" // no live link provided
  },
  {
    title: "Real Estate Financial KPI Dashboard",
    subtitle: "Cash flow, expense ratio, and trend KPIs for a rental unit.",
    tags: ["Finance", "SQL/Excel", "Dashboard", "KPI"],
    metrics: [
      { label: "Expense ratio", value: "Tracked", hint: "Opex vs. Income" },
      { label: "Cash flow", value: "Monthly", hint: "Actuals vs target" }
    ],
    blurb:
      "Portfolio-oriented dashboard focusing on unit-level performance and predictability. Transparent metrics and assumptions.",
    github: "https://github.com/YSayaovong/real-estate-financial-kpi-dashboard",
    live: "" // no live link provided
  }
];

// --- RENDER ---
const $ = (s) => document.querySelector(s);

function projectCard(p){
  const el = document.createElement("article");
  el.className = "card";

  // header
  const head = document.createElement("div");
  head.className = "card-header";
  head.innerHTML = `
    <h4>${p.title}</h4>
    <p class="sub">${p.subtitle}</p>
  `;

  // body
  const body = document.createElement("div");
  body.className = "card-body";

  const badges = document.createElement("div");
  badges.className = "badges";
  p.tags.forEach(t=>{
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = t;
    badges.appendChild(b);
  });

  const metrics = document.createElement("div");
  metrics.className = "metrics";
  p.metrics.forEach(m=>{
    const box = document.createElement("div");
    box.className = "metric";
    box.innerHTML = `<b>${m.value}</b><span>${m.label} — ${m.hint}</span>`;
    metrics.appendChild(box);
  });

  const blurb = document.createElement("p");
  blurb.textContent = p.blurb;

  body.appendChild(badges);
  body.appendChild(metrics);
  body.appendChild(blurb);

  // footer
  const foot = document.createElement("div");
  foot.className = "card-footer";
  const g = document.createElement("a");
  g.className = "action";
  g.href = p.github; g.target = "_blank"; g.rel = "noopener";
  g.textContent = "GitHub Repo";

  foot.appendChild(g);

  if (p.live && p.live.trim() !== "") {
    const l = document.createElement("a");
    l.className = "action primary";
    l.href = p.live; l.target = "_blank"; l.rel = "noopener";
    l.textContent = "Live Demo";
    foot.appendChild(l);
  } else {
    const l = document.createElement("a");
    l.className = "action primary";
    l.textContent = "Live Demo";
    l.setAttribute("disabled","true");
    foot.appendChild(l);
  }

  el.appendChild(head);
  el.appendChild(body);
  el.appendChild(foot);
  return el;
}

function render(){
  // header links
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  ["linkedinLink","linkedinLink2","linkedinLink3"].forEach(id=>{
    const a = document.getElementById(id);
    if (a) a.href = LINKS.linkedin;
  });

  const grid = $("#projectGrid");
  grid.innerHTML = "";
  PROJECTS.forEach(p => grid.appendChild(projectCard(p)));
}

document.addEventListener("DOMContentLoaded", render);
