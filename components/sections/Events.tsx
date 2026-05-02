"use client";

import { motion } from "framer-motion";

// Swap src below for a dedicated events highlight reel when available
const VIDEO_SRC = "https://www.youtube-nocookie.com/embed/oIoBwLK8JqM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&playlist=oIoBwLK8JqM&modestbranding=1&iv_load_policy=3";

const eventTypes = [
  "Product Launches",
  "Celebrity Appearances",
  "Concerts & Live Shows",
  "Brand Activations",
  "Pop-Up Retail",
];

const venues = [
  { name: "TCF Rotunda",  capacity: "3,000",  detail: "Prime atrium activation space" },
  { name: "The Atrium",   capacity: "10,000", detail: "Full-scale concerts & premieres" },
  { name: "East Broadway", capacity: "Custom", detail: "Experiential corridor activations" },
];

export default function Events() {
  return (
    <section id="events" className="relative h-screen overflow-hidden bg-black">

      {/* Background video */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <iframe
          className="absolute left-1/2 top-1/2 h-[175%] w-[175%] -translate-x-1/2 -translate-y-1/2"
          src={VIDEO_SRC}
          title="Events"
          allow="autoplay; encrypted-media"
          loading="eager"
        />
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.2) 100%)" }} />
      <div className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 45%)" }} />

      <div className="relative z-10 flex h-full flex-col justify-between px-[80px] py-[72px] max-md:px-8">

        {/* Top: heading + stat */}
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">07 — EVENTS</p>
            <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-white md:text-[56px] leading-tight">
              Host. Launch.<br />Activate.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden md:flex flex-col items-end"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">Events hosted annually</p>
            <p
              className="font-bold leading-none tracking-[-4px] text-white"
              style={{ fontSize: "clamp(64px, 9vw, 110px)" }}
            >
              400+
            </p>
          </motion.div>
        </div>

        {/* Middle: event type pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {eventTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/55"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {type}
            </span>
          ))}
        </motion.div>

        {/* Bottom: venue cards + CTA */}
        <div>
          <div className="grid gap-3 md:grid-cols-3">
            {venues.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="rounded-xl border p-5"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">{v.name}</p>
                <p className="mt-2 text-3xl font-bold tracking-[-1px] text-white">{v.capacity}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-white/45">{v.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 flex items-center gap-4"
          >
            <button
              style={{
                padding: "12px 28px",
                background: "#C8102E",
                border: "none",
                borderRadius: "4px",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Book a Venue
            </button>
            <button
              style={{
                padding: "12px 28px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "4px",
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              View Past Events
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
