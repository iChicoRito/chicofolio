import { describe, expect, it } from "vitest";

import { uiuxProjects } from "./uiux-projects";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("uiuxProjects", () => {
  it("has exactly the two required projects in order", () => {
    expect(uiuxProjects.map((p) => p.slug)).toEqual(["remindly", "spillr"]);
  });

  it("every project has non-empty fields, a matching href and cover, and consistent screen counts", () => {
    const expectedScreenCounts = new Map<string, number>([
      ["remindly", 23],
      ["spillr", 28],
    ]);
    for (const project of uiuxProjects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.coverSrc.length).toBeGreaterThan(0);
      expect(project.coverAlt.length).toBeGreaterThan(0);
      expect(project.href).toBe(`/uiux/${project.slug}`);
      expect(project.coverSrc.startsWith("/assets/")).toBe(true);
      expect(project.screenCount).toBe(project.screenSrcs.length);
      expect(project.screenCount).toBe(expectedScreenCounts.get(project.slug));
    }
  });

  it("every cover and screen path exists on disk and screen paths live in the matching folder", () => {
    const folderBySlug = new Map<string, string>([
      ["remindly", "/assets/remindly/"],
      ["spillr", "/assets/spillr/"],
    ]);
    const seenScreens = new Set<string>();
    for (const project of uiuxProjects) {
      // URL paths under /assets/ map to files in public/assets/.
      const filePath = (src: string) => join(process.cwd(), "public", src);
      const folderPrefix = folderBySlug.get(project.slug);
      expect(existsSync(filePath(project.coverSrc))).toBe(true);
      for (const screenSrc of project.screenSrcs) {
        expect(existsSync(filePath(screenSrc))).toBe(true);
        expect(screenSrc.startsWith(folderPrefix ?? "")).toBe(true);
        expect(seenScreens.has(screenSrc)).toBe(false);
        seenScreens.add(screenSrc);
      }
    }
  });
});
