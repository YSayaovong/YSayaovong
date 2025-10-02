// --------- SETTINGS ---------
const GITHUB_USER = "YSayaovong";
const SPORTS_KEYWORDS = ["nba", "nfl", "mlb", "football", "basketball", "baseball"]; // strict by NAME
const EXCLUDE_NAME_CONTAINS = ["worship"]; // ensure the worship repo never shows

const LINKS = {
  linkedin: "https://www.linkedin.com/in/yengkongsayaovong",
  email: "mailto:ysayaovong@gmail.com"
};

// --------- HELPERS ---------
const $ = (s) => document.querySelector(s);

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch { return iso; }
}

function projectCard(repo) {
  const el = document.createElement("article");
  el.className = "card";

  // header
  const head = document.createElement("div");
  head.className = "card-header";
  head.innerHTML = `
    <h4>${repo.name.replace(/-/g," ")}</h4>
    <p class="sub">${repo.description ? repo.description : "Sports analytics project"}</p>
  `;

  // body
  const body = document.createElement("div");
  body.className = "card-body";
  const blurb = document.createElement("p");
  const lang = repo.language ? ` · ${repo.language}` : "";
  blurb.textContent = `Last updated ${formatDate(repo.updated_at)}${lang}. ⭐ ${repo.stargazers_count}`;
  body.appendChild(blurb);

  // footer
  const foot = document.createElement("div");
  foot.className = "card-footer";

  const g = document.createElement("a");
  g.className = "action";
  g.href = repo.html_url;
  g.target = "_blank"; g.rel = "noopener";
  g.textContent = "GitHub Repo";
  foot.appendChild(g);

  const hasHomepage = repo.homepage && repo.homepage.trim() !== "";
  const l = document.createElement("a");
  l.className = "action primary";
  if (hasHomepage) {
    l.href = repo.homepage;
    l.target = "_blank"; l.rel = "noopener";
    l.textContent = "Live Demo";
  } else {
    l.textContent = "Live Demo";
    l.setAttribute("disabled","true");
  }
  foot.appendChild(l);

  el.appendChild(head);
  el.appendChild(body);
  el.appendChild(foot);
  return el;
}

// --------- DATA FETCH ---------
async function fetchRepos() {
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("GitHub API error", res.status);
    return [];
  }
  const repos = await res.json();

  // strict filter by NAME only, exclude worship by name,
  // and keep only PUBLIC repos
  return repos.filter(r => {
    if (r.private) return false;
    const name = (r.name || "").toLowerCase();
    if (EXCLUDE_NAME_CONTAINS.some(x => name.includes(x))) return false;
    return SPORTS_KEYWORDS.some(k => name.includes(k));
  });
}

// --------- RENDER ---------
async function renderProjects() {
  const grid = $("#projectGrid");
  grid.innerHTML = "<p>Loading sports projects…</p>";
  try {
    const repos = await fetchRepos();
    grid.innerHTML = "";
    if (repos.length === 0) {
      grid.innerHTML = "<p>No public sports repos found. Add NBA/NFL/MLB in repo names to include them automatically.</p>";
      return;
    }
    // Sort by recent update
    repos.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    repos.forEach(r => grid.appendChild(projectCard(r)));
  } catch (e) {
    console.error(e);
    grid.innerHTML = "<p>Could not load projects from GitHub.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Links & year
  ["linkedinLink","linkedinLink2","linkedinLink3"].forEach(id=>{
    const a = document.getElementById(id);
    if (a) a.href = LINKS.linkedin;
  });
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Render projects
  renderProjects();
});
