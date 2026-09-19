export interface SocialLink {
  id: "github" | "linkedin" | "email" | "location";
  label: string;
  href: string;
  username: string;
  color: string;
  external?: boolean;
}

export const PERSONAL_INFO = {
  name: "Dileepa Prabhath",
  shortName: "DP",
  title: "Software Engineer",
  roles: ["Software Engineer", "Full Stack Developer", "Backend Engineer"],
  tagline: "IT Undergraduate @ University of Moratuwa",
  location: "Sri Lanka 🇱🇰",
  bio: "Driven by curiosity, passionate about building secure, intelligent, and scalable systems that merge innovation with real-world impact, turning complex ideas into elegant code.",
  avatar: "/images/profile/Avatar.jpg",
  siteUrl: (process.env.HOSTED_SITE_URL || "https://dilee.vercel.app").replace(/\/$/, ""),
  email: "d.prabath115@gmail.com",
  resumeUrl: "#", // Replace with your actual CV/Resume URL (e.g., "/cv.pdf" or Google Drive link)
  stats: [
    { label: "Projects", value: "10+" },
    { label: "Year", value: "3rd" },
  ],
  academicStanding: {
    title: "Academic Standing",
    highlight: "Dean's List",
    text: "Consistently on the Dean's List — L1S1, L1S2, L2S1 at University of Moratuwa.",
  },
  aboutCodeLines: [
    { indent: 0, tokens: [{ type: "comment", text: "/**" }] },
    {
      indent: 0,
      tokens: [{ type: "comment", text: " * Self-motivated, hardworking individual." }],
    },
    {
      indent: 0,
      tokens: [{ type: "comment", text: " * Aspiring software engineer with strong foundation" }],
    },
    { indent: 0, tokens: [{ type: "comment", text: " */" }] },
    { indent: 0, tokens: [] },
    {
      indent: 0,
      tokens: [
        { type: "keyword", text: "const " },
        { type: "var", text: "developer" },
        { type: "operator", text: " = {" },
      ],
    },
    {
      indent: 1,
      tokens: [
        { type: "key", text: "name" },
        { type: "operator", text: ": " },
        { type: "string", text: '"Dileepa Prabhath"' },
        { type: "operator", text: "," },
      ],
    },
    {
      indent: 1,
      tokens: [
        { type: "key", text: "role" },
        { type: "operator", text: ": " },
        { type: "string", text: '"Software Engineer | Full Stack Developer"' },
        { type: "operator", text: "," },
      ],
    },
    {
      indent: 1,
      tokens: [
        { type: "key", text: "location" },
        { type: "operator", text: ": " },
        { type: "string", text: '"Sri Lanka"' },
        { type: "operator", text: "," },
      ],
    },
    {
      indent: 1,
      tokens: [
        { type: "key", text: "passion" },
        { type: "operator", text: ": [" },
        { type: "string", text: '"backend engineering"' },
        { type: "operator", text: ", " },
        { type: "string", text: '"Scalable system design"' },
        { type: "operator", text: ", " },
        { type: "string", text: '"AI/ML innovation"' },
        { type: "operator", text: ", " },
        { type: "string", text: '"cybersecurity"' },
        { type: "operator", text: "]" },
      ],
    },
    { indent: 0, tokens: [{ type: "operator", text: "};" }] },
  ],
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/DileepaPRA",
    username: "github.com/DileepaPRA",
    color: "#4edea3",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dileepa-prabhath-b22071305",
    username: "linkedin.com/in/dileepa-prabhath",
    color: "#3b82f6",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:d.prabath115@gmail.com",
    username: "d.prabath115@gmail.com",
    color: "#a855f7",
    external: false,
  },
];

// Helper mapping for direct property access
export const SOCIALS = {
  github: SOCIAL_LINKS[0].href,
  linkedin: SOCIAL_LINKS[1].href,
  email: "d.prabath115@gmail.com",
};

export const SECTION_COLORS: Record<string, string> = {
  hero: "#4edea3",
  about: "#5a8e0d5c",
  education: "#3b82f6",
  skills: "#10b981",
  projects: "#a855f7",
  university: "#fb176f",
  achievements: "#E94A1E",
  contact: "#00d4b4",
};

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [78, 222, 163];
}

