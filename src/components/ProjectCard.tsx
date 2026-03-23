"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  index: number;
}

export default function ProjectCard({
  slug,
  title,
  description,
  techStack,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/project/${slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-500 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-2xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-400/5">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={`/projects/${slug}/image1.jpg`}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/20 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Tech stack chips */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  +{techStack.length - 4}
                </span>
              )}
            </div>

            {/* Arrow */}
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-900 dark:text-emerald-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
              View Project
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
