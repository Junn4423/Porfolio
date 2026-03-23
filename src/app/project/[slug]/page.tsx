import { notFound } from "next/navigation";
import data from "@/data/projects.json";
import { ProjectDetailPage } from "./ProjectDetailIcons";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return data.projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = data.projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Chung.dev`,
    description: project.description.substring(0, 160),
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = data.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = data.projects.findIndex((p) => p.slug === params.slug);
  const prev = currentIndex > 0 ? data.projects[currentIndex - 1] : null;
  const next =
    currentIndex < data.projects.length - 1
      ? data.projects[currentIndex + 1]
      : null;

  return (
    <ProjectDetailPage
      project={project}
      prev={prev ? { slug: prev.slug, title: prev.title } : null}
      next={next ? { slug: next.slug, title: next.title } : null}
    />
  );
}
