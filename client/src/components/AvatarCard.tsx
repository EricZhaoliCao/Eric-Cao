import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

type Props = { src: string; alt: string };

type Mode = 0 | 1 | 2; // 0 projection(虚) · 1 photo(实) · 2 off(无)
const RADIUS = "rounded-[1.75rem]";

/**
 * Interactive portrait: 3D tilt toward the cursor, hover scale, drag-to-move
 * with elastic snap-back, and a click cycle that starts as a holographic
 * projection: projection → photo → off → back. Pointer & reduced-motion aware.
 */
export default function AvatarCard({ src, alt }: Props) {
  const reduce = useReducedMotion();
  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  const interactive = fine && !reduce;

  const [mode, setMode] = useState<Mode>(0);
  const cycle = () => setMode((m) => ((m + 1) % 3) as Mode);

  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="w-full max-w-[360px] mx-auto md:mx-0 select-none">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={cycle}
        drag={interactive}
        dragSnapToOrigin
        dragElastic={0.16}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileTap={interactive ? { cursor: "grabbing" } : undefined}
        style={interactive ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
        className="relative aspect-square group [transform-style:preserve-3d] cursor-pointer"
      >
        {/* signature offset frame */}
        <div className={`absolute inset-0 border border-signal/40 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 ${RADIUS}`} />

        {mode === 2 ? (
          <div className={`relative z-10 w-full h-full grid place-items-center border border-dashed border-signal/25 bg-black/30 ${RADIUS}`}>
            <span className="font-mono text-xs text-signal-dim">// signal off · tap</span>
          </div>
        ) : (
          <div className={`relative z-10 w-full h-full overflow-hidden border border-white/15 ${RADIUS}`}>
            <motion.img
              src={src}
              alt={alt}
              draggable={false}
              whileHover={interactive ? { scale: 1.04 } : undefined}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`w-full h-full object-cover ${mode === 1 ? "grayscale group-hover:grayscale-0" : "opacity-45"} transition-[filter,opacity] duration-500 ${interactive ? "cursor-grab" : ""}`}
            />
            {mode === 0 && (
              <>
                <div className="absolute inset-0 bg-signal/25 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 holo-lines pointer-events-none" />
                <div className="absolute inset-x-0 holo-scan pointer-events-none" />
                <span className="absolute bottom-2 left-3 font-mono text-[10px] text-signal/80">projection</span>
              </>
            )}
          </div>
        )}
      </motion.div>

      <div className="mt-3 text-center md:text-left font-mono text-[10px] text-muted-foreground">
        <span className="text-signal-dim">tap portrait</span> · projection → photo → off
      </div>
    </div>
  );
}
