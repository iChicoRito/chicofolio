import { describe, expect, it } from "vitest";

import { projects } from "./projects";

// The case-study page parses these strings by line and block, so a copy edit can silently empty a section.
describe("project case-study text format", () => {
  for (const project of projects) {
    const study = project.caseStudy;
    if (!study) continue;

    it(`${project.title} keeps the parsed format`, () => {
      const techRows = study.techStack.split("\n").filter((line) => line.startsWith("- "));
      expect(techRows.length).toBeGreaterThan(0);
      for (const row of techRows) expect(row).toMatch(/^- .+ — .+/);

      for (const field of [study.keyFeatures, study.challenges]) {
        for (const block of field.split("\n\n").filter(Boolean)) {
          const [title, ...rest] = block.split("\n");
          expect(title.trim()).not.toBe("");
          expect(rest.join(" ").trim()).not.toBe("");
        }
      }

      expect(
        study.role
          .split("\n\n")[0]
          .split("\n")
          .filter((line) => line.startsWith("- ")).length,
      ).toBeGreaterThan(0);
      expect(
        study.results
          .split("\n\n")[0]
          .split("\n")
          .some((line) => line.startsWith("- ")),
      ).toBe(true);
    });
  }
});
