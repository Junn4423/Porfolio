"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Rocket,
  GraduationCap,
  Monitor,
  Bot,
  Building2,
  Mail,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import MagneticButton from "@/components/MagneticButton";
import ParticleField from "@/components/ParticleField";
import TextScramble from "@/components/TextScramble";
import { TiltCard } from "./HomeClient";

interface HeroSectionProps {
  personal: {
    nickname: string;
    name: string;
    label: string;
    summary: string;
    email: string;
    image: string;
    socials: { github: string; linkedin: string };
  };
}

export function HeroSection({ personal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Interactive particle background */}
      <div className="absolute inset-0">
        <ParticleField />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Available for new opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="text-neutral-900 dark:text-neutral-100">
                Hi, I&apos;m{" "}
              </span>
              <TextScramble
                text={personal.nickname}
                className="text-emerald-900 dark:text-emerald-400"
                scrambleDuration={1000}
              />
              <span className="block mt-2 text-neutral-400 dark:text-neutral-600 text-2xl sm:text-3xl lg:text-4xl font-medium">
                <TextScramble
                  text={personal.label}
                  scrambleDuration={1200}
                  speed={25}
                />
              </span>
            </h1>

            <p className="mt-6 text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
              {personal.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton
                as="a"
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-900 dark:bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-colors"
              >
                View My Work
                <ArrowDown className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-emerald-900 dark:border-emerald-400 text-emerald-900 dark:text-emerald-400 font-medium text-sm hover:bg-emerald-900/5 dark:hover:bg-emerald-400/5 transition-colors"
              >
                Get In Touch
              </MagneticButton>
            </div>

            {/* Social links */}
            <div className="mt-10 flex items-center gap-4">
              <MagneticButton
                as="a"
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="GitHub"
                strength={0.4}
                className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="LinkedIn"
                strength={0.4}
                className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-emerald-200 dark:border-emerald-800 opacity-60 animate-[spin_30s_linear_infinite]" />

              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-emerald-900 dark:border-emerald-400 shadow-2xl">
                <Image
                  src={personal.image}
                  alt={personal.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-2 -right-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg text-xs font-medium text-emerald-900 dark:text-emerald-400 flex items-center gap-1.5"
              >
                <Rocket className="w-3.5 h-3.5" />
                Project Lead
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg text-xs font-medium text-emerald-900 dark:text-emerald-400 flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                9.8/10 Thesis
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const aboutCards = [
  {
    icon: Monitor,
    title: "Full Stack Expert",
    desc: "Architecting robust systems using React, Node.js, PHP, and Python across Web, Mobile (React Native), and Desktop (Electron) platforms.",
  },
  {
    icon: Bot,
    title: "AI & IoT Integration",
    desc: "Bridging hardware and software through AI-driven modules and IoT connectivity, delivering smart, automated solutions for real-world problems.",
  },
  {
    icon: Building2,
    title: "Founder & Leader",
    desc: "Founded COVASOL, leading a dynamic team delivering bespoke technology solutions. Experienced in mentoring interns and managing full SDLC.",
  },
];

export function AboutSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {aboutCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <TiltCard key={card.title}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors h-full"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          </TiltCard>
        );
      })}
    </div>
  );
}

interface CTASectionProps {
  email: string;
  linkedin: string;
}

export function CTASection({ email, linkedin }: CTASectionProps) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <MagneticButton
        as="a"
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-900 dark:bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-colors"
      >
        <Mail className="w-4 h-4" />
        Send an Email
      </MagneticButton>

      <MagneticButton
        as="a"
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-emerald-900 dark:border-emerald-400 text-emerald-900 dark:text-emerald-400 font-medium text-sm hover:bg-emerald-900/5 dark:hover:bg-emerald-400/5 transition-colors"
      >
        Connect on LinkedIn
      </MagneticButton>
    </div>
  );
}
