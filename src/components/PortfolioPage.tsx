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
    let ticking = false;

    const updateActiveSection = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      if (!sections.length) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Top of page edge case -> Hero
      if (scrollY < 120) {
        setActiveSection("hero");
        const colorHex = SECTION_COLORS.hero;
        if (colorHex) setDustColor(hexToRgb(colorHex));
        return;
      }

      // 2. Bottom of page edge case -> Contact
      if (scrollY + viewportHeight >= documentHeight - 80) {
        setActiveSection("contact");
        const colorHex = SECTION_COLORS.contact;
        if (colorHex) setDustColor(hexToRgb(colorHex));
        return;
      }

      // 3. Focal line: 42% down the screen (accounting for fixed navbar)
      const focalLine = viewportHeight * 0.42;
      let matchedId: string | null = null;
      let closestDistance = Infinity;
      let fallbackId = "hero";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute("data-section") ?? "hero";

        // Section directly intersects the viewport focal line
        if (rect.top <= focalLine && rect.bottom >= focalLine) {
          matchedId = id;
        }

        // Fallback: track distance from section center to focal line
        const sectionCenter = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(sectionCenter - focalLine);
        if (dist < closestDistance) {
          closestDistance = dist;
          fallbackId = id;
        }
      });

      const finalId = matchedId || fallbackId;

      setActiveSection((prev) => {
        if (prev !== finalId) {
          const colorHex = SECTION_COLORS[finalId];
          if (colorHex) setDustColor(hexToRgb(colorHex));
          return finalId;
        }
        return prev;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
