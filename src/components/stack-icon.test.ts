import { describe, expect, it } from "vitest";

import { findStackIcons } from "./stack-icon";

const count = (name: string) => findStackIcons(name).length;

describe("findStackIcons", () => {
  it("finds every named technology in order, up to the limit", () => {
    expect(count("Flutter and Dart")).toBe(2);
    expect(count("React and React Native")).toBe(2);
    expect(count("Laravel Mail with Gmail SMTP, Maatwebsite Excel, PhpSpreadsheet")).toBe(3);
  });

  it("does not match look-alike names", () => {
    expect(count("React Native Reanimated")).toBe(1);
    expect(count("Tailwind CSS 4")).toBe(1);
    expect(count("PHPUnit")).toBe(0);
    expect(count("Hive")).toBe(0);
  });
});
