"use client";

import { motion } from "framer-motion";

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

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-[80px] py-[80px] max-md:px-8">
      <div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.36em] text-[#C8102E]">09 LET&apos;S TALK</p>
          <h2 className="mt-4 text-5xl font-bold tracking-[-2px] text-[#0D1F3C] md:text-[56px]">
            Bring Your Brand<br />to America&apos;s Stage
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#5A6A7A]">
            Whether you&apos;re opening a flagship store, launching an activation, or booking the atrium for your next event we&apos;re ready.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="flex flex-col rounded-2xl bg-[#060912] p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <p className="text-[36px] font-bold leading-none text-[#C8102E]">&ldquo;</p>
              <p className="mt-1 flex-1 text-[14px] font-light leading-[1.8] text-white/75">{t.quote}</p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[13px] font-semibold text-white/70">{t.author}</p>
                <p className="text-[12px] text-white/40">{t.company}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#C8102E]/60">{t.since}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ctas.map((cta, i) => (
            <motion.button
              key={cta.label}
              type="button"
              className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 text-left transition-all duration-200 hover:border-[#C8102E]/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <h3 className="font-bold text-[#0D1F3C] transition-colors duration-200 group-hover:text-[#C8102E]">{cta.label}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8899AA]">{cta.desc}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C8102E] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Get Started →
              </p>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center gap-2 border-t border-[#E2E8F0] pt-8 text-center">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#8899AA]">
            Mall of America · Bloomington, MN 55425
          </p>
          <p className="text-[11px] text-[#C0C8D4]">© 2025 Mall of America. All rights reserved.</p>
        </div>

      </div>
    </section>
  );
}
