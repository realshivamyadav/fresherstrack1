import extractedNaukriData from './extracted_naukri.json';

const BASE_JOBS = [
  {
    id: "job-nk-101",
    title: "Software Development Engineer - Campus Graduate",
    company: "Google India",
    logoText: "G",
    logoBg: "bg-red-50 text-red-600 border-red-200",
    rating: 4.5,
    reviewsCount: "14.2k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "28 - 35 LPA",
    location: "Bangalore / Hyderabad",
    workMode: "Hybrid",
    category: "Product Based",
    department: "Software Engineering",
    description: "Seeking talented 2025/2026 graduates with strong algorithms, data structures, and computer science fundamentals. Work on planet-scale distributed systems and AI platforms.",
    skills: ["Data Structures", "Algorithms", "C++", "Java", "Python", "Distributed Systems", "GCP"],
    postedDays: "Just Now",
    applicants: 384,
    source: "Campus Direct Partner",
    driveType: "Super Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 8.0,
      branches: ["CSE", "IT", "ECE", "Data Science"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "Online Coding Challenge", duration: "90 Mins", desc: "2 DSA questions (LeetCode medium/hard)" },
      { name: "Technical Round 1", duration: "45 Mins", desc: "Data structures, graph algorithms, project deep-dive" },
      { name: "Technical Round 2", duration: "45 Mins", desc: "System architecture, concurrency, OS concepts" },
      { name: "Googlyness & Leadership", duration: "30 Mins", desc: "Behavioral and situational interview" }
    ],
    naukriJobId: "310125001243",
    isExtracted: true
  },
  {
    id: "job-nk-102",
    title: "Graduate Software Engineer (TSE / Digital)",
    company: "Microsoft",
    logoText: "MS",
    logoBg: "bg-blue-50 text-blue-600 border-blue-200",
    rating: 4.4,
    reviewsCount: "12.8k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "24 - 32 LPA",
    location: "Hyderabad / Noida",
    workMode: "Hybrid",
    category: "Product Based",
    department: "Software Engineering",
    description: "Join Microsoft Azure and Copilot Core engineering team. Write high-performance microservices, learn cloud-native design, and innovate on generative AI workflows.",
    skills: ["C#", ".NET Core", "Azure", "Algorithms", "React", "TypeScript", "Microservices"],
    postedDays: "1 Day Ago",
    applicants: 295,
    source: "Campus Direct Partner",
    driveType: "Super Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 7.5,
      branches: ["CSE", "IT", "ECE", "Electrical"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "Online Assessment (Codility)", duration: "75 Mins", desc: "3 algorithmic problems" },
      { name: "Technical Interview 1", duration: "60 Mins", desc: "Trees, DP, Object Oriented Design" },
      { name: "Technical Interview 2", duration: "60 Mins", desc: "Operating systems, databases, system design" },
      { name: "AA (As Appropriate) Round", duration: "45 Mins", desc: "Director round on cultural fit and vision" }
    ],
    naukriJobId: "310125008912",
    isExtracted: true
  },
  {
    id: "job-nk-103",
    title: "System Engineer - Digital & Prime Trainee",
    company: "Tata Consultancy Services (TCS)",
    logoText: "TCS",
    logoBg: "bg-purple-50 text-purple-700 border-purple-200",
    rating: 3.9,
    reviewsCount: "82.5k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "7.2 - 9.0 LPA",
    location: "Pan India / Pune / Chennai",
    workMode: "Work from office",
    category: "IT Services",
    department: "Software Engineering",
    description: "TCS Digital and Prime cadre recruitment drive for freshers. Fast-track career path with focus on Next-Gen technologies: Generative AI, Cloud Engineering, Cyber Security, and IoT.",
    skills: ["Java", "Python", "SQL", "Cloud Basics", "Data Structures", "Spring Boot"],
    postedDays: "2 Days Ago",
    applicants: 980,
    source: "National NQT Cadre",
    driveType: "Day 1 Drive",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 6.5,
      branches: ["All Branches (B.Tech / M.Tech / MCA)"],
      maxBacklogs: 1,
      bond: "1 Year Service Agreement"
    },
    rounds: [
      { name: "TCS NQT Cognitive + Advanced Coding", duration: "120 Mins", desc: "Quant, Verbal, Reasoning, and 2 Coding questions" },
      { name: "Technical Interview", duration: "35 Mins", desc: "OOPs, DBMS, project discussion" },
      { name: "Managerial & HR Interview", duration: "25 Mins", desc: "Communication, flexibility on relocation" }
    ],
    naukriJobId: "310125003441",
    isExtracted: true
  },
  {
    id: "job-nk-104",
    title: "Specialist Programmer (Power Programmer)",
    company: "Infosys",
    logoText: "INF",
    logoBg: "bg-sky-50 text-sky-600 border-sky-200",
    rating: 4.0,
    reviewsCount: "64.1k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "9.5 - 11.5 LPA",
    location: "Bangalore / Mysore / Pune",
    workMode: "Hybrid",
    category: "IT Services",
    department: "Software Engineering",
    description: "Infosys InfyTQ / HackWithInfy Special Cadre. High-impact software development roles building enterprise-scale architectures, cloud pipelines, and distributed analytics platforms.",
    skills: ["Python", "Java", "DSA", "REST APIs", "PostgreSQL", "Docker", "Git"],
    postedDays: "Just Now",
    applicants: 420,
    source: "Campus Exclusive Drive",
    driveType: "Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 7.0,
      branches: ["CSE", "IT", "ECE", "Circuital"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "HackWithInfy Coding Qualifier", duration: "180 Mins", desc: "3 tough algorithmic challenges" },
      { name: "Technical Panel Review", duration: "45 Mins", desc: "Advanced data structures, time complexity analysis" },
      { name: "HR Discussion", duration: "20 Mins", desc: "Role expectation and location alignment" }
    ],
    naukriJobId: "310125007721",
    isExtracted: true
  },
  {
    id: "job-nk-105",
    title: "Frontend Development Engineer - React / Next.js",
    company: "Swiggy",
    logoText: "SW",
    logoBg: "bg-amber-50 text-amber-600 border-amber-200",
    rating: 4.2,
    reviewsCount: "7.1k+ reviews",
    experience: "0 - 2 Yrs",
    salary: "16 - 22 LPA",
    location: "Bangalore / Remote",
    workMode: "Remote",
    category: "Product Based",
    department: "Frontend Engineering",
    description: "Craft hyper-fast, accessible user interfaces for 50M+ active foodies & Instamart shoppers. Optimize web vital metrics and build responsive modular UI components.",
    skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Redux", "Web Performance"],
    postedDays: "3 Days Ago",
    applicants: 512,
    source: "TPO Verified Partner",
    driveType: "Super Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 7.0,
      branches: ["CSE", "IT", "ECE"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "Machine Coding Round", duration: "120 Mins", desc: "Build a responsive React application live" },
      { name: "Frontend Core Tech", duration: "60 Mins", desc: "JS closures, event loop, CSS layout, React internals" },
      { name: "Cultural Fit & Bar Raiser", duration: "45 Mins", desc: "Product intuition & owner mindset" }
    ],
    naukriJobId: "310125009015",
    isExtracted: true
  },
  {
    id: "job-nk-106",
    title: "Associate Technology Analyst - Consulting",
    company: "Deloitte USI",
    logoText: "DEL",
    logoBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rating: 4.1,
    reviewsCount: "35.9k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "8.5 - 10.5 LPA",
    location: "Hyderabad / Bangalore / Mumbai",
    workMode: "Hybrid",
    category: "Consulting",
    department: "Data & Consulting",
    description: "Deliver technology solutions across cloud ERP, SAP, cybersecurity, and enterprise analytics to Fortune 500 multinational clients worldwide.",
    skills: ["SQL", "Python", "Data Visualization", "PowerBI", "Cloud Architecture", "Agile"],
    postedDays: "4 Days Ago",
    applicants: 630,
    source: "Campus Direct Partner",
    driveType: "Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 7.0,
      branches: ["CSE", "IT", "ECE", "EEE", "Mechanical"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "Deloitte Online Versant & Aptitude", duration: "75 Mins", desc: "Logical, English, and analytical ability" },
      { name: "Case Study & Tech Discussion", duration: "40 Mins", desc: "Scenario problem-solving and database querying" },
      { name: "Partner Interview", duration: "30 Mins", desc: "Consulting aptitude and client presentation skills" }
    ],
    naukriJobId: "310125002198",
    isExtracted: true
  },
  {
    id: "job-nk-107",
    title: "GenC Next Developer - Full Stack / Cloud",
    company: "Cognizant",
    logoText: "CTS",
    logoBg: "bg-blue-50 text-blue-700 border-blue-200",
    rating: 3.9,
    reviewsCount: "58.2k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "6.75 - 8.5 LPA",
    location: "Chennai / Coimbatore / Bangalore",
    workMode: "Hybrid",
    category: "IT Services",
    department: "Software Engineering",
    description: "Cognizant GenC Next fast-track intake for high-coding aptitude freshers. Specialized roles in microservices, generative AI accelerators, and modern full-stack development.",
    skills: ["Java", "Spring Boot", "Angular", "React", "AWS", "SQL", "REST APIs"],
    postedDays: "Just Now",
    applicants: 710,
    source: "Corporate Partner Network",
    driveType: "Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 6.8,
      branches: ["CSE", "IT", "ECE", "EEE", "MCA"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "Advanced Skill Assessment", duration: "90 Mins", desc: "Competitive programming and code optimization" },
      { name: "Technical Interview", duration: "40 Mins", desc: "Full stack concepts, DBMS, and OOPs" },
      { name: "HR Interview", duration: "20 Mins", desc: "Verification and role allocation" }
    ],
    naukriJobId: "310125004452",
    isExtracted: true
  },
  {
    id: "job-nk-108",
    title: "Data Analyst Trainee - Machine Learning & BI",
    company: "Flipkart",
    logoText: "FK",
    logoBg: "bg-yellow-50 text-yellow-700 border-yellow-200",
    rating: 4.3,
    reviewsCount: "16.4k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "14 - 18 LPA",
    location: "Bangalore",
    workMode: "Work from office",
    category: "Product Based",
    department: "Data Science & AI",
    description: "Analyze billions of shopping events, conversion funnels, and supply chain logistics. Build predictive models, real-time metrics dashboards, and automated forecasting pipelines.",
    skills: ["Python", "SQL", "Pandas", "Tableau", "Statistics", "Machine Learning", "A/B Testing"],
    postedDays: "2 Days Ago",
    applicants: 440,
    source: "TPO Verified Partner",
    driveType: "Super Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 7.5,
      branches: ["CSE", "IT", "Data Science", "Math & Computing"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "SQL & Python Analytics Test", duration: "90 Mins", desc: "Complex queries, window functions, and data wrangling" },
      { name: "Business Case Round", duration: "45 Mins", desc: "Product problem breakdown and metric derivation" },
      { name: "Technical & Culture Fit", duration: "45 Mins", desc: "Machine learning algorithms and team collaboration" }
    ],
    naukriJobId: "310125008129",
    isExtracted: true
  },
  {
    id: "job-nk-109",
    title: "Associate Software Engineer - Fintech Systems",
    company: "Razorpay",
    logoText: "RZP",
    logoBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    rating: 4.3,
    reviewsCount: "3.8k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "18 - 24 LPA",
    location: "Bangalore / Hybrid",
    workMode: "Hybrid",
    category: "Product Based",
    department: "Software Engineering",
    description: "Help power payments and financial infrastructure for over 10 million Indian businesses. High throughput, low latency banking gateways and automated reconciliation engines.",
    skills: ["Golang", "Python", "Kafka", "Redis", "Distributed Systems", "PostgreSQL", "Docker"],
    postedDays: "1 Day Ago",
    applicants: 310,
    source: "Tech Partner Network",
    driveType: "Super Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 7.5,
      branches: ["CSE", "IT", "ECE"],
      maxBacklogs: 0,
      bond: "No Bond"
    },
    rounds: [
      { name: "Online Coding Challenge", duration: "90 Mins", desc: "Algorithmic thinking & concurrency basics" },
      { name: "Problem Solving Round", duration: "60 Mins", desc: "Data structures, API design, caching" },
      { name: "Engineering Culture & Founder Spirit", duration: "45 Mins", desc: "Customer focus & integrity" }
    ],
    naukriJobId: "310125006611",
    isExtracted: true
  },
  {
    id: "job-nk-110",
    title: "Turbo Developer - AI & Cloud Solutions",
    company: "Wipro",
    logoText: "WIP",
    logoBg: "bg-violet-50 text-violet-700 border-violet-200",
    rating: 3.8,
    reviewsCount: "46.1k+ reviews",
    experience: "0 - 1 Yrs",
    salary: "6.5 - 8.0 LPA",
    location: "Bangalore / Hyderabad / Pune",
    workMode: "Work from office",
    category: "IT Services",
    department: "Software Engineering",
    description: "Wipro Elite Turbo recruitment for graduates with proven coding capability. Work on real-time enterprise AI solutions, cybersecurity governance, and smart cloud migrations.",
    skills: ["Java", "C++", "Python", "Linux", "SQL", "Object Oriented Design"],
    postedDays: "3 Days Ago",
    applicants: 615,
    source: "Campus Direct Partner",
    driveType: "Dream",
    batch: "2025 / 2026",
    eligibility: {
      minCgpa: 6.5,
      branches: ["All Engineering Branches", "MCA"],
      maxBacklogs: 1,
      bond: "1 Year Service Agreement"
    },
    rounds: [
      { name: "Turbo National Talent Hunt (NTH)", duration: "120 Mins", desc: "Aptitude, Business Communication & Advanced Coding" },
      { name: "Technical Interview", duration: "30 Mins", desc: "Core computing, project assessment" },
      { name: "HR Interview", duration: "20 Mins", desc: "Documentation and verification" }
    ],
    naukriJobId: "310125005520",
    isExtracted: true
  }
];

