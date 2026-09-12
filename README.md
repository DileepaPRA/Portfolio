# Dileepa Prabhath — Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.0-black?style=for-the-badge&logo=framer&logoColor=blue)](https://motion.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dilee.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

A modern, cybernetic personal developer portfolio engineered with **Next.js 15 (App Router)**, **React 19**, and **Tailwind CSS**. Designed with high-performance dark/light glassmorphism, dynamic liquid optical refraction, interactive OS-inspired window architectures, and 60fps micro-animations.

🌐 **Live Website**: [https://dilee.vercel.app](https://dilee.vercel.app/)

---

## ✨ Features

- **Floating Liquid-Glass Navbar**:
  - Center-floating optical acrylic capsule with micro-thin chromatic light dispersion (`::before`) and specular rim highlights.
  - Dynamic scroll morphing: seamlessly expands wide at the top of the viewport and contracts into a floating pill on scroll via physics-based cubic-bezier easing.
  - Mobile-responsive drawer with mathematical centering and tap-to-dismiss backdrop.

- **Dual-Mode Glassmorphism Engine**:
  - **Dark Obsidian**: Sleek, high-contrast cybernetic terminal aesthetic with subtle particle dust and neon accent pulses.
  - **Light Crystalline**: Luminous frosted acrylic material with deep background blur diffusion and razor-sharp slate typography.
  - Instant theme persistence via `localStorage` with zero flash of unstyled theme (FOUT).

- **Interactive Project Console**:
  - OS-inspired multi-tab code editor and browser preview window.
  - Real-time tab switching, bottom filmstrip navigation, tech stack chips, and direct repository / live demo access.
  - Zero-lag horizontal scrolling scoped to containers without window scroll hijacking.

- **Live Contact Terminal (`./send_message.sh`)**:
  - Interactive bash-style contact form integrated with **Web3Forms API**.
  - Real-time terminal handshake and SMTP transmission status output.
  - Dispatches messages directly to email inbox with automated form clearing.

- **Complete SEO & PWA Infrastructure**:
  - **Dynamic XML Sitemap** (`/sitemap.xml`) generated via `app/sitemap.ts`.
  - **Crawl Directives** (`/robots.txt`) with search engine access and sitemap indexing rules.
  - **JSON-LD Structured Data** (`schema.org` Person, WebSite, and ProfilePage) for Google Knowledge Graph recognition.
  - **Web App Manifest** (`/manifest.webmanifest`) for PWA compliance and mobile installability.
  - **OpenGraph & Twitter Cards** (1200 × 630) for rich previews when shared on LinkedIn, Twitter/X, WhatsApp, and Discord.

- **Extreme Performance & Core Web Vitals**:
  - 100% Static Site Generation (SSG) with **102 kB** total initial JS bundle.
  - Sub-second global page loads via Vercel Edge CDN.
  - Zero Cumulative Layout Shift (CLS) with optimized Google Fonts (`Sora`, `Inter`, `JetBrains Mono`).

---

## 🛠️ Tech Stack

| Domain               | Technologies                                                       |
| :------------------- | :----------------------------------------------------------------- |
| **Framework**        | Next.js 15 (App Router), React 19                                  |
| **Language**         | TypeScript 5.7 (Strict Type Checking)                              |
| **Styling & Design** | Tailwind CSS v4, Custom CSS Variables, Glassmorphism Tokens        |
| **Animations & 3D**  | Framer Motion (v13), Three.js, React Three Fiber, Canvas Particles |
| **Icons & Media**    | Lucide React, Custom SVG Icons                                     |
| **Form Backend**     | Web3Forms API                                                      |
| **Code Quality**     | ESLint 9, Prettier, Husky, Lint-Staged                             |
| **Deployment**       | Vercel Edge Network                                                |

---

## 📂 Project Structure

```text
Portfolio/
├── app/
│   ├── layout.tsx              # Root HTML, SEO metadata, fonts, theme bootstrapping
│   ├── page.tsx                # Page route mounting PortfolioPage
│   ├── sitemap.ts              # Dynamic XML sitemap generator (/sitemap.xml)
│   ├── robots.ts               # Search engine crawl directives (/robots.txt)
│   ├── manifest.ts             # Web App Manifest generator (/manifest.webmanifest)
│   └── not-found.tsx           # Custom 404 terminal error page
├── public/
│   └── images/                 # Optimized WebP/JPEG avatars, badges, and project assets
├── src/
│   ├── components/
│   │   ├── background/         # Canvas dust particles & section ambient glows
│   │   ├── layout/             # Liquid-glass Navbar, ThemeToggle, SocialSidebar, Footer
│   │   ├── sections/           # Hero, About, Education, Skills, Projects, Journey, Contact
│   │   └── seo/                # JSON-LD Schema.org structured data component
│   ├── lib/
│   │   ├── data.ts             # Portfolio data, personal info, project definitions, skills
│   │   └── sectionIcons.ts     # Ambient section icon mappings
│   └── index.css               # Design system tokens, glassmorphism rules, scrollbar
├── .env.local                  # Local environment configuration (access keys)
├── next.config.ts              # Next.js build optimizations and remote image patterns
├── package.json                # Project dependencies and deployment scripts
└── tsconfig.json               # TypeScript strict configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.18.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone the Repository

```bash
git clone https://github.com/DileepaPRA/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
NEXT_PUBLIC_SITE_URL=https://dilee.vercel.app
```

> _Get a free access key in 10 seconds at [web3forms.com](https://web3forms.com)._

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 🧪 Verification & Code Quality

```bash
# Type check all TypeScript files
npm run type-check

# Run ESLint validation
npm run lint

# Check code formatting
npm run format:check
```

---

## 👨‍💻 Author

**Dileepa Prabhath**  
_IT Undergraduate @ University of Moratuwa | Full Stack Developer | Backend Engineer_

- **Website**: [https://dilee.vercel.app](https://dilee.vercel.app/)
- **GitHub**: [@DileepaPRA](https://github.com/DileepaPRA)
- **LinkedIn**: [dileepa-prabhath](https://www.linkedin.com/in/dileepa-prabhath-b22071305)
- **Email**: [d.prabath115@gmail.com](mailto:d.prabath115@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
