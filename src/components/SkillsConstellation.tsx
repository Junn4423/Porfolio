"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView, useTime, useTransform, useMotionValue, MotionValue } from "framer-motion";
import { TechIcon } from "./TechIcon";
import { Palette, Server, Cloud, Sparkles } from "lucide-react";

interface SkillGroup {
  category: string;
  items: string[];
}

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Palette,
  Backend: Server,
  "Database & Cloud": Cloud,
  Specialties: Sparkles,
};

/* ── Combined Floating Node (Badge + Connecting Line) ── */
function FloatingSkillNode({
  skill,
  baseX,
  baseY,
  delayIdx,
  baseDelay,
  hubX,
  hubY,
}: {
  skill: string;
  baseX: number;
  baseY: number;
  delayIdx: number;
  baseDelay: number;
  hubX: MotionValue<number>;
  hubY: MotionValue<number>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const time = useTime();

  // 1) Water float offsets
  const waveX = useTransform(time, (t) => Math.sin(t / 1500 + delayIdx * 2.5) * 12);
  const waveY = useTransform(time, (t) => Math.cos(t / 1800 + delayIdx * 1.8) * 12);

  // 2) Drag offsets (handled internally by Framer Motion when drag is used)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // 3) Final rendering coordinates (Base + Wave + Drag)
  const finalX = useTransform(() => baseX + waveX.get() + dragX.get());
  const finalY = useTransform(() => baseY + waveY.get() + dragY.get());

  // 4) Dynamic SVG Path connecting Mother Node to Badge
  const pathD = useTransform(() => {
    const hx = hubX.get();
    const hy = hubY.get();
    const fx = finalX.get();
    const fy = finalY.get();
    
    // Control point adjusts fluidly creating a bouncy/rubbery line
    const cx = hx + (fx - hx) * 0.45 + (fy - hy) * 0.2;
    const cy = hy + (fy - hy) * 0.45 - (fx - hx) * 0.2;
    
    return `M ${hx} ${hy} Q ${cx} ${cy} ${fx} ${fy}`;
  });

  return (
    <>
      <svg
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          width: 1,
          height: 1,
          overflow: "visible",
          zIndex: 0,
        }}
      >
        <motion.path
          d={pathD}
          fill="none"
          strokeWidth={isHovered ? 2 : 1}
          strokeLinecap="round"
          className={
            isHovered
              ? "stroke-emerald-400 dark:stroke-emerald-500"
              : "stroke-neutral-300 dark:stroke-neutral-700"
          }
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: baseDelay + 0.3, duration: 0.8, ease: "easeOut" },
            opacity: { delay: baseDelay, duration: 0.4 },
          }}
        />
      </svg>

      {/* Floating Wrapper */}
      <motion.div
        className="absolute z-30"
        style={{
          left: `calc(50% + ${baseX}px)`,
          top: `calc(50% + ${baseY}px)`,
          x: waveX,
          y: waveY,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: baseDelay,
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {/* Draggable Interactive Node */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ x: dragX, y: dragY }}
          drag
          dragSnapToOrigin
          dragElastic={0.15}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          whileDrag={{ scale: 1.15, zIndex: 50, cursor: "grabbing" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={
              isHovered
                ? { scale: 1.12, boxShadow: "0 0 20px rgba(16,185,129,0.35)" }
                : { scale: 1, boxShadow: "0 0 0px rgba(16,185,129,0)" }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap cursor-grab transition-colors duration-300 ${
              isHovered
                ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-md"
                : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
            }`}
          >
            <TechIcon tech={skill} className="w-3.5 h-3.5 flex-shrink-0" />
            {skill}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ── Category hub with orbiting skills ── */
function SkillOrbit({
  group,
  groupIndex,
}: {
  group: SkillGroup;
  groupIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const itemCount = group.items.length;
  const radius = Math.max(105, itemCount * 17);
  const baseDelay = groupIndex * 0.12;
  const time = useTime();
  
  // The center hub itself slightly floats in water
  const floatX = useTransform(time, t => Math.sin(t / 2000 + groupIndex) * 5);
  const floatY = useTransform(time, t => Math.cos(t / 2500 + groupIndex) * 5);

  const Icon = categoryIcons[group.category] ?? Sparkles;

  // Pre-compute base positions
  const basePositions = useMemo(
    () =>
      group.items.map((_, i) => {
        const angle = (i / itemCount) * 2 * Math.PI - Math.PI / 2;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        };
      }),
    [itemCount, radius, group.items]
  );

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ minHeight: radius * 2 + 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {inView && (
        <>
          {/* Subtle underwater current ring */}
          <motion.div
            className="absolute rounded-full border border-dashed border-neutral-200 dark:border-neutral-800 pointer-events-none"
            style={{ width: radius * 2, height: radius * 2 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
              opacity: isHovered ? 0.3 : 0.1
            }}
            transition={{
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.3 },
            }}
          />

          {/* Skill nodes & their connected strings */}
          {group.items.map((skill, i) => (
            <FloatingSkillNode
              key={skill}
              skill={skill}
              baseX={basePositions[i].x}
              baseY={basePositions[i].y}
              delayIdx={i}
              baseDelay={baseDelay + 0.15 + i * 0.05}
              hubX={floatX}
              hubY={floatY}
            />
          ))}

          {/* Center hub */}
          <motion.div
            style={{ x: floatX, y: floatY }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: baseDelay,
              duration: 0.4,
              type: "spring",
            }}
            className={`relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 transition-all duration-300 ${
              isHovered
                ? "border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-110"
                : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-colors duration-300 ${
                isHovered
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-neutral-400 dark:text-neutral-500"
              }`}
            />
            <span
              className={`text-[10px] font-bold uppercase tracking-wider mt-1 transition-colors duration-300 ${
                isHovered
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {group.category}
            </span>
          </motion.div>
        </>
      )}
    </div>
  );
}

/* ── Main exported component ── */
export default function SkillsConstellation({
  skills,
}: {
  skills: SkillGroup[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-4 py-8 overflow-hidden">
      {skills.map((group, i) => (
        <SkillOrbit key={group.category} group={group} groupIndex={i} />
      ))}
    </div>
  );
}
