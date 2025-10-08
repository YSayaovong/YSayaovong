const yearEl=document.getElementById("year");if(yearEl)yearEl.textContent=new Date().getFullYear();
const grid=document.getElementById("project-grid");const empty=document.getElementById("empty");
fetch("https://api.github.com/users/YSayaovong/repos?sort=updated&per_page=100")
.then(r=>r.json()).then(repos=>{
  const fe=repos.filter(r=>!r.fork&&(r.language==="JavaScript"||r.language==="HTML"||r.language==="CSS"||r.name.toLowerCase().includes("ui")));
  if(!fe.length){empty.hidden=false;return;}
  fe.forEach(r=>{
    const card=document.createElement("article");card.className="card";
    card.innerHTML=`<h3>${r.name}</h3><p>${r.description||""}</p>
    <p class="meta">⭐ ${r.stargazers_count} • Updated ${new Date(r.updated_at).toLocaleDateString()}</p>
    <p><a href="${r.html_url}" target="_blank">View on GitHub →</a></p>`;
    grid.appendChild(card);
  });
});