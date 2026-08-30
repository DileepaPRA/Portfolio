"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./layout/LoadingScreen";
import DustCanvas from "./background/DustCanvas";
import Navbar from "./layout/Navbar";
import SocialSidebar from "./layout/SocialSidebar";
import Footer from "./layout/Footer";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import UniversityJourneySection from "./sections/UniversityJourneySection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";
import { SECTION_COLORS, hexToRgb } from "../lib/data";

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [dustColor, setDustColor] = useState<[number, number, number]>([78, 222, 163]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");

    // rootMargin shrinks the detection window to a band around the viewport center.
    // This fires when a section enters the middle 30% of the screen — works for
    // sections of any height, including ones taller than the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section") ?? "hero";
            setActiveSection(id);
            const colorHex = SECTION_COLORS[id];
            if (colorHex) setDustColor(hexToRgb(colorHex));
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: "#060c1a", color: "#dce4f5" }}
    >
      {/* Boot Splash Loading Screen */}
      <LoadingScreen />

      {/* Layered background: grid → dust particles */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <DustCanvas sectionColor={dustColor} />

      {/* Fixed chrome */}
      <Navbar activeSection={activeSection} />
      <SocialSidebar />

      {/* Page content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <UniversityJourneySection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
