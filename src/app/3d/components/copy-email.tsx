"use client";
import { useEffect, useRef, useState } from "react";
import { EMAIL } from "../data";

export default function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="mt-3.5 flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${EMAIL}`}
        className="font-spec rounded border border-(--line) bg-(--panel) px-3 py-2 text-[0.82rem] no-underline hover:border-(--accent)"
      >
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer rounded border-0 bg-(--accent) px-3.5 py-2.5 text-[0.9rem] font-semibold text-(--accent-ink) hover:brightness-110"
      >
        {status == "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" className="text-[0.85rem] text-(--muted)">
        {status == "failed" ? "Couldn't copy. Select the address instead." : ""}
      </span>
    </div>
  );
}
