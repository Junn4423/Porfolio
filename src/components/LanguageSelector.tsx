"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Check } from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
  { code: "zh-CN", label: "中文" },
  { code: "hi", label: "हिन्दी" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  // Detect current language from Google Translate cookie
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match) {
      setCurrentLang(match[1]);
    }
  }, []);

  const switchLanguage = useCallback((langCode: string) => {
    setCurrentLang(langCode);
    setOpen(false);

    // Set cookie for Google Translate
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${langCode}; path=/`;

    // Try the select element approach first
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
      return;
    }

    // Fallback: reload to apply cookie-based translation
    if (langCode === "en") {
      // Reset to English
      document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      window.location.reload();
    } else {
      window.location.reload();
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-emerald-900 dark:border-emerald-400 text-emerald-900 dark:text-emerald-400 text-sm font-medium transition-colors hover:bg-emerald-900/10 dark:hover:bg-emerald-400/10"
        aria-label="Select language"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">Lang</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden"
            >
              {languages.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  onClick={() => switchLanguage(lang.code)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                    currentLang === lang.code
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-400 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                  }`}
                >
                  <span>{lang.label}</span>
                  {currentLang === lang.code && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
