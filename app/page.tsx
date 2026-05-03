"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/nav/Sidebar";
import Attractions from "../components/sections/Attractions";
import BrandWall from "../components/sections/BrandWall";
import Contact from "../components/sections/Contact";
import Dining from "../components/sections/Dining";
import Events from "../components/sections/Events";
import Hero from "../components/sections/Hero";
import Retail from "../components/sections/Retail";
import Sponsorship from "../components/sections/Sponsorship";
import WhyMOA from "../components/sections/WhyMOA";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "why-moa", label: "Why MOA" },
  { id: "retail", label: "Retail" },
  { id: "brands", label: "Brands" },
  { id: "attractions", label: "Attractions" },
  { id: "dining", label: "Dining" },
  { id: "events", label: "Events" },
  { id: "sponsorship", label: "Sponsorship" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [introComplete, setIntroComplete] = useState(false);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      {
        threshold: [0.35, 0.6, 0.8],
      },
    );

    sectionRefs.current = sectionIds.map((id) => document.getElementById(id));
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => setMouse({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen max-w-[100%] overflow-x-hidden bg-white text-[#0D1F3C]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute right-[8%] top-[4%] h-[460px] w-[460px] rounded-full bg-black/[0.08] blur-[160px]" />
        <div className="absolute left-[6%] top-[36%] h-[480px] w-[480px] rounded-full bg-neutral-500/[0.1] blur-[160px]" />
        <div className="absolute bottom-[6%] left-[38%] h-[420px] w-[420px] rounded-full bg-neutral-700/[0.08] blur-[160px]" />
        <div
          className="absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_70%)] transition-transform duration-200"
          style={{ left: mouse.x, top: mouse.y }}
        />
      </div>
      {/* Intro overlay — sits between sidebar (z-56) and main (z-10), fades out after intro */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[54] bg-[#06090F]"
        initial={{ opacity: 1 }}
        animate={{ opacity: introComplete ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      <Sidebar items={NAV_ITEMS} activeId={activeSection} onSelect={scrollToSection} onIntroComplete={() => setIntroComplete(true)} />

      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <WhyMOA />
        <Retail />
        <BrandWall />
        <Attractions />
        <Dining />
        <Events />
        <Sponsorship />
        <Contact />
      </main>
    </div>
  );
}
