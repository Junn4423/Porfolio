"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Monitor } from "lucide-react";

interface WebsitePreview {
  name: string;
  url: string;
  category: string;
}

interface WebsiteShowcaseProps {
  websites: WebsitePreview[];
}

export default function WebsiteShowcase({ websites }: WebsiteShowcaseProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {websites.map((site, index) => (
        <WebsiteCard key={site.url} site={site} index={index} />
      ))}
    </div>
  );
}

function WebsiteCard({
  site,
  index,
}: {
  site: WebsitePreview;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      setScale(el.offsetWidth / 1440);
    };

    updateScale();

    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-500 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-2xl hover:shadow-emerald-900/10 dark:hover:shadow-emerald-400/5">
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-2">
              <div className="h-5 rounded-md bg-neutral-200 dark:bg-neutral-800 flex items-center px-3 text-[10px] text-neutral-400 dark:text-neutral-500 truncate font-mono">
                <span className="text-green-500 mr-1">●</span>
                {site.url}
              </div>
            </div>
          </div>

          {/* Iframe Preview Area */}
          <div
            ref={containerRef}
            className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800"
          >
            {/* Loading state */}
            {!isLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                <div className="flex flex-col items-center gap-2">
                  <Monitor className="w-8 h-8 text-neutral-300 dark:text-neutral-600 animate-pulse" />
                  <span className="text-xs text-neutral-400">
                    Loading preview...
                  </span>
                </div>
              </div>
            )}

            {/* Scaled iframe */}
            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{
                width: "1440px",
                height: `${Math.round(1 / scale) * (containerRef.current?.offsetHeight ?? 250)}px`,
                transform: `scale(${scale})`,
              }}
            >
              <iframe
                src={site.url}
                title={`Preview of ${site.name}`}
                className="border-0"
                style={{
                  width: "1440px",
                  height: "4000px",
                  pointerEvents: "none",
                  transitionProperty: "transform",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: isHovered ? "4s" : "1.5s",
                  transform: isHovered
                    ? "translateY(-2000px)"
                    : "translateY(0)",
                }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setIsLoaded(true)}
              />
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/60 dark:from-neutral-900/60 to-transparent pointer-events-none z-10" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/10 transition-all duration-500 flex items-end justify-center pb-6 pointer-events-none z-20">
              <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-xs font-medium text-emerald-900 dark:text-emerald-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                Click to visit ↗
              </span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                {site.name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {site.category}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}
