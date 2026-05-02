"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type SidebarProps = {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ items, activeId, onSelect }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showActiveLabel, setShowActiveLabel] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const activeItemLabel = items.find((item) => item.id === activeId)?.label ?? "";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    setShowActiveLabel(true);
    const timeoutId = window.setTimeout(() => {
      setShowActiveLabel(false);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [activeId, hasMounted]);

  return (
    <>
      <div
        className="fixed left-3 top-1/2 z-40 hidden h-[340px] w-[42px] -translate-y-1/2 overflow-visible md:block"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {!hasMounted ? (
          <div
            className="h-full w-[6px] shrink-0 rounded-2xl bg-[rgba(0,0,0,0.85)] shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_2px_12px_rgba(255,255,255,0.12)]"
            style={{ backdropFilter: "blur(20px)" }}
            aria-hidden
          />
        ) : (
          <motion.aside
            className="h-full overflow-hidden"
            initial={{ width: 6, borderRadius: 16 }}
            animate={{
              width: isExpanded ? 248 : 6,
              borderRadius: 16,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(0, 0, 0, 0.92)",
              backdropFilter: "blur(20px)",
              boxShadow: isExpanded ? "none" : "0 0 0 1px rgba(255,255,255,0.22), 0 2px 12px rgba(255,255,255,0.1)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              maxWidth: isExpanded ? 248 : 6,
            }}
          >
            <div className="absolute inset-y-0 left-0 w-[6px] bg-black" aria-hidden />

            <motion.nav
              className="space-y-1 px-3 py-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                x: isExpanded ? 0 : -12,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                pointerEvents: isExpanded ? "auto" : "none",
                visibility: isExpanded ? "visible" : "hidden",
              }}
              aria-hidden={!isExpanded}
            >
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className={`w-full px-2 py-1.5 text-left text-[11px] uppercase tracking-[0.14em] transition-all ${
                      isActive
                        ? "font-semibold text-white"
                        : "text-white/85 hover:translate-x-1 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={isExpanded ? 0 : -1}
                  >
                    {item.label}
                  </button>
                );
              })}
            </motion.nav>
          </motion.aside>
        )}

        {hasMounted && (
          <div className="pointer-events-none absolute left-[14px] top-1/2 z-10 max-w-[min(240px,calc(100vw-3rem))] -translate-y-1/2">
            <AnimatePresence mode="wait">
              {showActiveLabel && !isExpanded && (
                <motion.div
                  key={activeId}
                  className="rounded-md bg-black/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/90 shadow-lg"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {activeItemLabel}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-black text-white shadow-sm md:hidden"
        aria-label="Open page navigation"
      >
        <span className="h-px w-4 bg-white shadow-[0_5px_0_0_rgba(255,255,255,1),0_-5px_0_0_rgba(255,255,255,1)]" />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40"
              aria-label="Close page navigation"
            />
            <motion.aside
              className="relative h-full w-[260px] border-r border-white/10 bg-black p-4"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">Pages</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-[0.2em] text-white/70"
                >
                  Close
                </button>
              </div>

              <nav className="space-y-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    activeId === item.id
                      ? "bg-white/14 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
