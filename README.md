# Yengkong Sayaovong — Frontend Portfolio

A single-page portfolio built for GitHub Pages. It uses **relative paths** and **case-accurate links** so it renders the same locally and on Pages.

## Deploying to GitHub Pages

1. Put these files in the **root** of the repo (same level as `README.md`):
   - `index.html`
   - `style.css`
   - `script.js`
2. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "Portfolio: stable Pages setup"
   git push
   ```
3. In GitHub → **Settings** → **Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/root`
4. Your site will be available at:
   `https://ysayaovong.github.io/YSayaovong/`

## Why this works on Pages

- All links to images use `?raw=1` so GitHub serves the actual file bytes.
- No leading `/` in paths; everything is relative to the current repo.
- Filenames are referenced with exact case to avoid 404s on Pages.

## Customize

- Replace project descriptions as needed.
- To use **local images** instead of hotlinks, add an `images/` folder and point `<img src="./images/your-file.png">` at it. Keep filenames lowercase-hyphenated.
