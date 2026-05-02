"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const mediaSlides = [
  { id: "marine",  number: "02", name: "Sea Life Aquarium",     video: "/brand/sea_life_aquarium.mp4", poster: "/crowd.jpg",    accent: "#FFD100", youtubeId: null },
  { id: "ifly",    number: "05", name: "iFly Indoor Skydiving", video: "/brand/ifly.mp4",              poster: "/moa-hall.jpg", accent: "#C8102E", youtubeId: null },
  { id: "flyover", number: "06", name: "FlyOver America",       video: null,                           poster: "/moa-hall.jpg", accent: "#003DA5", youtubeId: "SYjoJYN3-qU" },
];

const list = [
  { number: "01", name: "Nickelodeon Universe",    stat: "28 rides · 7 acres",          accent: "#C8102E" },
  { number: "02", name: "Sea Life Aquarium",       stat: "4,500+ marine animals",        accent: "#FFD100" },
  { number: "03", name: "LEGO Store",              stat: "34 ft robot · 2.8M bricks",    accent: "#C8102E" },
  { number: "04", name: "Crayola Experience",      stat: "Interactive art & play",        accent: "#003DA5" },
  { number: "05", name: "iFly Indoor Skydiving",   stat: "Indoor freefall experience",   accent: "#C8102E" },
  { number: "06", name: "FlyOver America",         stat: "Immersive flight simulation",   accent: "#003DA5" },
];

const DURATION = 6000;

export default function Attractions() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / DURATION) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(tick);
        setActive((a) => (a + 1) % mediaSlides.length);
      }
    }, 40);
    return () => clearInterval(tick);
  }, [active]);

  const current = mediaSlides[active];

  return (
    <section
      id="attractions"
      className="h-screen overflow-hidden flex flex-row bg-[#06090F] px-[80px] py-[64px] gap-12 max-md:px-8"
    >
      {/* ── LEFT: heading + full attraction list ── */}
      <div className="flex flex-col shrink-0 justify-between" style={{ width: "42%" }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">
              05 — ATTRACTIONS
            </p>
            <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-white md:text-[56px] leading-tight">
              A City Within a City
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/45 max-w-sm">
              Home to the largest indoor theme park in America, a world-class aquarium,
              and 20+ unique entertainment experiences.
            </p>
          </motion.div>

          {/* Attraction list */}
          <div className="mt-8 flex flex-col">
            {list.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group flex items-center justify-between py-3 border-t border-white/[0.07] cursor-default"
                style={{ borderTopColor: i === 0 ? "rgba(255,255,255,0.07)" : undefined }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-medium text-white/75 group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                </div>
                <span className="text-[11px] text-white/30 tracking-[0.05em] group-hover:text-white/50 transition-colors duration-200">
                  {item.stat}
                </span>
              </motion.div>
            ))}
            {/* bottom border */}
            <div className="border-t border-white/[0.07]" />
          </div>
        </div>

        {/* Stat pills */}
        <motion.div
          className="flex gap-3 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {["20+ Unique Experiences", "4,500+ Marine Animals", "28 Rides · 7 Acres"].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/40"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: contained media panel ── */}
      <div className="flex-1 flex flex-col min-w-0 gap-3">
        {/* Video frame — contained, NOT full-bleed */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{ borderRadius: "10px" }}
        >
          {/* Videos / iframes */}
          {mediaSlides.map((s, i) =>
            s.youtubeId ? (
              <div
                key={s.id}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 1.1s ease",
                  overflow: "hidden",
                  pointerEvents: i === active ? "none" : "none",
                }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${s.youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&playlist=${s.youtubeId}&modestbranding=1&iv_load_policy=3`}
                  allow="autoplay; encrypted-media"
                  style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: "200%", height: "200%",
                    transform: "translate(-50%, -50%)",
                    border: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ) : (
              <video
                key={s.id}
                autoPlay
                muted
                loop
                playsInline
                poster={s.poster}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 1.1s ease",
                }}
              >
                <source src={s.video!} type="video/mp4" />
              </video>
            )
          )}

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)",
              borderRadius: "inherit",
            }}
          />

          {/* Active slide name — bottom left of video */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "-label"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute", bottom: "24px", left: "24px" }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "2px", textTransform: "uppercase", color: "white",
              }}>
                {current.name}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab controls below the video */}
        <div
          className="flex shrink-0 overflow-hidden"
          style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {mediaSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                padding: "12px 16px",
                background: i === active ? "rgba(255,255,255,0.05)" : "transparent",
                border: "none",
                borderRight:
                  i < mediaSlides.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "none",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
                transition: "background 0.3s ease",
              }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px", fontWeight: 500,
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: i === active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
                transition: "color 0.3s ease",
              }}>
                {s.name}
              </span>
              {/* Progress bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {i === active && (
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      background: s.accent,
                      transition: "width 0.04s linear",
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
