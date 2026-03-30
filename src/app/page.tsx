import data from "@/data/projects.json";
import ProjectTimeline from "@/components/ProjectTimeline";
import SkillsConstellation from "@/components/SkillsConstellation";
import { SectionAnimations } from "./HomeClient";
import { HeroSection, AboutSection, CTASection, CertificateSection } from "./HomeSections";

export default function Home() {
  const { personal, projects } = data;

  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Native",
        "Electron",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "PHP", "Python", "C#", "FastAPI", "ASP.NET Core"],
    },
    {
      category: "Database & Cloud",
      items: ["MySQL", "MongoDB", "Docker", "GitHub", "Vercel"],
    },
    {
      category: "Specialties",
      items: [
        "AI/ML Integration",
        "IoT Systems",
        "ERP Integration",
        "Socket.io",
        "REST APIs",
      ],
    },
  ];

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <HeroSection personal={personal} />

      {/* ========== ABOUT SECTION ========== */}
      <section
        id="about"
        className="py-24 bg-neutral-50 dark:bg-neutral-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionAnimations>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                About{" "}
                <span className="text-emerald-900 dark:text-emerald-400">
                  Me
                </span>
              </h2>
              <div className="mt-4 w-16 h-1 bg-emerald-900 dark:bg-emerald-400 mx-auto rounded-full" />
            </div>
          </SectionAnimations>

          <AboutSection />
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionAnimations>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Featured{" "}
                <span className="text-emerald-900 dark:text-emerald-400">
                  Projects
                </span>
              </h2>
              <div className="mt-4 w-16 h-1 bg-emerald-900 dark:bg-emerald-400 mx-auto rounded-full" />
              <p className="mt-4 text-neutral-500 dark:text-neutral-400">
                A showcase of my best work spanning e-commerce, AI platforms, IoT
                systems, and more.
              </p>
            </div>
          </SectionAnimations>

          <div className="mt-2">
            <ProjectTimeline projects={projects} />
          </div>
        </div>
      </section>

      {/* ========== SKILLS SECTION ========== */}
      <section
        id="skills"
        className="py-24 bg-neutral-50 dark:bg-neutral-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionAnimations>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Technical{" "}
                <span className="text-emerald-900 dark:text-emerald-400">
                  Skills
                </span>
              </h2>
              <div className="mt-4 w-16 h-1 bg-emerald-900 dark:bg-emerald-400 mx-auto rounded-full" />
            </div>
          </SectionAnimations>

          <SkillsConstellation skills={skills} />
        </div>
      </section>

      {/* ========== CERTIFICATE SECTION ========== */}
      <section id="certificates" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionAnimations>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Certifications &{" "}
                <span className="text-emerald-900 dark:text-emerald-400">
                  Achievements
                </span>
              </h2>
              <div className="mt-4 w-16 h-1 bg-emerald-900 dark:bg-emerald-400 mx-auto rounded-full" />
            </div>
          </SectionAnimations>

          <CertificateSection />
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionAnimations>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Let&apos;s Build Something{" "}
                <span className="text-emerald-900 dark:text-emerald-400">
                  Amazing
                </span>
              </h2>
              <p className="mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your visions.
              </p>
              <CTASection
                email={personal.email}
                linkedin={personal.socials.linkedin}
              />
            </div>
          </SectionAnimations>
        </div>
      </section>
    </>
  );
}
