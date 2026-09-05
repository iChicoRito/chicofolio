import { designCategories } from "@/data/design-categories";
import { designProjects } from "@/data/design-projects";

import DesignCategoryCard from "./design-category-card";

export default function DesignProjectGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {designCategories.map((category) => (
        <DesignCategoryCard
          key={category.slug}
          category={category}
          count={designProjects.filter((project) => project.category === category.slug).length}
        />
      ))}
    </div>
  );
}
