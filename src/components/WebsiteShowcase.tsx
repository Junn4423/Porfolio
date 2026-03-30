"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Monitor, ChevronLeft, ChevronRight } from "lucide-react";

interface WebsitePreview {
  name: string;
  url: string;
  category: string;
  image?: string;
}

interface WebsiteShowcaseProps {
  websites: WebsitePreview[];
  itemsPerPage?: number;
}

/** Derive the local PNG path from the website URL. */
function getImagePath(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `/projects/landing-page-collection/${hostname}_.png`;
  } catch {
    return "";
  }
}

const SCROLL_SPEED = 250; // px per second

export default function WebsiteShowcase({ websites, itemsPerPage = 6 }: WebsiteShowcaseProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(websites.length / itemsPerPage);
  const paginatedSites = websites.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedSites.map((site, index) => (
            <WebsiteCard key={site.url} site={site} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                i === currentPage
                  ? "bg-emerald-900 dark:bg-emerald-600 text-white"
                  : "border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-900 dark:hover:text-emerald-400"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function WebsiteCard({ site, index }: { site: WebsitePreview; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const dirRef = useRef(1); // 1 = scrolling down, -1 = scrolling up
  const lastTimeRef = useRef<number | null>(null);
  const maxScrollRef = useRef(0);
  const isHoveredRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imgPath = site.image ?? getImagePath(site.url);

  useEffect(() => {
    if (!isLoaded) return;

    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    maxScrollRef.current = Math.max(0, img.offsetHeight - container.offsetHeight);

    const step = (time: number) => {
      if (!isHoveredRef.current) {
        lastTimeRef.current = null;
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      if (lastTimeRef.current === null) lastTimeRef.current = time;
      // Cap delta to avoid a large jump when the tab regains focus
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      posRef.current += dirRef.current * SCROLL_SPEED * delta;

      if (posRef.current >= maxScrollRef.current) {
        posRef.current = maxScrollRef.current;
        dirRef.current = -1;
      } else if (posRef.current <= 0) {
        posRef.current = 0;
        dirRef.current = 1;
      }

      img.style.transform = `translateY(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [isLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; lastTimeRef.current = null; }}
    >
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-500 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-2xl hover:shadow-emerald-900/10 dark:hover:shadow-emerald-400/5">
          {/* Browser chrome */}
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

          {/* Scrolling image preview */}
          <div
            ref={containerRef}
            className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800"
          >
            {/* Loading state */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Monitor className="w-8 h-8 text-neutral-300 dark:text-neutral-600 animate-pulse" />
                  <span className="text-xs text-neutral-400">Loading preview...</span>
                </div>
              </div>
            )}

            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Monitor className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={imgPath}
                alt={`Preview of ${site.name}`}
                className="w-full block"
                style={{ transform: "translateY(0)", willChange: "transform" }}
                loading="lazy"
                draggable={false}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/10 transition-all duration-500 flex items-end justify-center pb-6 pointer-events-none z-20">
              <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-xs font-medium text-emerald-900 dark:text-emerald-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                Click to visit ↗
              </span>
            </div>
          </div>

          {/* Card footer */}
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
