import os
from datetime import datetime
import requests
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Your accounts
GITHUB_USERNAME = "YSayaovong"
LINKEDIN_URL = "https://www.linkedin.com/in/yengkongsayaovong/"
GITHUB_API_URL = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"

# Featured repos for homepage
FEATURED_PROJECTS = [
    {
        "title": "Financial ETL Datapipeline",
        "description": "Automated data ingestion + cleaning pipeline used for BI dashboards and analytics.",
        "github_url": "https://github.com/YSayaovong/Financial-ETL-Datalake-Pipeline",
        "tags": ["Python", "SQL", "ETL"],
    },
    {
        "title": "Sales Forecasting & KPI Analysis",
        "description": "Time-series forecasting tool used to predict sales trends and monitor performance.",
        "github_url": "https://github.com/YSayaovong/Sales-Forecasting-KPI-Analysis",
        "tags": ["Python", "Forecasting", "BI"],
    },
    {
        "title": "Engineering KPI Dashboard",
        "description": "Excel + BI dashboard that monitors engineering error rates and cycle time.",
        "github_url": "https://github.com/YSayaovong/Engineering-KPI-Dashboard-in-Excel",
        "tags": ["Excel", "Analytics"],
    },
]

def fetch_github_repos():
    """Read repositories from GitHub and return sorted list."""
    try:
        res = requests.get(GITHUB_API_URL, params={"per_page": 100})
        res.raise_for_status()
    except Exception as e:
        print("GitHub API error:", e)
        return []

    repos_raw = res.json()
    repos = []

    for r in repos_raw:
        if r.get("fork"):
            continue

        updated_at = r.get("updated_at", "")
        try:
            updated_dt = datetime.fromisoformat(updated_at.replace("Z", "+00:00"))
            updated_str = updated_dt.strftime("%Y-%m-%d")
        except:
            updated_str = updated_at

        repos.append({
            "name": r["name"],
            "description": r.get("description", ""),
            "language": r.get("language", ""),
            "html_url": r["html_url"],
            "stars": r.get("stargazers_count", 0),
            "updated_at": updated_str
        })

    repos.sort(key=lambda x: x["updated_at"], reverse=True)
    return repos


@app.route("/")
def home():
    return render_template(
        "index.html",
        featured=FEATURED_PROJECTS,
        github_username=GITHUB_USERNAME,
        linkedin_url=LINKEDIN_URL
    )


@app.route("/projects")
def projects():
    repo_list = fetch_github_repos()
    return render_template(
        "projects.html",
        repos=repo_list,
        github_username=GITHUB_USERNAME,
        linkedin_url=LINKEDIN_URL
    )


@app.route("/api/projects")
def api_projects():
    return jsonify(fetch_github_repos())


if __name__ == "__main__":
    app.run(debug=True)
