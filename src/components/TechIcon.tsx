"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiVercel,
  SiTensorflow,
  SiSocketdotio,
  SiElectron,
  SiFramer,
  SiSharp,
  SiThreedotjs,
  SiSass,
  SiDotnet,
  SiLatex,
  SiFastapi,
} from "react-icons/si";
import { IoIosCode } from "react-icons/io";
import { Cpu, Globe, Wifi, Database, Bot } from "lucide-react";

type IconComponent = React.ComponentType<{ className?: string }>;

const iconMap: Record<string, IconComponent> = {
  React: SiReact,
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  PHP: SiPhp,
  Python: SiPython,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  GitHub: SiGithub,
  Vercel: SiVercel,
  TensorFlow: SiTensorflow,
  "Socket.io": SiSocketdotio,
  Electron: SiElectron,
  "Framer Motion": SiFramer,
  "C#": SiSharp,
  FastAPI: SiFastapi,
  "Three.js": SiThreedotjs,
  SCSS: SiSass,
  "ASP.NET Core": SiDotnet,
  LaTeX: SiLatex,
  IoT: Wifi,
  RTSP: (props) => <Globe {...props} />,
  "REST API": (props) => <Globe {...props} />,
  "REST APIs": (props) => <Globe {...props} />,
  "AI/ML": (props) => <Bot {...props} />,
  "AI/ML Integration": (props) => <Bot {...props} />,
  "ERP Integration": (props) => <Database {...props} />,
  "IoT Systems": (props) => <Cpu {...props} />,
};

interface TechIconProps {
  tech: string;
  className?: string;
}

export function TechIcon({ tech, className = "w-3.5 h-3.5" }: TechIconProps) {
  const Icon = iconMap[tech];
  if (Icon) {
    return <Icon className={className} />;
  }
  return <IoIosCode className={className} />;
}
