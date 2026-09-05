// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { designCategories } from "@/data/design-categories";

import DesignCategoryCard from "./design-category-card";

describe("DesignCategoryCard", () => {
  it("links card and View Designs button to the gallery href", () => {
    const category = designCategories[0];
    if (!category) throw new Error("Missing fixture category.");
    render(<DesignCategoryCard category={category} count={3} />);
    expect(screen.getByRole("heading", { name: category.title })).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: new RegExp(category.title, "i") });
    expect(links.length).toBeGreaterThanOrEqual(1);
    for (const link of links) expect(link).toHaveAttribute("href", category.href);
    expect(screen.getByRole("link", { name: /view designs/i })).toHaveAttribute("href", category.href);
  });
});
