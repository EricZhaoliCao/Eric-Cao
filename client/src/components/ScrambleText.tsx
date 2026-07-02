import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** ms per character reveal step. */
  speed?: number;
  /** delay before starting (ms). */
  delay?: number;
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%$&";

/**
 * Monospace "decode" reveal — scrambled glyphs settle into the target text,
 * left to right. A quant-terminal flourish for showpiece headings.
 * Reduced-motion renders the final text with no animation.
 */
export default function ScrambleText({ text, className, speed = 38, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? text : "");
  const frame = useRef(0);

  useEffect(() => {
    if (reduce) { setDisplay(text); return; }
    let raf = 0;
    let timer = 0;
    let settled = 0;
    frame.current = 0;

    const tick = () => {
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < settled) return text[i];
          return GLYPHS[Math.floor((frame.current * 7 + i * 13) % GLYPHS.length)];
        })
        .join("");
      setDisplay(out);
      frame.current++;
      if (frame.current % 2 === 0) settled++;
      if (settled <= text.length) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    timer = window.setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [text, reduce, speed, delay]);

  return <span className={className} aria-label={text}>{display || " "}</span>;
}
