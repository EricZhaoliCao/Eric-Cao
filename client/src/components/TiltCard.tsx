import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees toward the cursor. */
  max?: number;
};

/**
 * Frosted panel that tilts in 3D toward the cursor — the side the mouse is
 * nearest lifts closer, giving a live, tactile feel (not just uniform scale).
 * Lifts + scales on hover too. Pointer-only and reduced-motion aware; touch
 * users get a static frosted card.
 */
export default function TiltCard({ children, className = "", max = 7 }: Props) {
  const reduce = useReducedMotion();
  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  const interactive = fine && !reduce;

  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={interactive ? { scale: 1.02, y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={interactive ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={`panel-card [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </motion.div>
  );
}
