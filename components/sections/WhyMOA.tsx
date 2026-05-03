"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import CountUp from "../ui/CountUp";

const TABS = [
  { id: "origin", label: "Visitor Origin" },
  { id: "age", label: "Age" },
  { id: "income", label: "Income" },
  { id: "dwell", label: "Dwell Time" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function OriginViz({ active }: { active: boolean }) {
  return (
    <motion.div
      key="origin"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex h-full w-full flex-col justify-center"
    >
      <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:gap-20">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">Regional Visitors</span>
          <div className="flex items-end gap-3">
            <span className="font-bold leading-none tracking-[-4px] text-white" style={{ fontSize: "clamp(80px,14vw,160px)" }}>
              {active ? <CountUp end={60} suffix="%" durationMs={1200} /> : "60%"}
            </span>
          </div>
          <span className="text-sm text-white/50">Within driving distance of MOA</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#FFD700]">Out-of-State Tourists</span>
          <div className="flex items-end gap-3">
            <span className="font-bold leading-none tracking-[-4px] text-[#FFD700]" style={{ fontSize: "clamp(80px,14vw,160px)" }}>
              {active ? <CountUp end={40} suffix="%" durationMs={1200} /> : "40%"}
            </span>
          </div>
          <span className="text-sm text-[#FFD700]/70">Destination visitors, not passersby</span>
        </div>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={active ? { width: "60%" } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
          className="h-full rounded-full bg-[#003DA5]"
        />
      </div>
      <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-white/40">
        Visitors from all 50 states and 80 countries annually — your brand reaches a genuinely global audience from a single location.
      </p>
    </motion.div>
  );
}

function AgeViz({ active }: { active: boolean }) {
  const bars = [
    { label: "18–34", value: 38, note: "Millennial core", color: "#C8102E" },
    { label: "35–54", value: 34, note: "Gen X spenders", color: "#003DA5" },
    { label: "55+", value: 18, note: "High discretionary", color: "#FFD100" },
    { label: "Under 18", value: 10, note: "Influence buyers", color: "#5A6A7A" },
  ];
  return (
    <motion.div
      key="age"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex h-full w-full flex-col justify-center gap-5"
    >
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex items-center gap-5">
          <span className="w-16 shrink-0 text-right text-sm font-semibold text-white/60">{bar.label}</span>
          <div className="relative flex-1 overflow-hidden rounded-full" style={{ height: "36px", background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={active ? { width: `${bar.value}%` } : { width: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              className="flex h-full items-center rounded-full px-4"
              style={{ background: bar.color }}
            >
              <span className="text-sm font-bold text-white">{bar.value}%</span>
            </motion.div>
          </div>
          <span className="hidden w-36 shrink-0 text-xs text-white/30 md:block">{bar.note}</span>
        </div>
      ))}
      <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-white/40">
        72% are 18–54 — the peak spending demographic — making MOA one of the highest-yield retail environments in America.
      </p>
    </motion.div>
  );
}

function IncomeViz({ active }: { active: boolean }) {
  return (
    <motion.div
      key="income"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex h-full w-full flex-col justify-center"
    >
      <div className="mb-8 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#FFD100]">Earn $75K or more</span>
        <div className="font-bold leading-none tracking-[-6px] text-[#FFD100]" style={{ fontSize: "clamp(100px,18vw,200px)" }}>
          {active ? <CountUp end={61} suffix="%" durationMs={1400} /> : "61%"}
        </div>
      </div>
      <div className="mb-8 flex gap-6">
        <div className="flex flex-col gap-1 border-l-2 border-[#C8102E] pl-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">$100K+</span>
          <span className="text-3xl font-bold text-white">{active ? <CountUp end={38} suffix="%" durationMs={1000} /> : "38%"}</span>
        </div>
        <div className="flex flex-col gap-1 border-l-2 border-[#003DA5] pl-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">$75K–$100K</span>
          <span className="text-3xl font-bold text-white">{active ? <CountUp end={23} suffix="%" durationMs={1000} /> : "23%"}</span>
        </div>
      </div>
      <p className="max-w-lg text-base font-light leading-relaxed text-white/40">
        Premium spending demographic — MOA visitors don&apos;t browse. They buy.
      </p>
    </motion.div>
  );
}

function DwellViz({ active }: { active: boolean }) {
  const stats = [
    { value: "3–4", unit: "hrs", label: "Average visit", accent: "#C8102E" },
    { value: "2.3", unit: "days", label: "With hotel stay", accent: "#003DA5" },
    { value: "68", unit: "%", label: "Return within 12 months", accent: "#FFD100" },
  ];
  return (
    <motion.div
      key="dwell"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex h-full w-full flex-col justify-center gap-8 md:flex-row md:items-center md:gap-12"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 40 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-end gap-2">
            <span className="font-bold leading-none tracking-[-3px] text-white" style={{ fontSize: "clamp(56px,9vw,96px)" }}>
              {s.value}
            </span>
            <span className="mb-2 text-2xl font-light" style={{ color: s.accent }}>{s.unit}</span>
          </div>
          <div className="h-0.5 w-12 rounded-full" style={{ background: s.accent }} />
          <span className="text-sm text-white/50">{s.label}</span>
        </motion.div>
      ))}
      <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/30 md:mt-0 md:self-end md:pb-4">
        Longest average dwell time of any US mall — more time means more exposure, more spend, more loyalty.
      </p>
    </motion.div>
  );
}

export default function WhyMOA() {
  const [activeTab, setActiveTab] = useState<TabId>("origin");
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, amount: 0.3 });

  return (
    <section
      id="why-moa"
      className="flex min-h-[100svh] flex-col overflow-hidden bg-[#06090F] px-[80px] py-[80px] max-md:px-8"
    >
      <div ref={headRef} className="mx-auto w-full max-w-6xl flex-1 flex flex-col">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]"
        >
          02 — WHY MOA
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="mt-4 text-5xl font-bold leading-tight tracking-[-2px] text-white md:text-[56px]">
              The audience behind the numbers.
            </h2>
            <p className="mt-3 text-lg font-light text-white/40">
              40 million visitors. Here is exactly who they are.
            </p>
          </div>
          <div className="flex flex-col items-start gap-0 md:items-end">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/30">Total since 1992</span>
            <span className="font-bold leading-none tracking-[-3px] text-white/80" style={{ fontSize: "clamp(40px,6vw,72px)" }}>
              {inView ? <CountUp end={1.2} decimals={1} suffix="B" durationMs={2000} /> : "1.2B"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex gap-1 border-b border-white/10 pb-0"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="relative px-5 pb-4 pt-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none"
              style={{ color: activeTab === tab.id ? "#ffffff" : "rgba(255,255,255,0.35)" }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8102E]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <div className="relative mt-10 flex-1" style={{ minHeight: "320px" }}>
          <AnimatePresence mode="wait">
            {activeTab === "origin" && <OriginViz active={activeTab === "origin"} />}
            {activeTab === "age" && <AgeViz active={activeTab === "age"} />}
            {activeTab === "income" && <IncomeViz active={activeTab === "income"} />}
            {activeTab === "dwell" && <DwellViz active={activeTab === "dwell"} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
