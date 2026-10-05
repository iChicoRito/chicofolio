// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProjectTabs from "./project-tabs";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

function renderTabs() {
  render(
    <ProjectTabs>
      <TabsList>
        <TabsTrigger value="development">Development</TabsTrigger>
        <TabsTrigger value="uiux">UIUX</TabsTrigger>
      </TabsList>
    </ProjectTabs>,
  );
}

describe("ProjectTabs", () => {
  it("opens the tab saved earlier in the session", () => {
    sessionStorage.setItem("projects-tab", "uiux");
    renderTabs();
    expect(screen.getByRole("tab", { name: "UIUX" })).toHaveAttribute("aria-selected", "true");
  });

  it("falls back to Development when nothing valid is saved", () => {
    sessionStorage.setItem("projects-tab", "nope");
    renderTabs();
    expect(screen.getByRole("tab", { name: "Development" })).toHaveAttribute("aria-selected", "true");
  });
});
