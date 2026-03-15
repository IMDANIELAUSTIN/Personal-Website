import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "./data/projects";

type SortMode = "popular" | "az" | "newest";

const INITIAL_COUNT = 6;

const ProjectGrid = () => {
  const [showAll, setShowAll] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("popular");

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortMode === "az") return a.name.localeCompare(b.name);
    if (sortMode === "newest") return b.year - a.year;
    return 0; // popular = original order
  });

  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, INITIAL_COUNT);

  return (
    <>
      {/* Breadcrumb + Filters */}
      <section className="px-6 md:px-12 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <span className="font-medium">Logos</span>
            <span className="text-muted-foreground">&gt;</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {(["popular", "az", "newest"] as SortMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSortMode(mode)}
                className={`transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                  sortMode === mode
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === "popular" ? "Popular" : mode === "az" ? "A–Z" : "Newest"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {visibleProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="group block project-card-hover cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <div className="mt-2">
                <span className="text-sm font-semibold text-foreground">{project.name}</span>
                <span className="text-sm text-muted-foreground"> - {project.type}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {!showAll && projects.length > INITIAL_COUNT && (
        <section className="py-16 md:py-24 text-center bg-secondary">
          <button
            onClick={() => setShowAll(true)}
            className="text-xl md:text-2xl text-foreground hover:text-muted-foreground transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            View more logos
          </button>
        </section>
      )}
    </>
  );
};

export default ProjectGrid;
