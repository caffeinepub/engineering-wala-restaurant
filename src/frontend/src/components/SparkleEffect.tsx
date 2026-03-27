import { useEffect } from "react";

/**
 * Global sparkle burst on every click. Mounts once and attaches a document listener.
 * Respects prefers-reduced-motion.
 */
export default function SparkleEffect() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const COLORS = ["#F29A2E", "#FFD580", "#FF8C00", "#ffffff"];
    const DOTS = 7;

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < DOTS; i++) {
        const dot = document.createElement("span");
        dot.className = "ew-sparkle-dot";
        const angle = (i / DOTS) * 2 * Math.PI;
        const dist = 28 + Math.random() * 24;
        const tx = `${Math.cos(angle) * dist}px`;
        const ty = `${Math.sin(angle) * dist}px`;
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        dot.style.setProperty("--tx", tx);
        dot.style.setProperty("--ty", ty);
        dot.style.background = COLORS[i % COLORS.length];
        dot.style.width = `${5 + Math.random() * 5}px`;
        dot.style.height = dot.style.width;
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 650);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
