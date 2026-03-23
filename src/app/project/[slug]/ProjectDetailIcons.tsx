"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import WebsiteShowcase from "@/components/WebsiteShowcase";
import { TechIcon } from "@/components/TechIcon";

interface WebsiteEntry {
  name: string;
  url: string;
  category: string;
}

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  features: string[];
  achievements: string[];
  techStack: string[];
  liveUrl?: string;
  videoUrl?: string;
  websites?: WebsiteEntry[];
}

interface NavItem {
  slug: string;
  title: string;
}

export function ProjectDetailPage({
  project,
  prev,
  next,
}: {
  project: ProjectData;
  prev: NavItem | null;
  next: NavItem | null;
}) {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title & Meta */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
              {project.title}
            </h1>

            {/* Tech stack */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  <TechIcon tech={tech} className="w-3.5 h-3.5 flex-shrink-0" />
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-6 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-900 dark:bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-emerald-900 dark:border-emerald-400 text-emerald-900 dark:text-emerald-400 font-medium text-sm hover:bg-emerald-900/5 dark:hover:bg-emerald-400/5 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </a>
              )}
            </div>
          </div>

          {/* Gallery or Website Showcase */}
          <div className="mb-16">
            {project.websites && project.websites.length > 0 ? (
              <WebsiteShowcase websites={project.websites} />
            ) : (
              <ImageGallery slug={project.slug} title={project.title} />
            )}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Overview
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                    >
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-400" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Achievements */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Achievements
                </h3>
                <div className="space-y-3">
                  {project.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Star className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      <TechIcon tech={tech} className="w-4 h-4 flex-shrink-0" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between">
          {prev ? (
            <Link
              href={`/project/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/project/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
            >
              <span className="hidden sm:inline">{next.title}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
