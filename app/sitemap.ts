import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/content";
import { getAbsoluteUrl, staticSiteLastModified } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects({ publishedOnly: true });
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/pricing",
    "/portfolio",
    "/contact",
    "/faq"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: getAbsoluteUrl(route),
      lastModified: staticSiteLastModified
    })),
    ...projects.map((project) => ({
      url: getAbsoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date(project.updatedAt || project.createdAt || Date.now())
    }))
  ];
}
