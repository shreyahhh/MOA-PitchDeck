"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const tiers = [
  { name: "Platinum", color: "#C8102E", impressions: "10M+", desc: "Full atrium takeover, custom build, exclusive activation dates" },
  { name: "Gold", color: "#003DA5", impressions: "4M+", desc: "Prime corridor placement, branded activations, premium positioning" },
  { name: "Silver", color: "#FFD100", impressions: "1.5M+", desc: "Digital signage network, rotating brand moments across the property" },
];

const headerStats = [
  { value: "32M", label: "Activation touchpoints" },
  { value: "40M", label: "Annual footfall" },
  { value: "80+", label: "Countries represented" },
  { value: "68%", label: "Visitor return rate" },
];

export default function Sponsorship() {
  const [brand, setBrand] = useState("");

  return (
    <section id="sponsorship" className="min-h-[100svh] bg-[#050810] px-[80px] py-[80px] max-md:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">08 — SPONSORSHIP</p>
            <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-white md:text-[56px]">
              Your Brand.<br />America&apos;s Stage.
            </h2>
          </div>
          <div className="flex flex-wrap gap-6">
            {headerStats.map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-[#FFD100]">{s.value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Marquee Visualizer */}
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F1A]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex min-h-[220px] flex-col items-center justify-center px-8 py-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/25">See your brand name on MOA signage</p>
            <motion.p
              key={brand}
              initial={{ opacity: 0.4, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="mt-5 text-center font-bold uppercase tracking-[0.18em] text-[#FFD100]"
              style={{ fontSize: "clamp(28px, 6vw, 72px)", wordBreak: "break-word", lineHeight: 1.1 }}
            >
              {brand || "YOUR BRAND HERE"}
            </motion.p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/15">Mall of America · Bloomington, MN</p>
          </div>
          <div className="flex items-center gap-3 border-t border-white/10 px-8 py-4">
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/25">Brand Name</span>
            <input
              value={brand}
              onChange={e => setBrand(e.target.value.toUpperCase())}
              placeholder="Type here..."
              className="flex-1 bg-transparent text-sm uppercase tracking-[0.15em] text-white outline-none placeholder:text-white/20"
            />
          </div>
        </motion.div>

        {/* Tiers */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              style={{ borderTopColor: tier.color, borderTopWidth: "2px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: tier.color }}>{tier.name}</p>
              <div>
                <p className="text-3xl font-bold text-white">{tier.impressions}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">impressions / year</p>
              </div>
              <p className="text-[14px] leading-relaxed text-white/55">{tier.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
