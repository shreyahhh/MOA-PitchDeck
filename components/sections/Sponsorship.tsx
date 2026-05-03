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
    <section id="sponsorship" className="h-[100svh] bg-[#07090F] px-[80px] py-[60px] flex flex-col gap-8 max-md:px-8">

      {/* Header */}
      <motion.div
        className="flex items-end justify-between"
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
        <div className="flex gap-10">
          {topStats.map(s => (
            <div key={s.label} className="text-right">
              <p className="text-2xl font-bold tracking-[-1px] text-[#FFD100]">{s.value}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/30">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tier cards */}
      <div className="grid gap-4 md:grid-cols-3" style={{ height: "300px" }}>
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            className="flex flex-col justify-between rounded-2xl p-6"
            style={{ background: "#ffffff", border: `2px solid ${t.color}` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: t.color }}>{t.name}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-black/30">{t.location}</p>
              </div>
              <p className="mt-4 font-bold leading-none tracking-[-2px] text-[#0D1F3C]" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
                {t.impressions}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-black/30">impressions / year</p>
            </div>
            <div className="flex gap-6 border-t border-black/8 pt-5">
              <div>
                <p className="text-xl font-bold" style={{ color: t.color }}>{t.cpm}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-black/30">CPM</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0D1F3C]">{t.storeVisits}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-black/30">Store Visits</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0D1F3C]">{t.activations}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-black/30">Activations</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CPM comparison compact row */}
      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {cpmBench.map(b => (
          <div key={b.label} className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/35">{b.label}</span>
              <span className="text-[10px] font-bold" style={{ color: b.color }}>${b.v}</span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (b.v / 55) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                style={{ background: b.color }}
              />
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
}