export const NAV_ITEMS = [
  { label: "HOME", href: "#hero", color: "#4edea3" },
  { label: "ABOUT", href: "#about", color: "#84cc16" },
  { label: "EDU", href: "#education", color: "#3b82f6" },
  { label: "SKILLS", href: "#skills", color: "#10b981" },
  { label: "PROJECTS", href: "#projects", color: "#a855f7" },
  { label: "JOURNEY", href: "#university", color: "#fb176f" },
  { label: "AWARDS", href: "#achievements", color: "#f59e0b" },
  { label: "CONTACT", href: "#contact", color: "#00d4b4" },
];

export interface StatMetric {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface SemGPA {
  sem: string;
  gpa: string;
}

export interface TimelineItem {
  period: string;
  version: string;
  commitHash: string;
  tagLabel?: string;
  institution: string;
  degree: string;
  meta: string;
  description?: string;
  current: boolean;
  logo: string;
  badges?: string[];
  academicStanding?: string;
  stats?: StatMetric[];
  semesterGPAs?: SemGPA[];
  alSubjects?: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    period: "2024 – PRESENT",
    version: "v2.0",
    commitHash: "h0n5IT",
    tagLabel: "CURRENT",
    institution: "University of Moratuwa",
    degree: "B.Sc (Hons) in Information Technology",
    meta: "CGPA: 3.96 · Third Year",
    description:
      "Pursuing a strong foundation in software engineering and emerging technologies while maintaining academic excellence.",
    current: true,
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    badges: ["CGPA 3.96", "Dean's List", "Third Year"],
    academicStanding:
      "Consistently on the Dean's List — L1S1, L1S2, L2S1 at University of Moratuwa.",
    stats: [
      { label: "CGPA", value: "3.96", highlight: true },
      { label: "YEAR", value: "THIRD" },
    ],
    semesterGPAs: [
      { sem: "L1S1", gpa: "3.95" },
      { sem: "L1S2", gpa: "3.94" },
      { sem: "L2S1", gpa: "4.00" },
    ],
  },
  {
    period: "2011 – 2023",
    version: "v1.0",
    commitHash: "phyBdl",
    tagLabel: "FOUNDATION",
    institution: "Badulla Central College",
    degree: "G.C.E. Advanced Level (A/L) Physical Science",
    meta: "Physical Science · Z-Score 1.5075",
    description:
      "Successfully passed the G.C.E. Advanced Level Examination on first attempt in the Physical Science stream.",
    current: false,
    logo: "https://bmmv.edu.lk/images/logo.png",
    badges: ["Physical Science", "Z-Score 1.5075", "District Rank 105"],
    stats: [{ label: "DISTRICT RANK", value: "105" }],
    alSubjects: "Combined Maths: B · Physics: B · Chemistry: B",
  },
];

export interface SkillItem {
  name: string;
  primary?: boolean;
}

export const SKILLS: Record<string, SkillItem[]> = {
  Programming: [
    { name: "Java" },
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "Python" },
    { name: "C" },
  ],
  Frontend: [
    { name: "React", primary: true },
    { name: "Next.js" },
    { name: "HTML5" },
    { name: "CSS3" },
    { name: "Tailwind CSS" },
  ],
  Backend: [
    { name: "Spring Boot", primary: true },
    { name: "Express.js" },
    { name: "REST APIs" },
    { name: "JWT" },
    { name: "Docker" },
  ],
  Databases: [{ name: "MySQL" }, { name: "MSSQL" }, { name: "MongoDB" }, { name: "Redis" }],
  "Cloud & DevOps": [
    { name: "AWS S3" },
    { name: "Render" },
    { name: "Netlify" },
    { name: "Aiven Cloud" },
    { name: "GitHub Actions" },
  ],
  "Tools & Platforms": [
    { name: "Git" },
    { name: "GitHub" },
    { name: "Postman" },
    { name: "Figma" },
    { name: "Blender" },
    { name: "TensorFlow" },
    { name: "Google Colab" },
  ],
};

