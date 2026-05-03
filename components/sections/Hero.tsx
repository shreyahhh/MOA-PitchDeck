"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CountUp from "../ui/CountUp";

const stats = [
  { end: 40,  suffix: "M+", label: "Annual Visitors",         decimals: 0 },
  { end: 520, suffix: "+",  label: "Stores & Brands",         decimals: 0 },
  { end: 32,  suffix: "M",  label: "Brand Activation Guests", decimals: 0 },
  { end: 5.6, suffix: "M",  label: "Square Feet",             decimals: 1 },
];

type YtPlayer = {
  mute: () => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getAvailableQualityLevels?: () => string[];
  setPlaybackQuality?: (quality: string) => void;
};
type YtPlayerConstructor = new (el: HTMLElement, opts: { events?: { onReady?: (e: { target: YtPlayer }) => void } }) => YtPlayer;
type YtApi = { Player: YtPlayerConstructor };

export default function Hero() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const trimRef = useRef<number | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setInView(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const win = window as Window & { YT?: YtApi; onYouTubeIframeAPIReady?: () => void };

    const startTrim = () => {
      if (trimRef.current) clearInterval(trimRef.current);
      trimRef.current = window.setInterval(() => {
        const p = playerRef.current;
        if (!p?.getDuration || !p?.getCurrentTime) return;
        if (p.getDuration() > 15 && p.getCurrentTime() >= p.getDuration() - 12) p.seekTo(0, true);
      }, 300);
    };

    const init = () => {
      if (!iframeRef.current || !win.YT?.Player || playerRef.current) return;
      playerRef.current = new win.YT.Player(iframeRef.current, {
        events: {
          onReady: (e) => {
            e.target.mute();
            const tryQ = () => {
              const levels = e.target.getAvailableQualityLevels?.();
              if (!levels?.length) return;
              const pick = ["highres","hd1080","hd720","large"].find(q => levels.includes(q)) ?? levels[0];
              e.target.setPlaybackQuality?.(pick);
            };
            tryQ(); setTimeout(tryQ, 400);
            startTrim();
          },
        },
      });
    };

    if (win.YT?.Player) { init(); }
    else {
      win.onYouTubeIframeAPIReady = init;
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.body.appendChild(s);
    }
    return () => { if (trimRef.current) clearInterval(trimRef.current); };
  }, []);

  const ease: [number,number,number,number] = [0.25, 0.46, 0.45, 0.94];
  const from = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease },
  });

  return (
    <section id="overview" className="relative h-screen overflow-hidden bg-black">

      {/* Background video */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <iframe
          ref={iframeRef}
          className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube-nocookie.com/embed/oIoBwLK8JqM?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1"
          title="Mall of America"
          allow="autoplay; encrypted-media"
          loading="eager"
        />
      </div>

      {/* Left vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.1) 100%)" }} />
      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 28%, transparent 55%)" }} />
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%)" }} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col px-[80px] pb-0 pt-8 max-md:px-8">

        {/* Logo */}
        <motion.div {...from(0.2)} className="shrink-0">
          <Image
            src="/moa-logo1.png"
            alt="Mall of America"
            width={200}
            height={60}
            className="h-auto w-[160px] object-contain object-left"
            priority
          />
        </motion.div>

        {/* Headline block */}
        <div className="flex flex-1 flex-col justify-center" style={{ maxWidth: "min(680px, 60vw)" }}>

          <motion.p {...from(0.35)}
            className="text-[11px] uppercase tracking-[0.36em]"
            style={{ color: "#C8102E" }}
          >
            America&apos;s #1 Destination &nbsp;·&nbsp; Bloomington, MN
          </motion.p>

          <motion.h1 {...from(0.5)}
            className="mt-4 font-bold leading-[1.0] tracking-[-3px] text-white"
            style={{ fontSize: "clamp(52px, 7.5vw, 100px)" }}
          >
            This is not<br />a mall.
          </motion.h1>

          <motion.p {...from(0.72)}
            className="mt-3 font-bold leading-tight tracking-[-1px]"
            style={{ fontSize: "clamp(26px, 3.5vw, 46px)", color: "#FFD100" }}
          >
            It&apos;s America&apos;s stage.
          </motion.p>

          <motion.p {...from(0.9)}
            className="mt-5 leading-relaxed text-white/55"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: "480px" }}
          >
            The most visited retail destination in the western hemisphere
            where 40 million visitors a year meet the world&apos;s greatest brands.
          </motion.p>

          <motion.div {...from(1.1)} className="mt-8 flex items-center gap-4">
            <button
              style={{
                padding: "13px 28px",
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
              Explore Partnerships
            </button>
            <button
              style={{
                padding: "13px 28px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "4px",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              View Leasing
            </button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.3, ease }}
          className="shrink-0 flex border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 py-5"
              style={{
                flex: 1,
                paddingLeft: i === 0 ? 0 : "32px",
                paddingRight: "32px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}
            >
              <span
                className="font-bold leading-none tracking-[-1.5px] text-white"
                style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
              >
                {inView
                  ? <CountUp end={s.end} suffix={s.suffix} decimals={s.decimals} durationMs={1400} />
                  : `${s.end}${s.suffix}`}
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}
