"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemeChoice = "light" | "dark" | "system";

const noopSubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isClient = useIsClient();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = detailsRef.current;
      if (!el?.open) return;
      if (el.contains(e.target as Node)) return;
      el.open = false;
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!isClient) {
    return (
      <span
        className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md border border-transparent"
        aria-hidden
      />
    );
  }

  const active: ThemeChoice = theme === "dark" || theme === "light" ? theme : "system";

  const set = (t: ThemeChoice) => {
    setTheme(t);
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const ActiveIcon =
    active === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <details ref={detailsRef} className="relative">
      <summary
        className="flex cursor-pointer list-none items-center justify-center rounded-md border border-border/60 bg-transparent p-1.5 text-foreground transition-colors hover:border-border hover:bg-muted/40 [&::-webkit-details-marker]:hidden"
        aria-label="Theme: choose system, light, or dark"
      >
        <ActiveIcon size={18} strokeWidth={1.6} aria-hidden />
      </summary>
      <div
        className="absolute left-0 top-[calc(100%+6px)] z-[120] min-w-[11rem] rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg"
        role="menu"
      >
        {(
          [
            { id: "system" as const, label: "System", Icon: Monitor },
            { id: "light" as const, label: "Light", Icon: Sun },
            { id: "dark" as const, label: "Dark", Icon: Moon },
          ] as const
        ).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="menuitemradio"
            aria-checked={active === id}
            onClick={() => set(id)}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium uppercase tracking-wide transition-colors hover:bg-muted ${
              active === id ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <Icon size={16} strokeWidth={1.6} className="shrink-0 opacity-80" aria-hidden />
            {label}
          </button>
        ))}
      </div>
    </details>
  );
}
