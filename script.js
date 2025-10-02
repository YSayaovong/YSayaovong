// Lightweight project renderer
const YEAR_EL = document.getElementById("year");
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

// Choose repositories to feature (sports-first, with cross-domain BI)
const FEATURED = [
  {
    repo: "NBA-Game-Performance-Analytics",
    title: "NBA Game Performance Analytics",
    blurb: "Cleaned box scores → engineered TS%, eFG%, Game Score, rolling trends. Automated top-player tables and trend charts.",
    tags: ["Python","pandas","matplotlib","EDA"]
  },
  {
    repo: "Worship-Analytics-Dashboard-Song-Usage-Trends-KPI-Tracking",
    title: "Worship Analytics Dashboard",
    blurb: "Dashboarding pipeline for service planning, usage trends, and KPI tracking. Generalizable to ops analytics.",
    tags: ["Power BI","Excel","ETL"]
  },
  {
    repo: "Real-Estate-Financial-Analytics-Tool",
    title: "Real Estate Financial Analytics",
    blurb: "Deal analyzer and KPI reporting templates. Shows finance translation skills for cap/contract work.",
    tags: ["Excel","Finance","Modeling"]
  },
  {
    repo: "Financial-ETL-Datalake-Pipeline",
    title: "Financial ETL & Datalake Pipeline",
    blurb: "ETL orchestration and modeling. Demonstrates data engineering fundamentals supporting analytics.",
    tags: ["ETL","Python","Pipelines"]
  }
];

function repoUrl(repo){ return `https://github.com/YSayaovong/${repo}`; }

function renderCard(node, item){
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.blurb}</p>
    <div class="tags">${item.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
    <p style="margin-top:.8rem"><a href="${repoUrl(item.repo)}" target="_blank" rel="noopener">View on GitHub →</a></p>
  `;
  node.appendChild(card);
}

const grid = document.getElementById("project-grid");
if (grid){ FEATURED.forEach(it => renderCard(grid, it)); }
