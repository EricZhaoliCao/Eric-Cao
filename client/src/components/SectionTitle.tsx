import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = { text: string; className?: string };

/**
 * Section heading that types itself out when scrolled into view, with the
 * first letter in the signal color (matching the hero name) and a blinking
 * cursor while typing. Reduced-motion shows the full title immediately.
 */
export default function SectionTitle({ text, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (reduce || !inView) return;
    let i = 0;
    let timer: number;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(tick, 55);
      else setDone(true);
    };
    timer = window.setTimeout(tick, 150);
    return () => clearTimeout(timer);
  }, [inView, reduce, text]);

  const shown = text.slice(0, count).split("");

  return (
    <h2 ref={ref} className={className}>
      {shown.map((ch, i) =>
        ch === " " ? (
          <span key={i}>&nbsp;</span>
        ) : /[A-Z]/.test(ch) ? (
          <span key={i} className="text-signal">{ch}</span>
        ) : (
          <span key={i}>{ch}</span>
        )
      )}
      {!done && <span className="cursor-blink text-signal font-normal">▍</span>}
    </h2>
  );
}
