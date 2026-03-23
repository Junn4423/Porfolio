"use client";

import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Define the callback for Google Translate
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    win.googleTranslateElementInit = function () {
      new win.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,vi,it,fr,zh-CN,zh-TW,hi",
          layout: win.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load the Google Translate script
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [mounted]);

  return <div id="google_translate_element" className="hidden" />;
}
