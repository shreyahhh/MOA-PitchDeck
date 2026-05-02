"use client";

import { motion } from "framer-motion";

const categories = ["Fine Dining", "Fast Casual", "International", "Bars & Cocktails", "Cafés & Desserts", "Food Court"];

const diningStats = [
  { value: "50+", label: "Restaurants & Cafés" },
  { value: "2×", label: "Longer dwell with dining" },
  { value: "$42", label: "Avg food & bev spend" },
  { value: "12M", label: "Annual dining visits" },
];

const photos = [
  { src: "/brand/changs.jpg", alt: "P.F. Chang's", span: "col-span-2" },
  { src: "/brand/bubba.jpg", alt: "Bubba Gump Shrimp Co.", span: "" },
  { src: "/brand/laderach.jpg", alt: "Läderach", span: "" },
  { src: "/brand/sweetparis.jpg", alt: "Sweet Paris Creperie", span: "" },
  { src: "/brand/shakeshack.jpg", alt: "Shake Shack", span: "" },
];

export default function Dining() {
  return (
    <section id="dining" className="min-h-[100svh] bg-white px-[80px] py-[80px] max-md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start">

          {/* Left */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">06 — DINING & LIFESTYLE</p>
              <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-[#0D1F3C] md:text-[56px]">
                50+ Culinary<br />Experiences
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#5A6A7A]">
                From Michelin-cited chef tables to beloved fast-casual brands — MOA's dining scene is a destination in itself, not an afterthought.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <span key={c} className="rounded-full border border-[#E2E8F0] px-4 py-2 text-[12px] text-[#0D1F3C]">{c}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-[#E2E8F0] pt-8">
              {diningStats.map(stat => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold tracking-[-1px] text-[#0D1F3C]">{stat.value}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-[#8899AA]">{stat.label}</p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-2 border-[#C8102E] pl-5 text-[18px] font-light italic leading-relaxed text-[#0D1F3C]">
              "Food is the draw, not an afterthought."
            </blockquote>
          </motion.div>

          {/* Right — photo grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="col-span-2 overflow-hidden rounded-2xl">
              <img src="/brand/changs.jpg" alt="P.F. Chang's" className="h-56 w-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img src="/brand/bubba.jpg" alt="Bubba Gump" className="h-48 w-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img src="/brand/laderach.jpg" alt="Läderach" className="h-48 w-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img src="/brand/sweetparis.jpg" alt="Sweet Paris" className="h-48 w-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img src="/brand/shakeshack.jpg" alt="Shake Shack" className="h-48 w-full object-cover" loading="lazy" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
