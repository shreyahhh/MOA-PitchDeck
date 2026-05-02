"use client";

import { useEffect, useMemo, useState } from "react";

type CountUpProps = {
  end: number;
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  start?: boolean;
};

export default function CountUp({
  end,
  durationMs = 2500,
  decimals = 0,
  prefix = "",
  suffix = "",
  start = true,
}: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, end, start]);

  const formatted = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value),
    [decimals, value],
  );

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
