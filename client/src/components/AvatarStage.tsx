import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import AvatarCard from "./AvatarCard";

type Props = { src: string; alt: string };

const CMD = "$ render --portrait eric.tsao";

/**
 * The hero portrait stage: a typed shell command above the interactive
 * AvatarCard, grounded by a shelf + skewed frame so it doesn't float.
 * (The photo → off → projection toggle lives inside AvatarCard.)
 */
export default function AvatarStage({ src, alt }: Props) {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? CMD.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: number;
    const tick = () => {
      i += 1;
      setTyped(i);
      if (i < CMD.length) timer = window.setTimeout(tick, 55);
    };
    timer = window.setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <div className="w-full max-w-[360px] mx-auto md:mx-0">
      {/* typed shell command */}
      <div className="mb-4 font-mono text-xs text-signal-dim h-4 truncate">
        {CMD.slice(0, typed)}
        <span className="cursor-blink text-signal" aria-hidden="true">▍</span>
      </div>

      {/* portrait + grounding */}
      <div className="relative">
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[135%] h-40 -z-10 bg-gradient-to-r from-transparent via-black/55 to-transparent blur-md" />
        <div className="absolute inset-0 -z-10 rotate-[7deg] border border-signal/[0.14]" />
        <AvatarCard src={src} alt={alt} />
      </div>
    </div>
  );
}
