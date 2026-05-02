"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionWrapperProps = {
  id: string;
  title: string;
  eyebrow: string;
  children?: ReactNode;
};

export default function SectionWrapper({
  id,
  title,
  eyebrow,
  children,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className="relative flex min-h-screen items-center px-[80px] py-[120px] max-md:px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-center">
        <p className="text-[11px] uppercase tracking-[0.36em] text-[#C9A84C]">
          {eyebrow}
        </p>
        <h2 className="mt-6 text-5xl font-extralight tracking-[-2px] text-[#1F2A37] md:text-[64px]">
          {title}
        </h2>
        <motion.div
          className="glass-card mt-12 flex h-[200px] w-full max-w-[480px] self-center px-10 text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="text-[15px] font-light text-[#5F6F82]">Content coming soon</p>
        </motion.div>
        <div className="mt-6">{children}</div>
      </div>
    </motion.section>
  );
}
