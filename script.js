// ------ CONFIG (edit these) ------
const LINKS = {
  resume: "https://github.com/YSayaovong/YSayaovong/blob/main/resume/Yengkong.Sayaovong.Resume.pdf",
  linkedin: "https://www.linkedin.com/in/ysayaovong" // <- replace if different
};

// Project catalog (edit/extend as your repos go live)
const PROJECTS = [
  // Data Analyst
  {
    area: "analyst",
    title: "NFL Player Performance Dashboard",
    blurb:
      "Player efficiency, consistency trends, and red zone usage with SQL + dashboarding.",
    tags: ["NFL", "SQL", "Dashboard", "KPIs"],
    github: "#",
    live: "#"
  },
  {
    area: "analyst",
    title: "NBA Shot Analytics",
    blurb:
      "Zone-based shooting efficiency (corner 3, mid-range, restricted area) with Python + SQL.",
    tags: ["NBA", "Python", "PostgreSQL", "Visualization"],
    github: "#",
    live: "#"
  },
  {
    area: "analyst",
    title: "MLB Pitching Analytics",
    blurb:
      "Velocity trends, K%, WHIP, and role tiers (Ace/Reliever/Closer).",
    tags: ["MLB", "KPIs", "SQL", "Dashboard"],
    github: "#",
    live: "#"
  },

  // Data Engineer
  {
    area: "engineer",
    title: "Sports Data Lake ETL",
    blurb:
      "API ingestion → S3/PostgreSQL → transformations → scheduled orchestration.",
    tags: ["ETL", "Airflow", "Python", "PostgreSQL"],
    github: "#",
    live: "#"
  },
  {
    area: "engineer",
    title: "Real-Time Game Stats Streaming",
    blurb:
      "Simulated Kafka stream into Spark with a live win-probability view.",
    tags: ["Kafka", "Spark", "Streaming"],
    github: "#",
    live: "#"
  },
  {
    area: "engineer",
    title: "Historical Sports Archive",
    blurb:
      "Unified schema across NFL/NBA/MLB seasons for downstream analytics.",
    tags: ["Batch", "Data Modeling", "DBT (optional)"],
    github: "#",
    live: "#"
  },

  // Scout / GM
  {
    area: "scout",
    title: "NFL Draft Prospect Evaluator",
    blurb:
      "College stats + combine metrics with weighted scoring and risk flags.",
    tags: ["NFL", "Scouting", "Modeling"],
    github: "#",
    live: "#"
  },
  {
    area: "scout",
    title: "NBA Roster Optimization",
    blurb:
      "Cap constraints, position needs, and wins added per $1M analysis.",
    tags: ["NBA", "Optimization", "Cap"],
    github: "#",
    live: "#"
  },
  {
    area: "scout",
    title: "MLB Farm System Tracker",
    blurb:
      "Prospect promotion timelines vs league benchmarks and ROI.",
    tags: ["MLB", "Prospects", "Forecasting"],
    github: "#",
    live: "#"
  }
];

// Optional quick chips for filtering
const CHIPS = ["NFL", "NBA", "MLB", "SQL", "Python", "ETL", "Dashboard", "Scouting"];

// ------ RUNTIME ------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function setLinks(){
  const resumeA = $("#resumeLink");
  const linkedinA = $("#linkedinLink");
  const linkedinFoot = $("#linkedinLinkFoot");
  if(resumeA) { resumeA.href = LINKS.resume; }
  if(linkedinA) { linkedinA.href = LINKS.linkedin; }
  if(linkedinFoot) { linkedinFoot.href = LINKS.linkedin; }
  $("#year").textContent = new Date().getFullYear();
}

function chipTemplate(label){
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = label;
  span.addEventListener("click", () => {
    span.classList.toggle("active");
    renderAll();
  });
  return span;
}

function cardTemplate(p){
  const card = document.createElement("article");
  card.className = "card";
  const title = document.createElement("h4");
  title.textContent = p.title;

  const meta = document.createElement("div");
  meta.className = "meta";
  p.tags.forEach(t=>{
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = t;
    meta.appendChild(b);
  });

  const blurb = document.createElement("p");
  blurb.textContent = p.blurb;

  const actions = document.createElement("div");
  actions.className = "actions";
  const g = document.createElement("a");
  g.className = "action";
  g.href = p.github || "#";
  g.target = "_blank"; g.rel = "noopener";
  g.textContent = "GitHub";
  const l = document.createElement("a");
  l.className = "action primary";
  l.href = p.live || "#";
  l.target = "_blank"; l.rel = "noopener";
  l.textContent = "Live Demo";
  actions.appendChild(g); actions.appendChild(l);

  card.appendChild(title);
  card.appendChild(meta);
  card.appendChild(blurb);
  card.appendChild(actions);
  return card;
}

function filterCollection(area){
  const query = $("#searchInput").value.trim().toLowerCase();
  const activeChips = [...$$("#chipBar .chip.active")].map(c=>c.textContent.toLowerCase());

  return PROJECTS
    .filter(p => p.area === area)
    .filter(p => {
      const hay = (p.title + " " + p.blurb + " " + p.tags.join(" ")).toLowerCase();
      const matchesText = !query || hay.includes(query);
      const matchesChips = activeChips.length === 0 || activeChips.every(ch => hay.includes(ch));
      return matchesText && matchesChips;
    });
}

function renderGrid(area, gridId){
  const grid = $(gridId);
  grid.innerHTML = "";
  filterCollection(area).forEach(p => grid.appendChild(cardTemplate(p)));
}

function renderChipBar(){
  const bar = $("#chipBar");
  bar.innerHTML = "";
  CHIPS.forEach(c => bar.appendChild(chipTemplate(c)));
}

function renderAll(){
  renderGrid("analyst", "#analystGrid");
  renderGrid("engineer", "#engineerGrid");
  renderGrid("scout", "#scoutGrid");
}

// Initialize
document.addEventListener("DOMContentLoaded", ()=>{
  setLinks();
  renderChipBar();
  renderAll();
  $("#searchInput").addEventListener("input", renderAll);
});
