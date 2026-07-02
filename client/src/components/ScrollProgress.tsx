import { motion, useScroll, useSpring } from "framer-motion";

/** Thin signal-green scroll progress bar pinned to the very top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-signal origin-left z-[60] shadow-[0_0_10px_var(--signal)]"
    />
  );
}
