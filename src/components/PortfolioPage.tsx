"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "./layout/Navbar";
import SocialSidebar from "./layout/SocialSidebar";
import ScrollToTop from "./layout/ScrollToTop";
import Footer from "./layout/Footer";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import UniversityJourneySection from "./sections/UniversityJourneySection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [stormComplete, setStormComplete] = useState(false);

  useEffect(() => {
    // Ensure fresh page load starts at the very top (Hero section) unless a URL hash is present
    if (typeof window !== "undefined" && !window.location.hash) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Lock body scroll during choreographed assembly & ASCII sequence (max 4.4s safety fallback)
  useEffect(() => {
    if (!stormComplete) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setStormComplete(true);
      }, 4400);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stormComplete]);

  const handleStormComplete = useCallback(() => {
    setStormComplete(true);
  }, []);

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
        return;
      }

      // 2. Bottom of page edge case -> Contact
      if (scrollY + viewportHeight >= documentHeight - 80) {
        setActiveSection("contact");
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
      setActiveSection((prev) => (prev !== finalId ? finalId : prev));
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
    <div className="min-h-screen overflow-x-hidden relative bg-void text-ink transition-colors duration-300">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Fixed chrome — hidden until storm completes */}
      <Navbar activeSection={activeSection} visible={stormComplete} />
      <SocialSidebar visible={stormComplete} />
      <ScrollToTop />

      {/* Page content */}
      <main className="relative z-10">
        <HeroSection onStormComplete={handleStormComplete} />
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
