const GITHUB_USER = "YSayaovong";
const KEYWORDS = ["nba", "nfl", "mlb", "sport", "analytics"]; // keywords to match

async function fetchRepos() {
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("GitHub API error", res.status);
    return [];
  }
  const repos = await res.json();
  // filter public repos about sports
  return repos.filter(r => {
    if (r.private) return false;
    const hay = (r.name + " " + (r.description || "")).toLowerCase();
    return KEYWORDS.some(k => hay.includes(k));
  });
}

function projectCard(repo) {
  const el = document.createElement("article");
  el.className = "card";
  const head = document.createElement("div");
  head.className = "card-header";
  head.innerHTML = `
    <h4>${repo.name.replace(/-/g," ")}</h4>
    <p class="sub">${repo.description || "Sports analytics project"}</p>
  `;
  const body = document.createElement("div");
  body.className = "card-body";
  const blurb = document.createElement("p");
  blurb.textContent = repo.description || "Sports-focused analysis project.";
  body.appendChild(blurb);
  const foot = document.createElement("div");
  foot.className = "card-footer";
  const g = document.createElement("a");
  g.className = "action";
  g.href = repo.html_url; g.target="_blank";
  g.textContent = "GitHub Repo";
  foot.appendChild(g);
  el.appendChild(head);
  el.appendChild(body);
  el.appendChild(foot);
  return el;
}

async function renderProjects() {
  const grid = document.querySelector("#projectGrid");
  grid.innerHTML = "<p>Loading sports projects…</p>";
  const repos = await fetchRepos();
  grid.innerHTML = "";
  if (repos.length === 0) {
    grid.innerHTML = "<p>No public sports repos found.</p>";
    return;
  }
  repos.forEach(r => grid.appendChild(projectCard(r)));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#linkedinLink,#linkedinLink2,#linkedinLink3").forEach(a=>{
    a.href="https://www.linkedin.com/in/yengkongsayaovong";
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
  renderProjects();
});
