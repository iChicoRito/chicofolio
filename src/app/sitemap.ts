import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site-url";

const publicRoutes = ["/", "/about", "/projects"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicRoutes.map((pathname) => ({ url: absoluteUrl(pathname) })),
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.id}`) })),
  ];
}
