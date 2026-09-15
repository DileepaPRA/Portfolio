import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "@/index.css";
import { PERSONAL_INFO } from "@/lib/data";
import JsonLd from "@/components/seo/JsonLd";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(PERSONAL_INFO.siteUrl || "https://dilee.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Dileepa Prabhath — Software Engineer",
    template: "%s | Dileepa Prabhath",
  },
  description:
    "Portfolio of Dileepa Prabhath — IT undergraduate at University of Moratuwa. Software engineer, full stack developer, and backend engineer building secure, scalable systems.",
  keywords: [
    "Dileepa Prabhath",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "Portfolio",
    "University of Moratuwa",
    "React",
    "Next.js",
    "TypeScript",
    "Spring Boot",
    "Java",
    "Python",
    "AI/ML",
    "Cybersecurity",
    "Sri Lanka Developer",
  ],
  authors: [{ name: "Dileepa Prabhath", url: PERSONAL_INFO.siteUrl }],
  creator: "Dileepa Prabhath",
  publisher: "Dileepa Prabhath",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PERSONAL_INFO.siteUrl,
    title: "Dileepa Prabhath — Software Engineer",
    description:
      "IT undergraduate at the University of Moratuwa. Building secure, scalable, and intelligent systems.",
    siteName: "Dileepa Prabhath Portfolio",
    images: [
      {
        url: "/images/projects/Portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Dileepa Prabhath — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dileepa Prabhath — Software Engineer",
    description:
      "IT undergraduate at the University of Moratuwa. Building secure, scalable, and intelligent systems.",
    images: ["/images/projects/Portfolio.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "oaQ7GcNIGUpHZpE5KNahdJj2srQteyu5WGyRRkZsh2Y",
  },
  icons: {
    icon: "/images/logo_no_bg.png",
    shortcut: "/images/logo_no_bg.png",
    apple: "/images/logo_no_bg.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#060c1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  if (saved === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/images/favicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/favicon.jpg" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
