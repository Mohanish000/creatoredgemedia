import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="relative grid size-9 shrink-0 grid-cols-2 place-items-center rounded-[4px] border border-divider font-display text-sm font-bold"
      >
        <span className="text-creator">C</span>
        <span className="text-campus">E</span>
        <span className="absolute inset-y-1.5 left-1/2 w-px bg-divider" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Creatoredge<span className="text-ink-2"> Media</span>
      </span>
    </span>
  );
}
