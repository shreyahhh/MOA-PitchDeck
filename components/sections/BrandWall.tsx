"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const easeBrand: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/** Brand story loop — match Hero slide / exit timing */
const BRAND_INTRO_DELAY_S = 0.8;
const BRAND_MOTION_DURATION_S = 0.7;
const BRAND_INTRO_HOLD_MS = 2200;
const BRAND_INTRO_ENTER_DONE_MS = 800 + 700;
const BRAND_INTRO_EXIT_TOTAL_MS = 450 + 80;

const BRAND_TRIO_HOLD_MS = 2200;
/** Last trio line in: delay 1.8s + duration 0.7s */
const BRAND_TRIO_ENTER_DONE_MS = 1800 + 700;
const BRAND_TRIO_EXIT_TOTAL_MS = 280 * 2 + 450 + 80;

/** Intro + trio share MOA yellow (readable on dark video) */
const brandKickerClass =
  "text-center text-[13px] uppercase tracking-[0.32em] text-[#FFD100]";
const brandIntroKickerClass = `${brandKickerClass} mx-auto max-w-lg px-2 leading-relaxed`;

const luxuryVideos = [
  { name: "Burberry", src: "/brand/burberry.mp4" },
  { name: "Givenchy", src: "/brand/givenchy.mp4" },
  { name: "Gucci", src: "/brand/gucci.mp4" },
  { name: "Prada", src: "/brand/prada.mp4" },
  { name: "Valentino", src: "/brand/valentino.mp4" },
];

type TenantStory = {
  id: string;
  brand: string;
  since: string;
  size: string;
  stat: string;
  statLabel: string;
  quote: string;
  videoSrc: string;
  accentColor: string;
};

/** Tenant proof carousel — slow fade between stories */
const TENANT_STORY_HOLD_MS = 10000;

const tenantStories: TenantStory[] = [
  {
    id: "nike",
    brand: "NIKE",
    since: "2004",
    size: "8,200 sq ft",
    stat: "2.1M+",
    statLabel: "Annual Store Visitors",
    quote: "Highest Nike footfall per sq ft outside New York City.",
    videoSrc: "/brand/nike.mp4",
    accentColor: "#C8102E",
  },
  {
    id: "apple",
    brand: "APPLE",
    since: "2001",
    size: "7,800 sq ft",
    stat: "3.2M+",
    statLabel: "Annual Store Visitors",
    quote: "Top 5 performing Apple Store in North America by revenue per sq ft.",
    videoSrc: "/brand/apple.mp4",
    accentColor: "#555555",
  },
  {
    id: "lululemon",
    brand: "LULULEMON",
    since: "2011",
    size: "6,400 sq ft",
    stat: "1.4M+",
    statLabel: "Annual Store Visitors",
    quote: "Experiential flagship with in-store café drives 40% longer dwell time.",
    videoSrc: "/brand/lululemon.mp4",
    accentColor: "#FFFFFF",
  },
  {
    id: "nordstrom",
    brand: "NORDSTROM",
    since: "1992",
    size: "225,000 sq ft",
    stat: "30+",
    statLabel: "Years as Anchor Tenant",
    quote:
      "Three floors, five restaurants, 45 cosmetic brands. The gold standard of department store retail.",
    videoSrc: "/brand/nordstrom.mp4",
    accentColor: "#003DA5",
  },
  {
    id: "lego",
    brand: "LEGO",
    since: "1992",
    size: "First US Flagship",
    stat: "2.8M",
    statLabel: "Bricks in the 34ft Robot",
    quote: "One of the most photographed retail spaces in America.",
    videoSrc: "/brand/lego.mp4",
    accentColor: "#FFD100",
  },
];

