import { describe, expect, it } from "vitest";

import { designCategories } from "./design-categories";

describe("designCategories", () => {
  it("has exactly the three required categories with gallery routes", () => {
    expect(designCategories.map((c) => c.slug)).toEqual([
      "social-media-designs",
      "anime-shoes-mockups",
      "amway-flyers",
    ]);
  });

  it("every category has title, description, cover image, and href", () => {
    for (const c of designCategories) {
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.description.length).toBeGreaterThan(0);
      expect(c.coverSrc.startsWith("/assets/")).toBe(true);
      expect(c.href).toBe(`/designs/${c.slug}`);
    }
  });
});
