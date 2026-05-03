"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavbarProps = {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
};

const SHOW_DURATION_MS = 2600;
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Navbar({ items, activeId, onSelect }: NavbarProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setCollapsed(true), SHOW_DURATION_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    /* z-[55]: above main content (z-10) and sidebar (z-40), below mobile overlay (z-[60]) */
    <motion.header
      className="fixed left-0 right-0 top-0 z-[55] will-change-transform"
      initial={{ y: "-100%" }}
      animate={{ y: collapsed ? "-100%" : "0%" }}
      transition={{ duration: 0.55, ease }}
    >
      {/* Backdrop layer — prevents navbar from visually bleeding into sections */}
      <div
        className="flex h-[60px] items-center justify-between px-[80px] max-md:px-6"
        style={{
          background: "rgba(5, 7, 12, 0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Logo */}
        <Image
          src="/moa-logo1.png"
          alt="Mall of America"
          width={130}
          height={40}
          className="h-auto w-[110px] object-contain object-left"
          priority
        />

        {/* Nav items */}
        <nav className="flex items-center gap-8 max-md:hidden">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className="cursor-pointer bg-transparent border-none p-0 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200"
              style={{ color: activeId === item.id ? "#ffffff" : "rgba(255,255,255,0.4)" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right badge */}
        <span className="hidden text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C8102E] md:block">
          Confidential · 2025
        </span>
      </div>
    </motion.header>
  );
}
