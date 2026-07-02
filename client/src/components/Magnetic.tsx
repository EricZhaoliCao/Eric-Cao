import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How far the element drifts toward the cursor (px at edge). */
  strength?: number;
};

/**
 * Magnetic hover: the wrapped element drifts slightly toward the cursor while
 * hovered, then springs back. Pointer-only — coarse-pointer (touch) devices
 * get a plain wrapper, so nothing sticks under a finger.
 */
export default function Magnetic({ children, className, strength = 0.35 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.25 });

  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  if (!fine) return <span className={className}>{children}</span>;

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
