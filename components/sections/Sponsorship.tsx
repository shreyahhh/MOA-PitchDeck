"use client";

import { motion } from "framer-motion";

const tiers = [
  { name: "Platinum", color: "#C8102E", impressions: "10M+", cpm: "$1.20", cpmNum: 1.2, storeVisits: "180K", activations: "12", location: "Full Atrium Takeover" },
  { name: "Gold",     color: "#FFD100", impressions: "4M+",  cpm: "$2.50", cpmNum: 2.5, storeVisits: "72K",  activations: "6",  location: "Prime Corridor" },
  { name: "Silver",   color: "#003DA5", impressions: "1.5M+",cpm: "$4.80", cpmNum: 4.8, storeVisits: "27K",  activations: "∞",  location: "Digital Network" },
];

const topStats = [
  { value: "40M",  label: "Annual Footfall" },
  { value: "32M",  label: "Touchpoints" },
  { value: "80+",  label: "Countries" },
  { value: "68%",  label: "Return Rate" },
];

const cpmBench = [
  { label: "MOA Platinum", v: 1.2,  color: "#C8102E" },
  { label: "National OOH", v: 8.4,  color: "rgba(255,255,255,0.2)" },
  { label: "NYC Billboard", v: 52,  color: "rgba(255,255,255,0.2)" },
  { label: "Super Bowl",   v: 35,   color: "rgba(255,255,255,0.2)" },
];

export default function Sponsorship() {
  return (
    <section id="sponsorship" className="min-h-[100svh] md:h-[100svh] bg-[#07090F] px-[80px] py-[60px] flex flex-col gap-8 max-md:px-6 max-md:py-12">

      {/* Header */}
      <motion.div
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">08 SPONSORSHIP</p>
          <h2 className="mt-3 font-bold tracking-[-2px] text-white" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
            America&apos;s Biggest Stage.
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-10">
          {topStats.map(s => (
            <div key={s.label} className="text-right">
              <p className="text-2xl font-bold tracking-[-1px] text-[#FFD100]">{s.value}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/30">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tier cards */}
      <div className="grid flex-1 gap-4 md:grid-cols-3 max-md:grid-cols-1" style={{ minHeight: "220px", maxHeight: "420px" }}>
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            className="flex flex-col justify-between"
            style={{
              background: "transparent",
              borderLeft: `4px solid ${t.color}`,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              boxShadow: `-4px 0 24px ${t.color}30`,
              padding: "24px 24px 24px 28px",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: t.color }}>{t.name}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">{t.location}</p>
              </div>
              <p className="mt-4 font-bold leading-none tracking-[-2px] text-white" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
                {t.impressions}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">impressions / year</p>
            </div>
            <div className="flex gap-6 border-t border-white/8 pt-5">
              <div>
                <p className="text-xl font-bold" style={{ color: t.color }}>{t.cpm}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/30">CPM</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{t.storeVisits}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/30">Store Visits</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{t.activations}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/30">Activations</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CPM comparison */}
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/25">CPM Benchmark</p>
        {cpmBench.map((b, idx) => {
          const isMoa = idx === 0;
          const pct = Math.min(100, (b.v / 55) * 100);
          const multiplier = idx > 0 ? `${Math.round(b.v / 1.2)}× more` : "Best in class";
          return (
            <div key={b.label} className="flex items-center gap-4">
              <span className="w-[130px] shrink-0 text-[11px] uppercase tracking-[0.12em]" style={{ color: isMoa ? "#C8102E" : "rgba(255,255,255,0.35)" }}>{b.label}</span>
              <div className="relative h-[3px] flex-1 overflow-hidden bg-white/[0.06]">
                <motion.div className="absolute left-0 top-0 h-full" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 + idx * 0.08 }} style={{ background: isMoa ? "#C8102E" : "rgba(255,255,255,0.18)" }} />
              </div>
              <span className="w-[72px] shrink-0 text-right text-[11px] font-bold" style={{ color: isMoa ? "#C8102E" : "rgba(255,255,255,0.4)" }}>${b.v}</span>
              <span className="w-[80px] shrink-0 text-right text-[9px] uppercase tracking-[0.15em]" style={{ color: isMoa ? "#C8102E" : "rgba(255,255,255,0.2)" }}>{multiplier}</span>
            </div>
          );
        })}
      </motion.div>

    </section>
  );
}
