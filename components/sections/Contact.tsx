"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Opening at MOA was the single best retail decision we made in a decade. The foot traffic is unmatched anywhere in the country.",
    author: "VP of Retail Expansion",
    company: "Major Sportswear Brand",
    since: "Tenant since 2009",
  },
  {
    quote: "Our MOA activation reached more engaged consumers in three days than our last six city tours combined. The density of qualified buyers is remarkable.",
    author: "Head of Brand Partnerships",
    company: "Global Consumer Goods Company",
    since: "Sponsor since 2018",
  },
  {
    quote: "We hosted our product launch in The Atrium and it trended nationally. No other venue could match MOA at that scale.",
    author: "Director of Events",
    company: "Consumer Technology Company",
    since: "Event Partner since 2021",
  },
];

const ctas = [
  {
    label: "Schedule a Leasing Call",
    desc: "Talk to our retail team about available spaces, lease terms, and prime corridor locations.",
  },
  {
    label: "Book a Venue Tour",
    desc: "Walk the property, meet the team, and see why the world's biggest brands stay for decades.",
  },
  {
    label: "Request Sponsorship Kit",
    desc: "Full media kit with activation options, floor plans, and detailed impression data.",
  },
];

const N = testimonials.length;

function circularOffset(i: number, idx: number) {
  const raw = ((i - idx) % N + N) % N;
  return raw > Math.floor(N / 2) ? raw - N : raw;
}

export default function Contact() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + N) % N);
  const next = () => setIdx(i => (i + 1) % N);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % N), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="contact" className="bg-[#07090F] px-[80px] py-[80px] max-md:px-8">

      {/* Header */}
      <div className="mb-12">
        <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">09 — LET&apos;S TALK</p>
        <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-white md:text-[56px]">
          Bring Your Brand<br />to America&apos;s Stage
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">
          Whether you&apos;re opening a flagship store, launching an activation, or booking the atrium for your next event — we&apos;re ready.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">

        {/* Left — 3D circular carousel */}
        <div className="flex flex-col gap-6">
          {/* Carousel track */}
          <div
            className="relative overflow-hidden"
            style={{ height: 320, perspective: "900px" }}
          >
            {testimonials.map((t, i) => {
              const offset = circularOffset(i, idx);
              return (
                <motion.div
                  key={i}
                  onClick={offset !== 0 ? () => setIdx(i) : undefined}
                  className="absolute top-0 flex flex-col"
                  style={{
                    width: 300,
                    height: 320,
                    left: "calc(50% - 150px)",
                    cursor: offset !== 0 ? "pointer" : "default",
                    transformOrigin: "center center",
                    padding: "28px 24px 28px 28px",
                    background: "transparent",
                    borderLeft: offset === 0 ? "4px solid #C8102E" : "4px solid rgba(200,16,46,0.25)",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: offset === 0 ? "-4px 0 24px rgba(200,16,46,0.18)" : "none",
                    transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                  }}
                  animate={{
                    x: offset * 306,
                    z: offset === 0 ? 0 : -160,
                    rotateY: -offset * 44,
                    opacity: offset === 0 ? 1 : 0.42,
                    scale: offset === 0 ? 1 : 0.84,
                  }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <p className="text-[40px] font-bold leading-none text-[#C8102E] opacity-60">&ldquo;</p>
                  <p className="mt-3 flex-1 text-[13px] font-light leading-[1.85] text-white/80">
                    {t.quote}
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-[12px] font-semibold text-white/70">{t.author}</p>
                    <p className="text-[11px] text-white/35">{t.company}</p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-[#C8102E]/60">{t.since}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-white/40 hover:text-white"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="h-[3px] rounded-full transition-all duration-300"
                  style={{ width: i === idx ? 24 : 8, background: i === idx ? "#C8102E" : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-white/40 hover:text-white"
            >
              ›
            </button>
          </div>
        </div>

        {/* Right — CTA stack */}
        <div className="flex flex-col gap-3">
          {ctas.map((cta, i) => (
            <motion.button
              key={cta.label}
              type="button"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left transition-all duration-200 hover:border-[#C8102E]/40 hover:bg-white/[0.07]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div>
                <h3 className="text-[14px] font-bold text-white transition-colors duration-200 group-hover:text-[#C8102E]">{cta.label}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-white/40">{cta.desc}</p>
              </div>
              <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/40 transition-all duration-200 group-hover:border-[#C8102E] group-hover:text-[#C8102E]">
                →
              </div>
            </motion.button>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div className="mt-16 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center">
        <p className="text-[12px] uppercase tracking-[0.2em] text-white/35">
          Mall of America · Bloomington, MN 55425
        </p>
        <p className="text-[11px] text-white/20">© 2025 Mall of America. All rights reserved.</p>
      </div>

    </section>
  );
}