export const LEARNING_NOW = ["PostgreSQL", "Kubernetes", "RAG"];

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  live: string;
  repo: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "serve-sync",
    title: "ServeSync (CraveHouse)",
    description:
      "Multi-branch restaurant platform supporting QR and online ordering, automated table reservations, and real-time operations across restaurant staff.",
    technologies: ["React", "Spring Boot", "MySQL", "JavaScript", "Redis"],
    tags: ["Restaurant", "QROrdering", "FullStack", "MultiBranch"],
    live: "https://cravehouse.netlify.app/",
    repo: "https://github.com/Byte-knight-team/BK_SP_Backend",
    image: "/images/projects/ServeSync(CraveHouse).jpg",
  },
  {
    id: "split-rx",
    title: "SplitRx",
    description:
      "Next-generation medical prescription system designed to eliminate security vulnerabilities in how prescriptions are handled. It protects against identity theft, prescription fraud, and data leaks.",
    technologies: ["Next.js", "TypeScript", "Express.js", "PostgreSQL"],
    tags: ["Security", "Healthcare", "FraudPrevention", "FullStack"],
    live: "",
    repo: "https://github.com/genzipher1-0-codestormers/SplitRx",
    image: "/images/projects/SplitRx.png",
  },
  {
    id: "agro-sense",
    title: "AgroSense",
    description:
      "Agricultural intelligence platform providing real-time weather alerts, market pricing analytics, and automated crop risk advisory.",
    technologies: ["Spring Boot", "React", "JavaScript", "MySQL"],
    tags: ["Agriculture", "FullStack", "AIML", "AgriTech"],
    live: "https://agrof-repo.vercel.app/",
    repo: "https://github.com/Fourth-X-Born/agro-sense-AI-backend",
    image: "/images/projects/AgroSense.jpg",
  },
  {
    id: "cash-master",
    title: "CashMaster 6688",
    description:
      "AI-powered embedded system for identifying and sorting Sri Lankan currency denominations in real-time with actuator hardware control.",
    technologies: ["Python", "TensorFlow Lite", "MobileNetV2", "Raspberry Pi", "Arduino", "OpenCV"],
    tags: ["EmbeddedSystems", "IoT", "AIML", "ComputerVision"],
    live: "",
    repo: "https://github.com/DileepaPRA/Group_Project_CashMaster_6688",
    image: "/images/projects/CashMaster_6688.jpeg",
  },
  {
    id: "chef-claude",
    title: "Chef Claude",
    description:
      "AI-powered culinary web application that generates personalized recipes from user-provided ingredients using Google Gemini.",
    technologies: ["React", "Gemini API", "Express.js", "Tailwind CSS"],
    tags: ["FoodTech", "GenerativeAI", "FullStack", "WebApp"],
    live: "",
    repo: "https://github.com/DileepaPRA/Chef-Claude",
    image: "/images/projects/Chef-Claude.png",
  },
  {
    id: "foregoal",
    title: "ForeGoal — FIFA 2026 Prediction Engine",
    description:
      "FIFA World Cup 2026 prediction and match outcome simulation engine powered by machine learning models and interactive visual analytics.",
    technologies: ["Python", "Streamlit", "NumPy", "Pandas", "Matplotlib", "scikit-learn"],
    tags: ["Prediction", "DataVisualization", "MachineLearning", "SportsAnalytics"],
    live: "",
    repo: "https://github.com/DileepaPRA/ForeGoal",
    image: "/images/projects/Foregoal.jpg",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "Modern cybernetic developer portfolio engineered from scratch for high performance, smooth 60fps micro-interactions, responsive window architecture, and dark-mode glassmorphism.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    tags: ["Portfolio", "Frontend", "UIUX", "Performance"],
    live: "",
    repo: "https://github.com/DileepaPRA/Portfolio",
    image: "/images/projects/Portfolio.jpg",
  },
  {
    id: "lyntra",
    title: "Lyntra",
    description:
      "Modern collaborative knowledge-sharing platform for developers, students, and tech communities.",
    technologies: ["Next.js", "Spring Boot", "React", "TypeScript"],
    tags: ["KnowledgeSharing", "FullStack", "WebApp", "Collaboration"],
    live: "",
    repo: "https://github.com/DileepaPRA/lyntra-api",
    image: "/images/projects/Lyntra.png",
  },
];

export const UNIVERSITY_IMAGES = [
  {
    src: "/images/journey/genzipher.jpg",
    caption: "GenZipher CTF & Hackathon",
  },
  {
    src: "/images/journey/CODERUSH (1).jpg",
    caption: "CodeRush Hackathon 2024",
  },
  {
    src: "/images/journey/FIT Expo.jpg",
    caption: "FIT Future Careers Expo",
  },
  {
    src: "/images/journey/genzipher 2.jpg",
    caption: "GenZipher Champions",
  },
  {
    src: "/images/journey/DMC1.jpeg",
    caption: "DMC Project Session",
  },
  {
    src: "/images/journey/Hardware Project.jpg",
    caption: "Hardware Project Lab",
  },
  {
    src: "/images/journey/SP_Interim.jpg",
    caption: "Software Project Interim Demo",
  },
  {
    src: "/images/journey/epic_lanka.jpg",
    caption: "Industry Visit — Epic Lanka",
  },
  {
    src: "/images/journey/DMC2.jpeg",
    caption: "DMC Team Discussion",
  },
  {
    src: "/images/journey/HW Project 2.jpeg",
    caption: "Hardware Development",
  },
  {
    src: "/images/journey/SP Project 2.jpeg",
    caption: "Software Project Team",
  },
  {
    src: "/images/journey/SLRMUN.jpg",
    caption: "SLRMUN Conference",
  },
];