function TenantSuccessStories() {
  const nStories = tenantStories.length;
  const [storyIndex, setStoryIndex] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const isBlockInView = useInView(blockRef, { amount: 0.15, margin: "-60px" });

  useEffect(() => {
    if (!isBlockInView) return;
    const id = window.setInterval(() => {
      setStoryIndex((i) => (i + 1) % nStories);
    }, TENANT_STORY_HOLD_MS);
    return () => window.clearInterval(id);
  }, [isBlockInView, storyIndex, nStories]);

  const tenant = tenantStories[storyIndex];

  return (
    <div
      ref={blockRef}
      className="relative w-full overflow-hidden bg-[#07090F]"
      style={{ minHeight: "min(100svh, 900px)" }}
    >
      {/* Full-height video — right half */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%]">
        <AnimatePresence mode="wait">
          <motion.video
            key={tenant.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full w-full object-cover"
            src={tenant.videoSrc}
          />
        </AnimatePresence>
        {/* Gradient fade left edge into dark bg on desktop */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07090F] to-transparent max-lg:hidden" />
        {/* Gradient fade bottom on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#07090F] via-[#07090F]/80 to-transparent lg:hidden" />
      </div>

      {/* Content — left half */}
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col px-[64px] py-[64px] max-md:px-8 lg:max-w-[52%]">
        {/* Header */}
        <div className="shrink-0">
          <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">
            PROOF OF PERFORMANCE
          </p>
          <h2
            className="mt-3 font-bold leading-[1.15] tracking-[-1px] text-white"
            style={{ fontSize: "clamp(20px, 2.2vw, 30px)" }}
          >
            The brands that chose MOA — and never left.
          </h2>
        </div>

        {/* Brand content — vertically centered */}
        <div className="flex flex-1 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={tenant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex w-full flex-col"
              style={{ gap: "20px" }}
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                Since {tenant.since} · {tenant.size}
              </p>

              <div className="h-[3px] w-10 rounded-full" style={{ background: tenant.accentColor }} />

              <p
                className="font-bold leading-none tracking-[-1.5px] text-white"
                style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
              >
                {tenant.brand}
              </p>

              <div className="flex flex-col" style={{ gap: "6px" }}>
                <p
                  className="font-extralight leading-none tracking-[-1.5px]"
                  style={{ fontSize: "clamp(28px, 4vw, 50px)", color: tenant.accentColor }}
                >
                  {tenant.stat}
                </p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                  {tenant.statLabel}
                </p>
              </div>

              <p
                className="text-[15px] font-light italic leading-[1.8] text-white/60"
                style={{
                  borderLeft: `2px solid ${tenant.accentColor}`,
                  paddingLeft: "18px",
                  maxWidth: "380px",
                }}
              >
                &ldquo;{tenant.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Brand selector tabs */}
        <div className="mt-8 flex shrink-0 flex-wrap gap-2">
          {tenantStories.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStoryIndex(i)}
              className="rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none"
              style={
                i === storyIndex
                  ? { background: s.accentColor === "#FFFFFF" ? "rgba(255,255,255,0.15)" : s.accentColor, borderColor: s.accentColor, color: "#fff" }
                  : { background: "transparent", borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }
              }
            >
              {s.brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrandWall() {
  // carousel state kept for easy re-enable
  const [secondaryVideoIndex, setSecondaryVideoIndex] = useState(0);
  const secondarySectionRef = useRef<HTMLElement>(null);
  const [isSecondaryVisible, setIsSecondaryVisible] = useState(false);
  const leftSecondaryVideoRef = useRef<HTMLVideoElement>(null);
  const rightSecondaryVideoRef = useRef<HTMLVideoElement>(null);
  const secondaryEndedGuardRef = useRef(false);
  const [brandCopyPhase, setBrandCopyPhase] = useState<"intro" | "trio">("intro");
  const [introExiting, setIntroExiting] = useState(false);
  const [trioExiting, setTrioExiting] = useState(false);
  const [brandCopyCycle, setBrandCopyCycle] = useState(0);

  /* carousel interval — disabled */
  // useEffect(() => {
  //   const intervalId = window.setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % carouselVideos.length);
  //   }, 3500);
  //   return () => window.clearInterval(intervalId);
  // }, []);

  /* carousel play/pause — disabled */
  // useEffect(() => {
  //   carouselVideoRefs.current.forEach((videoEl, idx) => {
  //     if (idx === activeIndex) { videoEl.loop = true; void videoEl.play().catch(() => {}); }
  //     else { videoEl.pause(); videoEl.loop = false; }
  //   });
  // }, [activeIndex]);

  useEffect(() => {
    const section = secondarySectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSecondaryVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isSecondaryVisible) {
      setBrandCopyPhase("intro");
      setIntroExiting(false);
      setTrioExiting(false);
      setBrandCopyCycle(0);
    }
  }, [isSecondaryVisible]);

  useEffect(() => {
    if (!isSecondaryVisible || brandCopyPhase !== "intro" || introExiting) return;
    const id = window.setTimeout(() => {
      setIntroExiting(true);
    }, BRAND_INTRO_ENTER_DONE_MS + BRAND_INTRO_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [isSecondaryVisible, brandCopyPhase, introExiting, brandCopyCycle]);

  useEffect(() => {
    if (!introExiting) return;
    const id = window.setTimeout(() => {
      setIntroExiting(false);
      setBrandCopyPhase("trio");
    }, BRAND_INTRO_EXIT_TOTAL_MS);
    return () => window.clearTimeout(id);
  }, [introExiting]);

  useEffect(() => {
    if (!isSecondaryVisible || brandCopyPhase !== "trio" || trioExiting) return;
    const id = window.setTimeout(() => {
      setTrioExiting(true);
    }, BRAND_TRIO_ENTER_DONE_MS + BRAND_TRIO_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [isSecondaryVisible, brandCopyPhase, trioExiting, brandCopyCycle]);

  useEffect(() => {
    if (!trioExiting) return;
    const id = window.setTimeout(() => {
      setTrioExiting(false);
      setBrandCopyPhase("intro");
      setBrandCopyCycle((c) => c + 1);
    }, BRAND_TRIO_EXIT_TOTAL_MS);
    return () => window.clearTimeout(id);
  }, [trioExiting]);

  useEffect(() => {
    secondaryEndedGuardRef.current = false;
  }, [secondaryVideoIndex]);

  useEffect(() => {
    const leftVideo = leftSecondaryVideoRef.current;
    const rightVideo = rightSecondaryVideoRef.current;
    if (!leftVideo || !rightVideo || !isSecondaryVisible) return;

    const MASTER_DRIFT_MAX = 0.1;

    const kickBoth = () => {
      void leftVideo.play().catch(() => {});
      void rightVideo.play().catch(() => {});
    };

    const onCanPlay = () => {
      if (leftVideo.readyState >= 2 && rightVideo.readyState >= 2) {
        kickBoth();
      }
    };

    const onSeekedMaster = () => {
      if (Number.isFinite(rightVideo.currentTime)) {
        leftVideo.currentTime = rightVideo.currentTime;
      }
    };

    const syncInterval = window.setInterval(() => {
      if (rightVideo.paused || leftVideo.paused) {
        kickBoth();
        return;
      }
      const drift = Math.abs(leftVideo.currentTime - rightVideo.currentTime);
      if (drift > MASTER_DRIFT_MAX) {
        leftVideo.currentTime = rightVideo.currentTime;
      }
    }, 250);

    const safetyTimeout = window.setTimeout(kickBoth, 3000);

    leftVideo.addEventListener("canplay", onCanPlay);
    rightVideo.addEventListener("canplay", onCanPlay);
    rightVideo.addEventListener("seeked", onSeekedMaster);

    kickBoth();

    return () => {
      window.clearInterval(syncInterval);
      window.clearTimeout(safetyTimeout);
      leftVideo.removeEventListener("canplay", onCanPlay);
      rightVideo.removeEventListener("canplay", onCanPlay);
      rightVideo.removeEventListener("seeked", onSeekedMaster);
    };
  }, [secondaryVideoIndex, isSecondaryVisible]);

  const advanceSecondaryVideo = () => {
    if (secondaryEndedGuardRef.current) return;
    secondaryEndedGuardRef.current = true;
    setSecondaryVideoIndex((prev) => (prev + 1) % luxuryVideos.length);
  };

  return (
    <>
      <section
        id="brands"
        className="w-full bg-[#07090F] px-[80px] pb-0 pt-[72px] max-md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">04 — BRAND WALL</p>
          <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-white md:text-[56px]">
            520+ World-Class Brands
          </h2>
          <p className="mt-3 text-[15px] font-light text-white/40">
            Proof of performance from the brands that chose MOA — and never left.
          </p>
        </div>
      </section>
      <TenantSuccessStories />
      <section ref={secondarySectionRef} className="h-[105svh] w-full overflow-hidden bg-black">
        <div className="relative h-full w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex flex-col items-center pb-6 pt-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#FFD100]/60">Luxury Portfolio</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-1px] text-white md:text-[40px]">
              The Pinnacle of Retail
            </h2>
            <p className="mt-2 text-[12px] tracking-[0.15em] text-white/30">Burberry · Givenchy · Gucci · Prada · Valentino</p>
          </div>
          <div className="absolute inset-y-0 left-0 h-full w-[30%] min-w-[260px] max-md:hidden">
            <div className="h-full w-full bg-black">
              <video
                ref={leftSecondaryVideoRef}
                key={`luxury-left-${secondaryVideoIndex}`}
                className="h-full w-full object-cover"
                src={luxuryVideos[secondaryVideoIndex].src}
                autoPlay={isSecondaryVisible}
                muted
                playsInline
                preload="auto"
                onEnded={advanceSecondaryVideo}
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 h-full w-[30%] min-w-[260px] max-md:w-full">
            <div className="h-full w-full bg-black">
              <video
                ref={rightSecondaryVideoRef}
                key={`luxury-right-${secondaryVideoIndex}`}
                className="h-full w-full object-cover"
                src={luxuryVideos[secondaryVideoIndex].src}
                autoPlay={isSecondaryVisible}
                muted
                playsInline
                preload="auto"
                onEnded={advanceSecondaryVideo}
              />
            </div>
          </div>

          {isSecondaryVisible && (
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center md:inset-y-0 md:left-[30%] md:right-[30%] md:w-auto md:px-8">
              {brandCopyPhase === "intro" && (
                <motion.p
                  key={`brand-intro-${brandCopyCycle}`}
                  className={brandIntroKickerClass}
                  initial={{ x: -60, opacity: 0 }}
                  animate={
                    introExiting
                      ? { x: 0, y: -52, opacity: 0 }
                      : { x: 0, y: 0, opacity: 1 }
                  }
                  transition={{
                    duration: introExiting ? 0.45 : BRAND_MOTION_DURATION_S,
                    ease: easeBrand,
                    delay: introExiting ? 0 : BRAND_INTRO_DELAY_S,
                  }}
                >
                  Three decades of defining what retail looks like.
                </motion.p>
              )}

              {brandCopyPhase === "trio" && (
                <div
                  key={`brand-trio-${brandCopyCycle}`}
                  className="flex w-full max-w-4xl flex-col items-center gap-2"
                >
                  <motion.div
                    className={brandKickerClass}
                    initial={{ x: -60, opacity: 0 }}
                    animate={
                      trioExiting
                        ? { x: 0, y: -52, opacity: 0 }
                        : { x: 0, y: 0, opacity: 1 }
                    }
                    transition={{
                      duration: trioExiting ? 0.45 : BRAND_MOTION_DURATION_S,
                      ease: easeBrand,
                      delay: trioExiting ? 0 : BRAND_INTRO_DELAY_S,
                    }}
                  >
                    Curated.
                  </motion.div>
                  <motion.div
                    className={brandKickerClass}
                    initial={{ x: -60, opacity: 0 }}
                    animate={
                      trioExiting
                        ? { x: 0, y: -52, opacity: 0 }
                        : { x: 0, y: 0, opacity: 1 }
                    }
                    transition={{
                      duration: trioExiting ? 0.45 : BRAND_MOTION_DURATION_S,
                      ease: easeBrand,
                      delay: trioExiting ? 0.28 : 1.3,
                    }}
                  >
                    Coveted.
                  </motion.div>
                  <motion.div
                    className={brandKickerClass}
                    initial={{ x: -60, opacity: 0 }}
                    animate={
                      trioExiting
                        ? { x: 0, y: -52, opacity: 0 }
                        : { x: 0, y: 0, opacity: 1 }
                    }
                    transition={{
                      duration: trioExiting ? 0.45 : BRAND_MOTION_DURATION_S,
                      ease: easeBrand,
                      delay: trioExiting ? 0.56 : 1.8,
                    }}
                  >
                    Unmatched.
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
