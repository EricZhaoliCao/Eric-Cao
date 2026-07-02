/**
 * Terminal window chrome for a card: three traffic-light dots + a monospace
 * "path" title. If `onClose` is given, the red dot becomes a real close button
 * (shows an × on hover) that dismisses the card.
 */
export default function TerminalBar({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
      <span className="flex gap-1.5 group/dots">
        <button
          type="button"
          onClick={onClose}
          disabled={!onClose}
          aria-label="Close card"
          className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 grid place-items-center text-[#7a0a05] text-[8px] leading-none font-bold hover:bg-[#ff5f56] transition-colors disabled:cursor-default enabled:cursor-pointer"
        >
          <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">✕</span>
        </button>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-signal/80" />
      </span>
      <span className="ml-1 font-mono text-[11px] text-muted-foreground truncate">
        <span className="text-signal-dim">➜</span> {title}
      </span>
    </div>
  );
}
