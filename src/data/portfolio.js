export const personalInfo = {
  name: "Hemant Raj",
  title: "Full Stack Developer",
  subtitle: "Computer Science Student @ NIT Patna",
  bio: " Ambitious developer passionate about solving real-world problems and building meaningful technology.",
  github: "https://github.com/rajhemant076",
  linkedin: "https://www.linkedin.com/in/hemant-raj-04452a326",
  email: "hemant.raj14012007@gmail.com",
  location: "Patna, Bihar, India",
  cgpa: "9.05",
  leetcode: "200+",
  resumeUrl: "https://drive.google.com/file/d/1YN7UjhAcv4o5gbOtltascKrzn6N9QkKR/view?usp=drive_link",
};

export const skills = {
  languages: [
    { name: "C", level: 85 },
    { name: "Java", level: 88 },
    { name: "JavaScript", level: 90 },
    { name: "Python", level: 78 },
    { name: "Shell Script", level: 65 },
  ],
  web: [
    { name: "HTML/CSS", level: 92 },
    { name: "React", level: 88 },
    { name: "Node.js", level: 82 },
    { name: "Express.js", level: 80 },
    { name: "Bootstrap", level: 78 },
  ],
  databases: [
    { name: "MongoDB", level: 80 },
    { name: "MySQL", level: 75 },
  ],
  tools: [
    { name: "Git & GitHub", level: 88 },
    { name: "REST APIs", level: 85 },
    { name: "JWT Auth", level: 50 },
    { name: "VS Code", level: 90 },
    { name: "Vercel", level: 75 },
  ],
  fundamentals: [
    { name: "DSA", level: 82 },
    { name: "OOP", level: 85 },
    { name: "OS", level: 75 },
    { name: "DBMS", level: 85 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Campus Share",
    tagline: "Academic Resource Sharing Platform",
    description:
      "A full-stack platform enabling students to upload, download, and discover academic resources. Features intelligent filtering by branch and semester with role-based access control.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "GridFS", "JWT", "Bcrypt"],
    features: [
      "Upload & download academic PDFs with GridFS storage",
      "Smart filtering by branch and semester",
      "Role-based access (student / admin)",
      "Secure JWT authentication with Bcrypt",
      "RESTful API architecture",
    ],
    github: "https://github.com/rajhemant076/campus-share-main",
    live: "https://campusshare-frontend.vercel.app/",
    color: "green",
    architecture: {
      frontend: "React + Vite",
      backend: "Node.js + Express",
      auth: "JWT + Bcrypt",
      database: "MongoDB + GridFS",
      deploy: "Vercel + Render",
    },
  },
  {
    id: 2,
    title: "Road Raptors",
    tagline: "Full-Featured Ride Sharing Platform",
    description:
      "A comprehensive ride-sharing web app with separate portals for riders, drivers, and admins. Includes real-time chat, payment management, and an analytics dashboard.",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "AJAX"],
    features: [
      "Multi-portal system (Rider / Driver / Admin)",
      "Complete ride booking workflow",
      "Admin analytics dashboard",
      "Integrated chat system",
      "Payment management module",
    ],
    github: "https://github.com/rajhemant076/RoadRaptors",
    live: "https://road-raptors.gt.tc/",
    color: "cyan",
    architecture: {
      frontend: "HTML + CSS + JS",
      backend: "PHP",
      database: "MySQL",
      realtime: "AJAX polling",
      deploy: "Apache / cPanel",
    },
  },
];

export const education = [
  {
    degree: "B.Tech Computer Science & Engineering",
    institution: "National Institute of Technology Patna",
    period: "2024 – 2028",
    score: "CGPA: 9.05",
    type: "university",
    location: "Patna, Bihar",
  },
  {
    degree: "Senior Secondary (XII) – CBSE",
    institution: "Tirthankar Mahaveer Vidya Mandir",
    period: "2022 – 2024",
    score: "94.2%",
    type: "school",
    location: "Bihar",
  },
  {
    degree: "Secondary (X) – CBSE",
    institution: "Tirthankar Mahaveer Vidya Mandir",
    period: "2022",
    score: "94%",
    type: "school",
    location: "Bihar",
  },
];

export const achievements = [
  {
    title: "FFE Scholar",
    description: "Awarded merit-cum-need based national scholarship.",
    icon: "trophy",
    color: "amber",
  },
  {
    title: "200+ LeetCode Problems",
    description: "Focus on DSA, graphs, and dynamic programming in Java",
    icon: "code",
    color: "green",
  },
  {
    title: "Smart India Hackathon 2025",
    description: "Cleared Internal Round for Smart India Hackathon (SIH)",
    icon: "rocket",
    color: "violet",
  },
  {
    title: "90%+ in Class X & XII",
    description: "Consistent top scorer in CBSE board examinations",
    icon: "star",
    color: "cyan",
  },
];

export const certifications = [
  {
    title: "Java Programming",
    issuer: "Apna College",
    description: "Complete Java programming course covering OOP, collections, and problem solving",
    color: "orange",
  },
  {
    title: "FLY Project Certification",
    issuer: "Competitiveness Mindset Institute",
    description: "Certification in competitive thinking, growth strategies, and professional development",
    color: "violet",
  },
];

export const navLinks = [
  { label: "Home", href: "hero" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Education", href: "education" },
  { label: "Contact", href: "contact" },
];