// Basic config
const GH_USER = "YSayaovong";
const CATEGORY_RULES = [
  { key: "data-eng", test: repo =>
      /etl|datalake|pipeline|airflow|spark|warehouse|postgres|dbt|orchestrat|ingest/i.test(repo.name + " " + (repo.description||"")) },
  { key: "analytics", test: repo =>
      /power\s?bi|dashboard|analytics|kpi|report/i.test(repo.name + " " + (repo.description||"")) },
  { key: "backend", test: repo =>
      /api|django|flask|fastapi|node|express|backend/i.test(repo.name + " " + (repo.description||"")) },
  { key: "ai-ml", test: repo =>
      /ml|machine\s?learning|model|sklearn|xgboost|nlp|transformer|llm|ai/i.test(repo.name + " " + (repo.description||"")) },
  { key: "frontend", test: repo =>
      /react|next|vite|css|html|ui|frontend|tailwind|portfolio/i.test(repo.name + " " + (repo.description||"")) },
];

const els = {
  avatar: document.getElementById("avatar"),
  projects: document.getElementById("projects-grid"),
  empty: document.getElementById("empty"),
  category: document.getElementById("category"),
  sort: document.getElementById("sort"),
  search: document.getElementById("search"),
  refreshed: document.getElementById("refreshed"),
  langBars: document.getElementById("lang-bars"),
  langNote: document.getElementById("lang-note"),
  topRepos: document.getElementById("top-repos"),
};

let allRepos = [];

async function fetchJSON(url){
  const res = await fetch(url, {headers:{'Accept':'application/vnd.github+json'}});
  if(!res.ok) throw new Error(`${res.status}: ${url}`);
  return res.json();
}

async function loadProfile(){
  const user = await fetchJSON(`https://api.github.com/users/${GH_USER}`);
  els.avatar.src = user.avatar_url;
  els.refreshed.textContent = new Date().toLocaleString();
}

async function loadRepos(){
  // Get public repos (max couple of pages)
  let page = 1, repos = [];
  while(true){
    const data = await fetchJSON(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated&page=${page}`);
    repos = repos.concat(data);
    if(data.length < 100) break;
    page++;
  }
  // Hide archived/forks from gallery by default
  allRepos = repos.filter(r => !r.archived && !r.fork);
  render();
  buildTopRepos();
  computeLanguages(repos);
}

function categoryOf(repo){
  for(const rule of CATEGORY_RULES){
    if(rule.test(repo)) return rule.key;
  }
  return "uncategorized";
}

function render(){
  const q = els.search.value.trim().toLowerCase();
  const cat = els.category.value;
  const sort = els.sort.value;

  let rows = allRepos
    .map(r => ({...r, _cat: categoryOf(r)}))
    .filter(r => (cat === "all" || r._cat === cat))
    .filter(r => !q || (r.name + " " + (r.description||"")).toLowerCase().includes(q));

  if(sort === "updated") rows.sort((a,b)=> new Date(b.pushed_at)-new Date(a.pushed_at));
  if(sort === "stars") rows.sort((a,b)=> b.stargazers_count-a.stargazers_count);
  if(sort === "name") rows.sort((a,b)=> a.name.localeCompare(b.name));

  els.projects.innerHTML = rows.map(r => repoCard(r)).join("");
  els.empty.hidden = rows.length > 0;
}

function repoCard(r){
  const desc = r.description ? r.description : "No description provided.";
  const updated = new Date(r.pushed_at).toLocaleDateString();
  const tags = [categoryLabel(r._cat), r.language].filter(Boolean);
  return `
    <article class="card">
      <div class="repo-top">
        <a class="repo-name" href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
        <span class="badge">★ ${r.stargazers_count}</span>
      </div>
      <p>${escapeHTML(desc)}</p>
      <div class="meta">
        <span>Updated: ${updated}</span>
        <span>Issues: ${r.open_issues_count}</span>
      </div>
      <div class="tags">
        ${tags.map(t=>`<span class="badge">${t}</span>`).join("")}
      </div>
    </article>
  `;
}

function categoryLabel(k){
  const map = {
    "data-eng":"Data Engineering","analytics":"Analytics / BI","backend":"Backend",
    "ai-ml":"AI / ML","frontend":"Frontend","uncategorized":"Other"
  };
  return map[k] || null;
}

function escapeHTML(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

async function computeLanguages(repos){
  // Sum bytes by language using /languages endpoint for top ~10 repos to stay light
  const top = [...repos].sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,12);
  const totals = {};
  for(const r of top){
    try{
      const data = await fetchJSON(r.languages_url);
      for(const [lang, bytes] of Object.entries(data)){
        totals[lang] = (totals[lang]||0) + bytes;
      }
    }catch{}
  }
  const sum = Object.values(totals).reduce((a,b)=>a+b,0) || 1;
  const ranked = Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,8);
  els.langBars.innerHTML = ranked.map(([lang,bytes])=>{
    const pct = Math.round(bytes/sum*100);
    return `
      <div class="lang-row">
        <div class="muted">${lang} — ${pct}%</div>
        <div class="bar" style="width:${pct}%"></div>
      </div>`;
  }).join("");
  els.langNote.textContent = "Approximation from top repositories";
}

function buildTopRepos(){
  const top = [...allRepos].sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,5);
  els.topRepos.innerHTML = top.map(r => `
    <li>
      <a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
      <span class="muted"> — ★ ${r.stargazers_count}</span>
    </li>`).join("");
}

// Events
["change","keyup"].forEach(evt=>{
  els.category.addEventListener(evt, render);
  els.sort.addEventListener(evt, render);
  els.search.addEventListener(evt, render);
});

loadProfile().then(loadRepos);
