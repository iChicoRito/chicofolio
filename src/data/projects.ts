import type { SimpleIcon as SimpleIconType } from "simple-icons";
import { siDocker, siFigma, siNextdotjs, siNodedotjs, siReact, siTypescript } from "simple-icons";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: SimpleIconType;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured storefront with product catalogs, cart, and checkout. Built to scale from a handful of products to thousands.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    icon: siNextdotjs,
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    description:
      "Real-time dashboards with interactive charts, custom date ranges, and exportable reports for business metrics.",
    tags: ["React", "Recharts", "Node.js", "REST"],
    icon: siReact,
  },
  {
    id: 3,
    title: "Task Manager",
    description: "A collaborative kanban board with drag-and-drop columns, due dates, and team assignments.",
    tags: ["TypeScript", "Tailwind CSS", "Prisma"],
    icon: siTypescript,
  },
  {
    id: 4,
    title: "REST API Service",
    description: "A typed, documented API backend with authentication, rate limiting, and comprehensive test coverage.",
    tags: ["Node.js", "Express", "JWT", "PostgreSQL"],
    icon: siNodedotjs,
  },
  {
    id: 5,
    title: "Design System",
    description:
      "A component library with tokens, themes, and interactive documentation used across multiple products.",
    tags: ["React", "Figma", "Tailwind CSS"],
    icon: siFigma,
  },
  {
    id: 6,
    title: "DevOps Tooling",
    description:
      "Containerized CI/CD pipelines that automate builds, tests, and deployments for a microservices stack.",
    tags: ["Docker", "GitHub Actions", "Kubernetes"],
    icon: siDocker,
  },
];
