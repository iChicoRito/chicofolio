import { describe, expect, it } from "vitest";

import { designProjects } from "./design-projects";

describe("designProjects categories", () => {
  it("every project has a valid category slug", () => {
    for (const p of designProjects) {
      expect(["social-media-designs", "anime-shoes-mockups", "amway-flyers"]).toContain(
        (p as { category?: string }).category,
      );
    }
  });

  it("covers all three categories with expected minimums", () => {
    const counts = new Map(designProjects.map((p) => [p.category, 0]));
    for (const p of designProjects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    expect(counts.get("social-media-designs")).toBe(20);
    expect(counts.get("anime-shoes-mockups")).toBe(12);
    expect(counts.get("amway-flyers")).toBe(30);
  });

  it("amway entries point at /assets/amway-fliers/", () => {
    const amway = designProjects.filter((p) => p.category === "amway-flyers");
    expect(amway.length).toBeGreaterThan(0);
    for (const p of amway) expect(p.src.startsWith("/assets/amway-fliers/")).toBe(true);
  });
});
