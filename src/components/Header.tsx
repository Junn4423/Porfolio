"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-400"
          >
            Chung<span className="text-neutral-400 dark:text-neutral-600">.</span>dev
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/#about"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
            >
              About
            </a>
            <a
              href="/#projects"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="/#skills"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
            >
              Skills
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
            >
              Contact
            </a>
            <a
              href="/cv/cv-luong-ngoc-chung-english.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg bg-emerald-900 dark:bg-emerald-600 text-white hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CV
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />

            {/* Mobile burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border-2 border-emerald-900 dark:border-emerald-400 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-5 h-0.5 bg-emerald-900 dark:bg-emerald-400 transition-transform ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-emerald-900 dark:bg-emerald-400 transition-opacity ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-emerald-900 dark:bg-emerald-400 transition-transform ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <nav className="flex flex-col p-4 gap-1">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="/cv/cv-luong-ngoc-chung-english.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-emerald-900 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
            >
              Download CV
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
