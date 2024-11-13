# Profile Summary

class Profile:
    def __init__(self):
        self.title = "Machine Learning / Data Engineer"
        self.contact_info = {
            "phone": "414-739-1246",
            "location": "Milwaukee, WI (Open to Relocation)",
            "email": "YSayaovong@gmail.com",
            "linkedin": "https://linkedin.com/in/ysayaovong",
            "github": "https://github.com/YSayaovong",
            "portfolio": "https://ysayaovong.github.io/Portfolio/index.html"
        }
        self.summary = (
            "Data Engineer with hands-on experience from a current internship, specializing in Python, SQL, "
            "and data visualization. Skilled in analyzing complex datasets, automating data workflows, and generating "
            "actionable insights to support business decision-making. Proficient in data warehousing, ETL processes, "
            "and creating interactive dashboards that drive strategic growth. Actively seeking a machine learning or "
            "data engineer position to utilize my analytical skills and contribute to meaningful data-driven solutions."
        )

# Career Highlights

class Experience:
    def __init__(self):
        self.positions = [
            {
                "title": "Data Engineer Intern",
                "company": "Refonte Infini – Remote",
                "duration": "11/2024 – Present",
                "responsibilities": [
                    "Cleaned and preprocessed data by addressing missing values, removing duplicates, and encoding "
                    "categorical data, ensuring data accuracy and completeness for modeling and analysis.",
                    "Performed exploratory data analysis (EDA) using seaborn and matplotlib to visualize distributions, "
                    "correlations, and insights related to survival rates by passenger characteristics.",
                    "Engineered new features to enhance model performance, carefully selecting relevant variables that "
                    "significantly impacted prediction accuracy.",
                    "Developed a predictive model using a Random Forest Classifier in scikit-learn, leveraging ensemble "
                    "learning for improved robustness and classification accuracy.",
                    "Evaluated model performance and reliability through metrics such as the confusion matrix and classification "
                    "report, ensuring the model’s effectiveness and precision.",
                    "Identified key features influencing survival, providing insights into critical factors like age, fare, and passenger "
                    "class that impacted survival rates.",
                    "Optimized model parameters with hyperparameter tuning to achieve improved accuracy and balanced "
                    "performance across evaluation metrics.",
                    "Documented the analysis process and results in Jupyter Notebook, establishing a clear and reproducible "
                    "workflow for future enhancements."
                ]
            },
            {
                "title": "Mechanical Designer",
                "company": "Prolec-GE Waukesha – Waukesha, WI",
                "duration": "10/2020 – Present",
                "responsibilities": [
                    "Designed transformers and nameplates, ensuring compliance with industry standards using CREO 8.0.",
                    "Led process optimization initiatives, reducing errors and improving design efficiency by 10%.",
                    "Mentored 6 detailers, providing guidance to improve overall team performance.",
                    "Worked cross-functionally to ensure timely and high-quality project delivery.",
                    "Facilitated production and training sessions to enhance team knowledge and ensure efficient operational workflows.",
                    "Developed an Excel-based dashboard to track project metrics, including error rates and completion percentages, for "
                    "transformer detailing and nameplate drafting.",
                    "Created automated visualizations (line and pie charts) to analyze error trends over time, improving personal "
                    "workflow and quality control.",
                    "Enhanced efficiency by implementing data-driven self-monitoring, reducing manual tracking time and proactively "
                    "addressing recurring errors.",
                    "Managed financial records, budgeting, and payroll to ensure compliance with financial regulations."
                ]
            }
        ]

# Education

class Education:
    def __init__(self):
        self.degrees = [
            {"degree": "B.S., Information Technology; Minor in Music", "institution": "Arizona State University", "completion": "5/2025"},
            {"degree": "A.I. & Machine Learning Engineer Career Path", "institution": "Zero to Mastery", "completion": "5/2025"},
            {"degree": "A.S. in Mechanical Design Technology", "institution": "Milwaukee Area Technical College", "completion": "5/2021"}
        ]

# Technical Skills

class TechnicalProficiencies:
    def __init__(self):
        self.languages = {
            "Python": "Advanced - Object-oriented programming, data structures, algorithms, backend development (Flask, Django), process automation",
            "JavaScript": "Backend services, asynchronous operations, event-driven architecture",
            "C++": "Basic",
            "C#": "Basic",
            "Java": "Basic"
        }
        self.machine_learning = [
            "Scikit-learn, Pandas: Building, training, and tuning ML models; efficient data manipulation and preparation",
            "Feature Engineering & EDA: Proficient in feature engineering and exploratory data analysis to uncover patterns and insights",
            "NLP: Text preprocessing and sentiment analysis for insights from unstructured data sources"
        ]
        self.data_engineering = [
            "Apache Kafka, Spark, Hadoop: Building scalable, high-performance data pipelines, distributed processing",
            "ETL & Data Warehousing: Constructing pipelines ensuring data quality and accessibility; designing warehouses for business intelligence"
        ]
        self.cloud_devops = [
            "AWS (EC2, S3, Lambda): Scalable infrastructure, production deployment, serverless computing",
            "Azure Synapse: Unified analytics for large-scale data exploration",
            "CI/CD & Containers: Docker, Jenkins, GitHub Actions for automated builds, testing, and deployment"
        ]
        self.database = ["PostgreSQL, SQL, NoSQL (MongoDB, Couchbase): Complex queries, relational and NoSQL databases, ETL for large workflows"]

# Projects

class Projects:
    def __init__(self):
        self.projects = [
            {
                "title": "Predictive Analysis and Data Insights on the Titanic Dataset",
                "date": "November 2024",
                "description": [
                    "Conducted a comprehensive analysis of the Titanic dataset to uncover factors influencing passenger survival.",
                    "Data Preprocessing: Addressed missing values, removed irrelevant columns, and prepared the dataset for analysis.",
                    "EDA: Utilized Seaborn, Matplotlib to visualize survival trends across variables such as class and age.",
                    "Feature Engineering: Selected and prepared key features for optimal model training.",
                    "Machine Learning Model: Developed a Random Forest Classifier, evaluated with confusion matrix and classification report."
                ],
                "key_skills": ["Python, Data Analysis, Machine Learning, Data Visualization, EDA, scikit-learn, pandas, Seaborn, Matplotlib"],
                "repository": "https://github.com/YSayaovong/Titanic-Dataset-Analysis"
            },
            {
                "title": "NBA Game Performance Analytics",
                "date": "November 2024",
                "description": [
                    "Analyzed NBA team performance data for the 2022-23 season, identifying top 10 teams by average points scored per game.",
                    "Data Retrieval: Retrieved NBA game data for the 2022-23 season using nba_api library.",
                    "Data Filtering: Filtered the dataset to retain relevant game data, ensuring accuracy by excluding non-official games.",
                    "Data Analysis: Calculated average points scored per game for each team, highlighting key trends.",
                    "Data Visualization: Developed bar chart using Matplotlib and Seaborn for a comparative view of team performances."
                ],
                "key_skills": ["Python, Data Analysis, Data Visualization, nba_api, Pandas, Matplotlib, Seaborn"],
                "repository": "https://github.com/YSayaovong/NBA-Game-Performance-Analytics"
            }
        ]
