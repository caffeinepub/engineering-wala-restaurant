import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../hooks/useCountUp";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

/**
 * Counts up to `value` once it enters the viewport.
 */
export default function AnimatedNumber({
  value,
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const displayed = useCountUp(value, 1400, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {displayed.toLocaleString()}
      {suffix}
    </span>
  );
}
