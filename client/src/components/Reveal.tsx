import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance in px (default 16). */
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Quiet scroll-reveal: fade + small upward drift as the element enters the
 * viewport, once. Respects prefers-reduced-motion (renders static, no motion).
 * The eased, understated entrance is what gives the page its "from the top
 * institution" composure instead of content snapping into place.
 */
export default function Reveal({ children, className, delay = 0, y = 16, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
