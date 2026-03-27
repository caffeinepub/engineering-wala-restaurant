import { useCallback } from "react";

/**
 * Returns a handler that creates a ripple/splash animation at the click position.
 * Usage: <button onMouseDown={createRipple} className="relative overflow-hidden" ...>
 */
export function useRipple() {
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ew-ripple-effect";
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }, []);

  return createRipple;
}
