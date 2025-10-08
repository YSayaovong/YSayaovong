/* ====== Config ====== */
const GITHUB_USER = "YSayaovong";

/* ====== DOM Elements ====== */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const grid = document.getElementById("project-grid");
const empty = document.getElementById("empty");

/* ====== Frontend Repo Filter ====== */
const FRONTEND_KEYWORDS = [
  "react","tailwind","vite","next","astro","ui","component","design",
  "css","scss","sass","html","dom","chart","dashboard","animation",
  "frontend","front-end","web","site","landing"
];

function isFrontendRepo(repo) {
  const name = (repo.name || "").toLowerCase();
  const desc = (repo.description || "").toLowerCase();
  const lang = (repo.language || "").toLowerCase();

  const keywordMatch = FRONTEND_KEYWORDS.some(
    k => name.includes(k) || desc.includes(k)
  );

  const webLang = ["javascript","typescript","html","css"].includes(lang);

  return !repo.fork && (keywordMatch || webLang);
}

/* ====== Fetch & Render ====== */
fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
  .then(r => r.json())
  .then(repos => {
    const fe = repos.filter(isFrontendRepo);

    if (!fe.length) {
      empty.hidden = false;
      return;
    }

    fe.forEach(r => {
      const card = document.createElement("article");
      card.className = "card show";
      card.innerHTML = `
        <h3>${r.name}</h3>
        <p>${r.description || "Frontend project"}</p>
        <div class="meta">
          <span>⭐ ${r.stargazers_count}</span>
          <span>📦 ${r.language || "N/A"}</span>
          <span>🕒 Updated ${new Date(r.updated_at).toLocaleDateString()}</span>
        </div>
        <p style="margin-top:.6rem">
          <a href="${r.html_url}" target="_blank" rel="noopener">View on GitHub →</a>
        </p>
      `;
      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.error("GitHub API error:", err);
    empty.hidden = false;
    empty.textContent = "Error loading projects.";
  });