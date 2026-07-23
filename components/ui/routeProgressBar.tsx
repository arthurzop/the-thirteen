"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (
        anchor.target === "_blank" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:")
      )
        return;
      if (href === window.location.pathname + window.location.search) return;

      startProgress();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function startProgress() {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    setVisible(true);
    setProgress(15);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress((p) => (p < 85 ? p + (85 - p) * 0.1 : p));
    }, 200);
  }

  function finishProgress() {
    if (!isNavigatingRef.current) return;
    isNavigatingRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);

    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 200);
  }

  useEffect(() => {
    finishProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 z-100 h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-off-white transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
