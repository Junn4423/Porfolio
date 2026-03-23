import data from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import { SectionAnimations, SkillsAnimations } from "./HomeClient";
import { HeroSection, AboutSection, CTASection } from "./HomeSections";
import { TechIcon } from "@/components/TechIcon";

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                index={index}
              />
            ))}
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

          <SkillsAnimations>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((group) => (
                <div
                  key={group.category}
                  className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-900 dark:text-emerald-400 mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors"
                      >
                        <TechIcon tech={skill} className="w-3.5 h-3.5 flex-shrink-0" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SkillsAnimations>
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
