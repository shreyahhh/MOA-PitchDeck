"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


const diningStats = [
  { value: "50+", label: "Restaurants & Cafés" },
  { value: "2×", label: "Longer dwell with dining" },
  { value: "$42", label: "Avg food & bev spend" },
  { value: "12M", label: "Annual dining visits" },
];

const outerPlates = ["/food/1.png","/food/2.png","/food/3.png","/food/4.png","/food/5.png","/food/6.png","/food/7.png"];
const innerPlates = ["/food/14.webp","/food/9.png","/food/10.png","/food/15.png","/food/12.png","/food/16.png"];

const OUTER_R = 300, INNER_R = 95, OUTER_SIZE = 190, INNER_SIZE = 165;
const W = OUTER_R * 2 + OUTER_SIZE, H = W;
const CX = OUTER_R + OUTER_SIZE / 2, CY = CX;

const restaurantGroups = [
  [
    { name: "P.F. Chang's",         icon: "/icons/pfchang.jpg" },
    { name: "Shake Shack",          icon: "/icons/shakeshack.jpg" },
    { name: "Bubba Gump",           icon: "/icons/bubbagump.jpg" },
    { name: "Läderach",             icon: "/icons/laderach.png" },
  ],
  [
    { name: "Sweet Paris",          icon: "/icons/sweetparis.png" },
    { name: "Cheesecake Factory",   icon: "/icons/cheesecakefactory.jpg" },
    { name: "Benihana",             icon: "/icons/benihana.jpeg" },
    { name: "Crave",                icon: "/icons/crave.jpg" },
  ],
  [
    { name: "Twin City Grill",      icon: "/icons/twincitygrill.png" },
    { name: "Buffalo Wild Wings",   icon: "/icons/bufflowildwings.jpg" },
    { name: "Noodles & Co.",        icon: "/icons/noodles.jpg" },
    { name: "Cantina Laredo",       icon: "/icons/cantina.jpg" },
  ],
  [
    { name: "Hooters",              icon: "/icons/hooters.jpg" },
    { name: "Chipotle",             icon: "/icons/chipotle.jpg" },
    { name: "Panda Express",        icon: "/icons/pandaexpress.jpg" },
    { name: "Subway",               icon: "/icons/subway.jpg" },
  ],
];

function RestaurantTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % restaurantGroups.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/40">Featured Restaurants</p>
      <div style={{ height: 96, overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -28, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "row", gap: 12, alignItems: "center" }}
          >
            {restaurantGroups[idx].map(r => (
              <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                <div style={{ width: 56, height: 56, flexShrink: 0, borderRadius: 10, background: "#ffffff", overflow: "hidden" }}>
                  <img src={r.icon} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", mixBlendMode: "multiply" }} loading="lazy" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Dining() {
  return (
    <section
      id="dining"
      className="min-h-[100svh] bg-[#07090F] px-[80px] py-[80px] max-md:px-8"
      style={{ position: "relative", overflow: "hidden", width: "100%" }}
    >
      <style>{`
        @keyframes ring-cw  { to { transform: rotate(360deg);  } }
        @keyframes ring-ccw { to { transform: rotate(-360deg); } }
        .orbit-outer { animation: ring-cw  24s linear infinite; position: absolute; inset: 0; }
        .orbit-inner { animation: ring-ccw 16s linear infinite; position: absolute; inset: 0; }
        .counter-cw  { animation: ring-ccw 24s linear infinite; width: 100%; height: 100%; }
        .counter-ccw { animation: ring-cw  16s linear infinite; width: 100%; height: 100%; }
      `}</style>

      {/* Strawberry background */}
      <div style={{
        position: "absolute", top: 0, left: "calc(50% - 50vw)",
        width: "45vw", height: "100%",
        backgroundImage: "url(/food/strawberry.png)", backgroundSize: "cover",
        backgroundPosition: "center", backgroundRepeat: "no-repeat",
        opacity: 0.18, pointerEvents: "none", zIndex: 0,
      }} />

      {/* Two nested rings right side, clipped — hidden on mobile */}
      <motion.div
        className="max-md:hidden"
        style={{ position: "absolute", right: -(OUTER_R + OUTER_SIZE / 2), top: "50%", marginTop: -(H / 2), width: W, height: H, zIndex: 1 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Outer ring */}
        <div className="orbit-outer" style={{ width: W, height: H }}>
          {outerPlates.map((src, i) => {
            const a = (i * 2 * Math.PI) / outerPlates.length;
            return (
              <div key={src} style={{ position: "absolute", left: CX + OUTER_R * Math.sin(a) - OUTER_SIZE / 2, top: CY - OUTER_R * Math.cos(a) - OUTER_SIZE / 2, width: OUTER_SIZE, height: OUTER_SIZE }}>
                <div className="counter-cw">
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Inner ring */}
        <div className="orbit-inner" style={{ width: W, height: H }}>
          {innerPlates.map((src, i) => {
            const a = (i * 2 * Math.PI) / innerPlates.length;
            return (
              <div key={src} style={{ position: "absolute", left: CX + INNER_R * Math.sin(a) - INNER_SIZE / 2, top: CY - INNER_R * Math.cos(a) - INNER_SIZE / 2, width: INNER_SIZE, height: INNER_SIZE }}>
                <div className="counter-ccw">
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="flex flex-col gap-8 max-md:!pr-0"
          style={{ paddingRight: "340px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">06 DINING & LIFESTYLE</p>
            <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-white md:text-[56px]">
              50+ Culinary<br />Experiences
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">
              From Michelin-cited chef tables to beloved fast-casual brands MOA&apos;s dining scene is a destination in itself, not an afterthought.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
            {diningStats.map(s => (
              <div key={s.label}>
                <p className="text-4xl font-bold tracking-[-1px] text-white">{s.value}</p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
          <RestaurantTicker />
        </motion.div>
      </div>
    </section>
  );
}
