"use client";

import { useEffect } from "react";

export default function SourceProtection() {
  useEffect(() => {
    // Stylized console greeting
    const styles = [
      "color: #064e3b",
      "background: #ecfdf5",
      "font-size: 16px",
      "font-weight: bold",
      "padding: 10px 20px",
      "border-radius: 4px",
      "border-left: 4px solid #064e3b",
    ].join(";");

    const subStyles = [
      "color: #065f46",
      "font-size: 13px",
      "padding: 4px 0",
    ].join(";");

    console.log(
      "%c> Hello there, curious developer!",
      styles
    );
    console.log(
      "%cI'm Chung — a Full Stack Developer passionate about building exceptional digital experiences.",
      subStyles
    );
    console.log(
      "%c// Portfolio: ngocchung.dev | Email: chungluong4423@gmail.com",
      subStyles
    );
    console.log(
      "%cLet's connect and build something amazing together!",
      subStyles
    );

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }
      // F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
      }
      // Ctrl+Shift+C (Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
