// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { uiuxProjects } from "@/data/uiux-projects";

import UiuxProjectCard from "./uiux-project-card";
import UiuxProjectGrid from "./uiux-project-grid";

afterEach(() => {
  cleanup();
});

describe("UiuxProjectCard", () => {
  it("links the title and View button to the project page", () => {
    const project = uiuxProjects[0];
    if (!project) throw new Error("Missing fixture project.");
    render(<UiuxProjectCard project={project} />);

    expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    const titleLink = screen.getByRole("link", { name: project.title });
    expect(titleLink).toHaveAttribute("href", project.href);
    const viewLink = screen.getByRole("link", { name: /view/i });
    expect(viewLink).toHaveAttribute("href", project.href);
    expect(viewLink).toHaveAccessibleName(`View: ${project.title}`);
    expect(screen.getByText(/23 screens/)).toBeInTheDocument();
  });
});

describe("UiuxProjectGrid", () => {
  it("renders a card for every uiux project", () => {
    render(<UiuxProjectGrid />);

    expect(screen.getByRole("link", { name: "RemindLy" })).toHaveAttribute("href", "/uiux/remindly");
    expect(screen.getByRole("link", { name: "Spillr" })).toHaveAttribute("href", "/uiux/spillr");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: /view/i })).toHaveLength(2);
  });
});
