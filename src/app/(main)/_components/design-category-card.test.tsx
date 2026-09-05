// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { designCategories } from "@/data/design-categories";

import DesignCategoryCard from "./design-category-card";

describe("DesignCategoryCard", () => {
  it("navigates only through the View Designs button", () => {
    const category = designCategories[0];
    if (!category) throw new Error("Missing fixture category.");
    render(<DesignCategoryCard category={category} count={3} />);
    expect(screen.getByRole("heading", { name: category.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view designs/i })).toHaveAttribute("href", category.href);
    const titleLink = screen.getByRole("link", { name: category.title });
    expect(titleLink).toHaveAttribute("href", category.href);
    expect(titleLink.className).not.toContain("after:absolute");
  });
});
