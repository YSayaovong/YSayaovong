// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const btn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
if (btn && links){
  btn.addEventListener("click", () => {
    const open = links.classList.toggle("show");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Render featured projects
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
    blurb: "Dashboarding pipeline for service planning, usage trends, and KPI tracking. Generalizable to operations analytics for sports orgs.",
    tags: ["Power BI","Excel","ETL"]
  },
  {
    repo: "Real-Estate-Financial-Analytics-Tool",
    title: "Real Estate Financial Analytics",
    blurb: "Deal analyzer and KPI reporting templates. Demonstrates finance translation skills for cap/contract work.",
    tags: ["Excel","Finance","Modeling"]
  },
  {
    repo: "Financial-ETL-Datalake-Pipeline",
    title: "Financial ETL & Datalake Pipeline",
    blurb: "ETL orchestration and modeling. Data engineering fundamentals supporting analytics delivery.",
    tags: ["ETL","Python","Pipelines"]
  }
];

function repoUrl(repo){ return `https://github.com/YSayaovong/${repo}`; }

function renderCard(node, item){
  const card = document.createElement("article");
  card.className = "card reveal";
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

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity = 1;
      e.target.style.transform = "translateY(0)";
      observer.unobserve(e.target);
    }
  });
},{threshold:0.1});
revealEls.forEach(el=>observer.observe(el));
