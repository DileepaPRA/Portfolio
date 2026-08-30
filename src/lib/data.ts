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
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "Backend Engineer", "AI/ML Enthusiast", "Cybersecurity Explorer"],
  tagline: "IT Undergraduate @ University of Moratuwa",
  location: "Sri Lanka 🇱🇰",
  bio: "Driven by curiosity, passionate about building secure, intelligent, and scalable systems that merge innovation with real-world impact—turning complex ideas into elegant code.",
  avatar: "/images/profile/Avatar.jpg",
  resumeUrl: "#", // Replace with your actual CV/Resume URL (e.g., "/cv.pdf" or Google Drive link)
  stats: [
    { label: "Projects", value: "10+" },
    { label: "Year", value: "2nd" },
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
      tokens: [
        { type: "comment", text: " * Aspiring full stack developer with strong foundation" },
      ],
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
        { type: "string", text: '"Full-Stack Developer | Backend Developer"' },
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
  tags: string[];
  langStats: { lang: string; pct: number }[];
  live: string;
  repo: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "chert-nodes",
    title: "ChertNodes",
    description:
      "Minecraft server hosting platform with automated deployment, real-time monitoring dashboard, and seamless player management.",
    tags: ["React", "Flask", "Python", "TypeScript"],
    langStats: [
      { lang: "TS", pct: 60 },
      { lang: "PY", pct: 40 },
    ],
    live: "https://github.com/DileepaPRA",
    repo: "https://github.com/DileepaPRA",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=720&h=480&fit=crop&auto=format",
  },
  {
    id: "protectx",
    title: "ProtectX",
    description:
      "Advanced Discord anti-crash bot protecting large communities with threat detection, rate-limiting, and automated moderation flows.",
    tags: ["Node.js", "Discord.js", "JavaScript"],
    langStats: [
      { lang: "JS", pct: 90 },
      { lang: "SH", pct: 10 },
    ],
    live: "https://github.com/DileepaPRA",
    repo: "https://github.com/DileepaPRA",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=720&h=480&fit=crop&auto=format",
  },
  {
    id: "kahoot-viewer",
    title: "Kahoot Answers Viewer",
    description:
      "Educational tool to view Kahoot quiz answers instantly. Built with Vue.js + Express backend, designed for developer utility.",
    tags: ["Vue.js", "Express", "JavaScript"],
    langStats: [
      { lang: "VUE", pct: 80 },
      { lang: "JS", pct: 20 },
    ],
    live: "https://github.com/DileepaPRA",
    repo: "https://github.com/DileepaPRA",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=720&h=480&fit=crop&auto=format",
  },
  {
    id: "project-4",
    title: "More Coming Soon",
    description:
      "Real projects with full source code, live demos, and detailed documentation. Add your actual projects here.",
    tags: ["React", "TypeScript", "Node.js"],
    langStats: [
      { lang: "TS", pct: 70 },
      { lang: "JS", pct: 30 },
    ],
    live: "https://github.com/DileepaPRA",
    repo: "https://github.com/DileepaPRA",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=720&h=480&fit=crop&auto=format",
  },
];

export const UNIVERSITY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=340&fit=crop&auto=format",
    caption: "Campus Life",
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=340&fit=crop&auto=format",
    caption: "Orientation",
  },
  {
    src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=500&h=340&fit=crop&auto=format",
    caption: "Study Sessions",
  },
  {
    src: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=340&fit=crop&auto=format",
    caption: "Computer Lab",
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=340&fit=crop&auto=format",
    caption: "Group Projects",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=340&fit=crop&auto=format",
    caption: "Hackathon Night",
  },
  {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&h=340&fit=crop&auto=format",
    caption: "Presentations",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=340&fit=crop&auto=format",
    caption: "Team Collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=340&fit=crop&auto=format",
    caption: "Design Lab",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=340&fit=crop&auto=format",
    caption: "Research Work",
  },
  {
    src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=500&h=340&fit=crop&auto=format",
    caption: "Social Events",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=340&fit=crop&auto=format",
    caption: "Friendships",
  },
];

export const AWARDS = [
  {
    id: "genzcipher",
    title: "Champions — GenZipher",
    type: "CTF & Development Hackathon",
    org: "University of Colombo (UCSC)",
    year: "2024",
    image: null as string | null,
    cert: "https://github.com/DileepaPRA",
    icon: "trophy",
  },
  {
    id: "cryptx",
    title: "Participant — CryptX 2.0",
    type: "CTF Hackathon",
    org: "University of Sri Jayewardenepura",
    year: "2024",
    image: null as string | null,
    cert: "https://github.com/DileepaPRA",
    icon: "shield",
  },
  {
    id: "deans-list",
    title: "Dean's List",
    type: "Academic Excellence Award",
    org: "University of Moratuwa",
    year: "2024–2025",
    image: null as string | null,
    cert: "https://github.com/DileepaPRA",
    note: "Levels: L1S1, L1S2, L2S1",
    icon: "star",
  },
];

export const CERTIFICATIONS = [
  {
    id: "cisco-network",
    title: "Network Technician Career Path",
    issuer: "Cisco Academy",
    year: "2023",
    image: null as string | null,
    cert: "https://github.com/DileepaPRA",
  },
  {
    id: "fcc-web",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2023",
    image: null as string | null,
    cert: "https://github.com/DileepaPRA",
  },
  {
    id: "cisco-cyber",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Academy",
    year: "2023",
    image: null as string | null,
    cert: "https://github.com/DileepaPRA",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    year: "2024",
    image: null as string | null,
    cert: "https://github.com/DileepaPRA",
  },
];
