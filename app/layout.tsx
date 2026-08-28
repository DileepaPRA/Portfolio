import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "@/index.css";

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
  title: "Dileepa Prabhath — Full Stack Developer",
  description:
    "Portfolio of Dileepa Prabhath — IT undergraduate at the University of Moratuwa. Full stack developer, backend engineer, and AI/ML enthusiast building secure, scalable systems.",
  keywords: [
    "Dileepa Prabhath",
    "Full Stack Developer",
    "Backend Engineer",
    "Portfolio",
    "University of Moratuwa",
    "React",
    "Next.js",
    "TypeScript",
    "Spring Boot",
    "AI/ML",
    "Cybersecurity",
  ],
  authors: [{ name: "Dileepa Prabhath" }],
  creator: "Dileepa Prabhath",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dileepaprabhath.dev",
    title: "Dileepa Prabhath — Full Stack Developer",
    description:
      "IT undergraduate at the University of Moratuwa. Building secure, scalable, and intelligent systems.",
    siteName: "Dileepa Prabhath Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dileepa Prabhath — Full Stack Developer",
    description:
      "IT undergraduate at the University of Moratuwa. Building secure, scalable, and intelligent systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#060c1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
