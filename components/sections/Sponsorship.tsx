"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const tiers = [
  {
    name: "Platinum",
    color: "#C8102E",
    impressions: "10M+",
    impressionsNum: 10,
    cpm: "$1.20",
    storeVisits: "180K",
    activations: "12 exclusive dates",
    location: "Full Atrium Takeover",
    desc: "Full atrium takeover, custom build, exclusive activation dates",
  },
  {
    name: "Gold",
    color: "#003DA5",
    impressions: "4M+",
    impressionsNum: 4,
    cpm: "$2.50",
    storeVisits: "72K",
    activations: "6 premium dates",
    location: "Prime Corridor Placement",
    desc: "Prime corridor placement, branded activations, premium positioning",
  },
  {
    name: "Silver",
    color: "#FFD100",
    impressions: "1.5M+",
    impressionsNum: 1.5,
    cpm: "$4.80",
    storeVisits: "27K",
    activations: "Rotating schedule",
    location: "Digital Signage Network",
    desc: "Digital signage network, rotating brand moments across the property",
  },
];

const headerStats = [
  { value: "32M", label: "Activation touchpoints" },
  { value: "40M", label: "Annual footfall" },
  { value: "80+", label: "Countries represented" },
  { value: "68%", label: "Visitor return rate" },
];

const cpmBenchmarks = [
  { label: "MOA Sponsorship", value: null },
  { label: "National OOH Avg", value: "$8.40" },
  { label: "Prime NYC Billboard", value: "$52" },
  { label: "Super Bowl (per 1K)", value: "$35" },
];

export default function Sponsorship() {
  const [brand, setBrand] = useState("");
  const [activeTier, setActiveTier] = useState(0);
  const tier = tiers[activeTier];

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

        {/* Impact Estimator */}
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F1A]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Tier selector */}
          <div className="flex items-center gap-3 border-b border-white/10 px-8 py-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/30">Select Package</span>
            <div className="flex gap-2 ml-2">
              {tiers.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTier(i)}
                  className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-250"
                  style={
                    i === activeTier
                      ? { background: t.color, color: "#fff", border: `1px solid ${t.color}` }
                      : { background: "transparent", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.12)" }
                  }
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-white/10">

            {/* Left — brand preview */}
            <div className="flex flex-col items-center justify-center px-8 py-10 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`loc-${activeTier}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: tier.color }}
                >
                  {tier.location}
                </motion.p>
              </AnimatePresence>
              <motion.p
                key={brand + activeTier}
                initial={{ opacity: 0.5, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="mt-4 font-bold uppercase tracking-[0.14em] text-[#FFD100]"
                style={{ fontSize: "clamp(24px, 5vw, 60px)", lineHeight: 1.1, wordBreak: "break-word" }}
              >
                {brand || "YOUR BRAND"}
              </motion.p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/20">Mall of America · Bloomington, MN</p>
              <div className="mt-6 flex w-full max-w-xs items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5">
                <span className="text-[11px] text-white/30">Brand</span>
                <input
                  value={brand}
                  onChange={e => setBrand(e.target.value.toUpperCase())}
                  placeholder="Type your brand..."
                  className="flex-1 bg-transparent text-sm uppercase tracking-[0.1em] text-white outline-none placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Right — live metrics */}
            <div className="px-8 py-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">Projected Annual Impact</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTier}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 grid grid-cols-2 gap-5"
                >
                  <div>
                    <p className="text-3xl font-bold text-white">{tier.impressions}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">Impressions / year</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{tier.storeVisits}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">Store visits influenced</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold" style={{ color: tier.color }}>{tier.cpm}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">CPM (cost per 1K impressions)</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{tier.activations}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">Activations included</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CPM comparison */}
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/25">CPM vs. Comparable Media</p>
                <div className="flex flex-col gap-2">
                  {cpmBenchmarks.map(b => (
                    <div key={b.label} className="flex items-center gap-3">
                      <span className="w-44 text-[11px] text-white/50">{b.label}</span>
                      <div className="flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: b.value
                              ? `${Math.min(100, (parseFloat(b.value.replace("$", "")) / 55) * 100)}%`
                              : `${(parseFloat(tier.cpm.replace("$", "")) / 55) * 100}%`,
                            background: b.value ? "rgba(255,255,255,0.25)" : tier.color,
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                      <span className="w-12 text-right text-[11px] font-semibold" style={{ color: b.value ? "rgba(255,255,255,0.4)" : tier.color }}>
                        {b.value ?? tier.cpm}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tiers */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-6 cursor-pointer transition-colors duration-200"
              style={{ borderTopColor: t.color, borderTopWidth: "2px", background: i === activeTier ? "rgba(255,255,255,0.05)" : undefined }}
              onClick={() => setActiveTier(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: t.color }}>{t.name}</p>
              <div>
                <p className="text-3xl font-bold text-white">{t.impressions}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">impressions / year</p>
              </div>
              <p className="text-[14px] leading-relaxed text-white/55">{t.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