export interface Award {
  id: string;
  title: string;
  type: string;
  org: string;
  year: string;
  image: string;
  cert: string;
  note?: string;
}

export const AWARDS: Award[] = [
  {
    id: "genzcipher",
    title: "Champions — GenZipher",
    type: "CTF & Development Hackathon",
    org: "University of Colombo (UCSC)",
    year: "2024",
    image: "/images/awards/Genzipher Winner.jpg",
    cert: "https://drive.google.com/file/d/1xV1Hry2JOGClJBOtseNhSO4CiK6p1yR8/view?usp=sharing",
  },
  {
    id: "cryptx",
    title: "Participant — CryptX 2.0",
    type: "CTF Hackathon",
    org: "University of Sri Jayewardenepura",
    year: "2026",
    image: "/images/awards/CryptX.jpg",
    cert: "https://drive.google.com/file/d/1uu2rhn_RH5CULN2290WTY1ROCSFOlHkm/view?usp=sharing",
  },
  {
    id: "coderush",
    title: "Top 20 - CodeRush 2024",
    type: "Coding Hackathon",
    org: "University of Moratuwa, INTECS",
    year: "2024",
    image: "/images/awards/CodeRush24.png",
    cert: "https://www.hackerrank.com/contests/fit-coderush-2024/leaderboard?limit=50&page=1",
  },
  {
    id: "coderally-7",
    title: "Finalist - CodeRally 7.0",
    type: "Coding Challenge",
    org: "IIT Sri Lanka",
    year: "2026",
    image: "/images/awards/coderally7.jpeg",
    cert: "",
  },
  {
    id: "Fit-Expo",
    title: "	Participant - Fit Expo 2024",
    type: "Exhibition",
    org: "University of Moratuwa",
    year: "2025",
    image: "/images/awards/FitExpo.jpeg",
    cert: "https://drive.google.com/file/d/1kxhIhFUz3F_a7u79Qrv7pK3uTrEJwg85/view?usp=sharing",
  },
];

export const CERTIFICATIONS = [
  {
    id: "cisco-network",
    title: "Network Technician Career Path",
    issuer: "Cisco Academy",
    year: "2025",
    image: "/images/certifications/Cisco Network Technicial.png",
    cert: "https://www.credly.com/badges/db8380cc-ffdf-4b91-ae7e-153e6fd92f58/public_url",
  },
  {
    id: "Docker-beginner-Kodekloud",
    title: "Docker Training Course for the Absolute Beginner",
    issuer: "KodeKloud",
    year: "2026",
    image: "/images/certifications/Docker_Beginners.jpg",
    cert: "https://learn.kodekloud.com/learn/certificate/42d29da1-5cd0-408b-b2b7-92fb28c3da37",
  },
  {
    id: "fcc-web",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2024",
    image: "/images/certifications/FreeCodeCamp.png",
    cert: "https://www.freecodecamp.org/certification/fcc-cece4546-7f12-4035-8846-3a437567e3c4/responsive-web-design",
  },
  {
    id: "cisco-cyber",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Academy",
    year: "2025",
    image: "/images/certifications/Cisco Introduction Cybersecurity Path.png",
    cert: "https://www.credly.com/badges/dfa134e3-4370-4757-aa34-16d0d9820de8/public_url",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    year: "2026",
    image: "/images/certifications/AWS Cloud Practitioner.png",
    cert: "https://drive.google.com/file/d/1HkT073fADDscy0txx9fEwmRKlTQDrRTh/view?usp=sharing",
  },
  {
    id: "c-solo",
    title: "C Intermediate",
    issuer: "SoloLearn",
    year: "2024",
    image: "/images/certifications/SoloLearn C Intermidiate.jpg",
    cert: "https://www.sololearn.com/certificates/CC-N0Q43SY2",
  },
];
