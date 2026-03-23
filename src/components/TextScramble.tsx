"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * TextScramble — A breakthrough minimalist text reveal effect.
 * Scrambles characters before resolving into the final text, giving
 * a "hacker terminal" aesthetic in a clean, sophisticated way.
 */
export default function TextScramble({
  text,
  className = "",
  speed = 30,
  scrambleDuration = 800,
}: {
  text: string;
  className?: string;
  speed?: number;
  scrambleDuration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  // text is shown immediately (SSR-safe), then scrambled on mount

  const animate = useCallback(() => {
    if (!ref.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const finalText = text;
    const el = ref.current;
    let frame = 0;
    const totalFrames = Math.ceil(scrambleDuration / speed);

    const interval = setInterval(() => {
      const progress = frame / totalFrames;
      const resolved = Math.floor(progress * finalText.length);

      let display = "";
      for (let i = 0; i < finalText.length; i++) {
        if (i < resolved) {
          display += finalText[i];
        } else if (finalText[i] === " ") {
          display += " ";
        } else {
          display += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      el.textContent = display;
      frame++;

      if (frame > totalFrames) {
        el.textContent = finalText;
        clearInterval(interval);
      }
    }, speed);
  }, [text, speed, scrambleDuration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
        }
      },
      { threshold: 0.5 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [animate]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
