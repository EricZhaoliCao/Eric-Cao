import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; onClick?: () => void };

/**
 * Cursor-tracked radial glow inside a bordered surface (Linear / Vercel style).
 * Writes --mx/--my custom props on move; the glow layer is styled in index.css
 * via the .spotlight class. No-ops gracefully without a pointer.
 */
export default function Spotlight({ children, className, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} onClick={onClick} className={`spotlight ${className ?? ""}`}>
      {children}
    </div>
  );
}
