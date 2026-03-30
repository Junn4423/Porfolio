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
  FileDown,
  Award,
  Globe,
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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.163c-.18.328-.543.637-.96.775-.18.06-.408.09-.66.09-.36 0-.783-.078-1.26-.24a8.7 8.7 0 0 1-1.14-.48 12.3 12.3 0 0 1-1.86-1.2 12.3 12.3 0 0 1-1.2-1.14c-.18-.2-.348-.39-.48-.57a8.7 8.7 0 0 1-.48-1.14c-.162-.477-.24-.9-.24-1.26 0-.252.03-.48.09-.66.138-.417.447-.78.775-.96A1.8 1.8 0 0 1 11.1 7.2c.12 0 .24.018.348.054.228.075.42.24.54.453l.66 1.14c.12.21.12.468 0 .678l-.42.72a.3.3 0 0 0 0 .312c.18.33.45.69.81 1.05.36.36.72.63 1.05.81a.3.3 0 0 0 .312 0l.72-.42c.21-.12.468-.12.678 0l1.14.66c.213.12.378.312.453.54.036.108.054.228.054.348a1.8 1.8 0 0 1-.078.618z" />
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

              <MagneticButton
                as="a"
                href="/cv/cv-luong-ngoc-chung-english.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium text-sm hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                Download CV
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

              <MagneticButton
                as="a"
                href="https://www.facebook.com/junloun4423/"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="Facebook"
                strength={0.4}
                className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="https://zalo.me/0707038113"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="Zalo"
                strength={0.4}
                className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <ZaloIcon className="w-5 h-5" />
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
                Thesis with Distinction
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

export function CertificateSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="/certificate/EF%20SET%20Certificate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-10 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 dark:hover:shadow-emerald-400/5">
            {/* Decorative gradient blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center gap-8">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Globe className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 mb-3">
                  <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    English Proficiency
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                  EF SET English Certificate
                </h3>
                <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  Certified English proficiency level assessed by EF Standard English Test — an internationally recognized benchmark for non-native English speakers.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <FileDown className="w-4 h-4" />
                  View Certificate
                </div>
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}
