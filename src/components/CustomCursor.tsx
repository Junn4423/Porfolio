"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
    if (touch) return;

    // Add cursor-none class to body when custom cursor is active
    document.body.classList.add("cursor-none");

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.tagName === "INPUT" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null ||
        target.hasAttribute("data-magnetic") ||
        target.closest("[data-magnetic]") !== null;
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  if (!mounted || isTouchDevice || !isVisible) return null;

  const outerSize = isClicking ? 20 : isPointer ? 48 : 32;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-emerald-500 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - (isClicking ? 3 : 4),
          y: position.y - (isClicking ? 3 : 4),
          width: isClicking ? 6 : 8,
          height: isClicking ? 6 : 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-emerald-500 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - outerSize / 2,
          y: position.y - outerSize / 2,
          width: outerSize,
          height: outerSize,
          opacity: isClicking ? 0.8 : isPointer ? 0.6 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
