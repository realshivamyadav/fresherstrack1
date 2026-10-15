# PlacementHub | Central Campus Placement & Career Portal

A modern, high-performance web platform designed specifically for college and university campus placements, featuring automated eligibility audits, multi-tiered drive management, and real-time corporate recruitment synchronization.

---

## 🌐 Live Development Server
- **URL:** [http://localhost:3000/](http://localhost:3000/)
- Built with **React 18**, **Vite 5**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🏛️ System Architecture

| Module | Campus Placement Feature | Implementation Details |
| :--- | :--- | :--- |
| **Hero Search Bar** | 3-input segmented search (Role/Skill, Batch Experience, Location) | Instant filtering across on-campus drives, off-campus opportunities, and packages. |
| **Top Recruiters** | Recruiter carousel displaying company ratings, reviews, and active status | Direct partner companies (Google, Microsoft, TCS, Infosys, Cognizant, Deloitte, Swiggy, Flipkart). |
| **Drive Tuples** | Corporate drive cards with CTC, eligibility, and skill chips | Displays *Super Dream (>15 LPA)*, *Dream*, *Day 1*, minimum CGPA cutoffs, and backlogs policy. |
| **Faceted Filter Sidebar** | Multi-category faceted checkboxes | Work mode, salary brackets (0-6, 6-10, 10-15, 15+ LPA), department, and branch eligibility (CSE, IT, ECE, EEE, Mech). |
| **Eligibility Audit** | Automated student audit modal | Verifies student's CGPA, branch, and active backlogs against company cutoffs before application. |
| **AI Placement Intelligence** | Gemini 3 Flash / 2.5 Flash integration | Resume ATS scoring, missing skill analysis, interview simulator, and 24/7 placement copilot. |

---

## 🚀 Key Features

### 1. AI Resume Match & ATS Audit (With File Upload)
- Upload resume files (**PDF**, **DOCX**, **TXT**) or paste profile summaries.
- Gemini computes an instant **ATS Match Score** (e.g., `85% Match • Strong Match`).
- Highlights **Matched Skills** vs **Missing Required Skills** for that specific recruiter.
- Generates **AI-Optimized Resume Bullets** with 1-click copy functionality.

### 2. AI Technical & HR Interview Simulator
- Simulates realistic 3-round interview boards tailored to each company (Google, Microsoft, TCS, Swiggy).
- Evaluates student answers, scores responses out of 10, and guides interview readiness.

### 3. 24/7 Campus Placement AI Copilot
- Floating smart assistant in the bottom corner.
- Answers student queries regarding cutoffs, company CTCs, interview topics, and drive schedules in real-time.

### 4. Automated Campus Eligibility Audit
- When a student opens any job, PlacementHub automatically checks their profile (*CSE, 8.64 CGPA, 0 backlogs*):
  - ✅ **CGPA Requirement:** Displays pass/fail against minimum cutoff.
  - ✅ **Branch Match:** Checks whether student's department is permitted.
  - ✅ **Backlogs Policy:** Ensures active backlog criteria is satisfied.
  - 🛡️ **Service Agreement:** Shows bond details and campus drive tier.

### 5. TPO (Training & Placement Officer) Dashboard
- Toggle **"TPO Admin Login"** in the top banner to inspect:
  - Placement rate percentage (e.g. 75.7%)
  - Average CTC (8.9 LPA) & Highest CTC (35 LPA)
  - Department-wise placement distribution bar charts
  - Upcoming on-campus drive schedule and student shortlists

### 6. Application Tracker Drawer
- Click the bookmark icon in the navbar to open the application tracking drawer.
- Tracks real-time recruitment progression:
  `Applied` ➔ `Resume Shortlisted` ➔ `Round 1 OA` ➔ `Technical Interview` ➔ `Offer Released`.

---

## 🛠️ CLI & Corporate Sync Crawler

You can also run the standalone crawler to fetch fresh corporate listings:

```bash
# Run crawler with default query (Software Engineer Fresher in Bangalore)
python crawler.py

# Or pass custom query and location
python crawler.py "data analyst fresher" "Pune"
```

The crawler fetches data, formats the output into campus-ready schema, and saves it to [`src/data/extracted_naukri.json`](file:///d:/PlacementHub/src/data/extracted_naukri.json), which is automatically loaded by the frontend.

---

## 💻 Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React
- **Crawler:** Python 3.13, httpx, requests, regex parser
- **Design System:** Enterprise Corporate Job Board Design System
