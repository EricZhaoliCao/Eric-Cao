import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance in px (default 16). */
  y?: number;
  /** Horizontal travel distance in px (for diagonal entrances). */
  x?: number;
  /** Initial rotation in deg (settles to 0) — gives a "comes in askew" feel. */
  rotate?: number;
  /** Initial scale (settles to 1) — <1 reads as a stretch-into-place. */
  scale?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Quiet scroll-reveal: fade + drift (optionally diagonal, rotated, and scaled)
 * as the element enters the viewport, once. Respects prefers-reduced-motion
 * (renders static, no motion).
 */
export default function Reveal({ children, className, delay = 0, y = 16, x = 0, rotate = 0, scale = 1, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x, rotate, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
