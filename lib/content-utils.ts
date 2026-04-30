export type CategoryProject = {
  category: string;
};

export function buildProjectCategories(projects: CategoryProject[]) {
  const categories = new Set<string>(["All"]);

  projects.forEach((project) => {
    categories.add(project.category);
  });

  return Array.from(categories);
}
