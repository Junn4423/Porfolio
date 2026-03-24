"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  Play,
  Check,
  Star,
  X,
} from "lucide-react";
import { TechIcon } from "./TechIcon";

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  features: string[];
  achievements: string[];
  techStack: string[];
  date?: string;
  liveUrl?: string;
  videoUrl?: string;
  videoUrl2?: string;
}

/* ═══════════════════════════════════════════════
   Flowing SVG timeline line — animates on scroll
   ═══════════════════════════════════════════════ */
function FlowingLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none hidden md:block">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 32 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16,0 C 5,80 27,160 16,240 C 5,320 27,400 16,480 C 5,560 27,640 16,720 C 5,800 27,880 16,1000"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="text-neutral-200 dark:text-neutral-800"
        />
        <motion.path
          d="M16,0 C 5,80 27,160 16,240 C 5,320 27,400 16,480 C 5,560 27,640 16,720 C 5,800 27,880 16,1000"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          stroke="url(#timelineGrad)"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ═══════════════════
   Timeline dot
   ═══════════════════ */
function TimelineDot({ inView }: { inView: boolean }) {
  return (
    <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 z-10 items-center justify-center">
      <motion.div
        animate={
          inView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.4, opacity: 0 }
        }
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        className="w-4 h-4 rounded-full bg-emerald-500 dark:bg-emerald-400 ring-4 ring-white dark:ring-neutral-950 shadow-lg shadow-emerald-500/40"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Peek Popup — mini detail preview on hover
   ═══════════════════════════════════════════════ */
function PeekPopup({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const thumbnails = Array.from({ length: 4 }, (_, i) => ({
    src: `/projects/${project.slug}/image${i + 1}.jpg`,
    alt: `${project.title} - ${i + 1}`,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 w-[420px] max-h-[520px] overflow-y-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-2xl shadow-black/20 dark:shadow-black/50"
      onMouseLeave={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        aria-label="Close preview"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Image grid */}
      <div className="grid grid-cols-2 gap-1 p-1">
        {thumbnails.map((img, i) => (
          <PeekThumb key={i} src={img.src} alt={img.alt} />
        ))}
      </div>

      <div className="p-4 space-y-3">
        {/* Title */}
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Features — first 4 */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Key Features
          </span>
          {project.features.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <Check
                className="w-3 h-3 mt-0.5 flex-shrink-0 text-emerald-500"
                strokeWidth={3}
              />
              <span className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Achievements count + tech */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500" />
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {project.achievements.length} Achievements
            </span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {project.techStack.length} Technologies
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
              Live
            </a>
          )}
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Play className="w-3 h-3" />
              {project.videoUrl2 ? "Demo 1" : "Demo"}
            </a>
          )}
          {project.videoUrl2 && (
            <a
              href={project.videoUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Play className="w-3 h-3" />
              Demo 2
            </a>
          )}
          <Link
            href={`/project/${project.slug}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-emerald-900 dark:bg-emerald-600 text-white hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-colors ml-auto"
          >
            View Full
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function PeekThumb({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="200px"
        onError={() => setErr(true)}
      />
    </div>
  );
}

/* ═══════════════════════════════════════
   Info Panel — date + description side
   ═══════════════════════════════════════ */
function InfoPanel({
  project,
  inView,
  align,
}: {
  project: Project;
  inView: boolean;
  align: "left" | "right";
}) {
  return (
    <motion.div
      animate={
        inView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: align === "left" ? -30 : 30 }
      }
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`hidden md:block mt-4 ${
        align === "left" ? "text-right pr-6" : "text-left pl-6"
      }`}
    >
      {/* Date */}
      <div
        className={`flex items-center gap-2 mb-3 ${
          align === "left" ? "justify-end" : "justify-start"
        }`}
      >
        <Calendar className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          {project.date ?? "2024"}
        </span>
      </div>

      {/* Short description */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-4">
        {project.description}
      </p>

      {/* Mini tech tags */}
      <div
        className={`mt-3 flex flex-wrap gap-1.5 ${
          align === "left" ? "justify-end" : "justify-start"
        }`}
      >
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
          >
            <TechIcon tech={tech} className="w-2.5 h-2.5 flex-shrink-0" />
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   Card — image thumbnail + title + hover
   ═══════════════════════════════════════ */
function CardSide({
  project,
  inView,
  side,
}: {
  project: Project;
  inView: boolean;
  side: "left" | "right";
}) {
  const [imgError, setImgError] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback(() => {
    hoverTimer.current = setTimeout(() => setShowPeek(true), 400);
  }, []);

  const handleLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setShowPeek(false);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  return (
    <motion.div
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: side === "left" ? -40 : 40, y: 10 }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Mobile date + desc */}
      <div className="flex items-center gap-1.5 mb-3 md:hidden">
        <Calendar className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          {project.date ?? "2024"}
        </span>
      </div>

      <Link href={`/project/${project.slug}`} className="group block">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-500 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-400/5 hover:-translate-y-1">
          {/* Image */}
          {!imgError && (
            <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={`/projects/${project.slug}/image1.jpg`}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-900/0 group-hover:from-emerald-500/10 group-hover:to-emerald-900/20 transition-all duration-500" />
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
              {project.title}
            </h3>

            {/* Mobile description */}
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed md:hidden">
              {project.description}
            </p>

            {/* Desktop — compact tech chips */}
            <div className="mt-3 hidden md:flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  <TechIcon
                    tech={tech}
                    className="w-2.5 h-2.5 flex-shrink-0"
                  />
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Mobile tech chips */}
            <div className="mt-3 flex md:hidden flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  <TechIcon
                    tech={tech}
                    className="w-2.5 h-2.5 flex-shrink-0"
                  />
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA arrow */}
            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              View Project
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>

      {/* Hover Peek Popup */}
      <AnimatePresence>
        {showPeek && (
          <div
            className="absolute hidden lg:block"
            style={{
              zIndex: 50,
              top: "50%",
              transform: "translateY(-50%)",
              ...(side === "left"
                ? { left: "calc(100% + 1.5rem)" }
                : { right: "calc(100% + 1.5rem)" }),
            }}
          >
            <PeekPopup
              project={project}
              onClose={() => setShowPeek(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Timeline Card Row — alternating layout
   ═══════════════════════════════════════════ */
function TimelineCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-12% 0px -12% 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16 mb-20 md:mb-32 overflow-visible"
    >
      <TimelineDot inView={inView} />

      {/* Connector branch */}
      <div
        className={`hidden md:block absolute top-10 h-0.5 ${
          isLeft
            ? "right-1/2 mr-4 w-[calc(50%-2rem)]"
            : "left-1/2 ml-4 w-[calc(50%-2rem)]"
        }`}
        style={{ maxWidth: "2rem" }}
      >
        <div
          className={`h-full bg-gradient-to-r ${
            isLeft
              ? "from-transparent to-emerald-400/60 dark:to-emerald-500/60"
              : "from-emerald-400/60 dark:from-emerald-500/60 to-transparent"
          }`}
        />
      </div>

      {/* Card column */}
      <div className={`${isLeft ? "md:col-start-1" : "md:col-start-2"} overflow-visible`}>
        <CardSide project={project} inView={inView} side={isLeft ? "left" : "right"} />
      </div>

      {/* Info column */}
      <div className={`${isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"} overflow-visible`}>
        <InfoPanel project={project} inView={inView} align={isLeft ? "left" : "right"} />
      </div>
    </div>
  );
}

/* ═══════════════════════════
   Main exported component
   ═══════════════════════════ */
export default function ProjectTimeline({
  projects,
}: {
  projects: Project[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      <FlowingLine containerRef={containerRef} />

      {projects.map((project, index) => (
        <TimelineCard key={project.id} project={project} index={index} />
      ))}

      {/* End cap */}
      <div className="hidden md:flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-3 h-3 rounded-full bg-emerald-400/50 dark:bg-emerald-600/50 ring-2 ring-emerald-300 dark:ring-emerald-700"
        />
      </div>
    </div>
  );
}
