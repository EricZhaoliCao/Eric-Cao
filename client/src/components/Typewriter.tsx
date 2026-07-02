import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** ms per character. */
  speed?: number;
  /** delay before typing starts (ms). */
  startDelay?: number;
};

/**
 * Terminal-style typewriter with a blinking block cursor. Uppercase letters
 * are rendered larger and in the signal color (the name's initials pop).
 * Reduced-motion shows the full text immediately with a steady cursor.
 */
export default function Typewriter({ text, className, speed = 125, startDelay = 350 }: Props) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: number;
    const startTimer = window.setTimeout(function tick() {
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(tick, speed);
    }, startDelay);
    return () => { clearTimeout(startTimer); clearTimeout(timer); };
  }, [text, speed, startDelay, reduce]);

  const shown = text.slice(0, count).split("");

  return (
    <span className={className}>
      {shown.map((ch, i) =>
        ch === " " ? (
          <span key={i}>&nbsp;</span>
        ) : /[A-Z]/.test(ch) ? (
          <span key={i} className="text-signal text-[1.18em] leading-none">{ch}</span>
        ) : (
          <span key={i}>{ch}</span>
        )
      )}
      <span className="cursor-blink text-signal font-normal ml-0.5" aria-hidden="true">▍</span>
    </span>
  );
}