export const INITIAL_JOBS = [
  ...(Array.isArray(extractedNaukriData) ? extractedNaukriData : []),
  ...BASE_JOBS
];

export const TOP_COMPANIES = [
  { name: "Google", logo: "G", color: "text-red-500 bg-red-50", rating: 4.5, reviews: "14.2k+", jobs: 18, hires: "Hiring Freshers" },
  { name: "Microsoft", logo: "MS", color: "text-blue-500 bg-blue-50", rating: 4.4, reviews: "12.8k+", jobs: 24, hires: "Day 1 Recruiters" },
  { name: "TCS", logo: "TCS", color: "text-purple-600 bg-purple-50", rating: 3.9, reviews: "82.5k+", jobs: 120, hires: "Mass Drive Active" },
  { name: "Infosys", logo: "INF", color: "text-sky-600 bg-sky-50", rating: 4.0, reviews: "64.1k+", jobs: 85, hires: "Specialist Cadre" },
  { name: "Cognizant", logo: "CTS", color: "text-blue-600 bg-blue-50", rating: 3.9, reviews: "58.2k+", jobs: 92, hires: "GenC Next Live" },
  { name: "Deloitte", logo: "DEL", color: "text-emerald-600 bg-emerald-50", rating: 4.1, reviews: "35.9k+", jobs: 42, hires: "Consulting Analyst" },
  { name: "Swiggy", logo: "SW", color: "text-amber-500 bg-amber-50", rating: 4.2, reviews: "7.1k+", jobs: 15, hires: "Product Engineering" },
  { name: "Flipkart", logo: "FK", color: "text-yellow-600 bg-yellow-50", rating: 4.3, reviews: "16.4k+", jobs: 28, hires: "Tech & Analytics" },
];

export const CAMPUS_STATS = {
  totalStudents: 1250,
  eligibleStudents: 980,
  placedStudents: 742,
  placementRate: "75.7%",
  highestCtc: "35 LPA",
  avgCtc: "8.9 LPA",
  totalCompaniesVisited: 114,
  upcomingDrivesThisWeek: 6
};
