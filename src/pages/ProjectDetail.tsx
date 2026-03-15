import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 pt-4 pb-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Logos
          </Link>
          <span>&gt;</span>
        </div>
      </div>

      {/* Title */}
      <section className="px-6 md:px-12 pb-8">
        <h1 className="text-2xl md:text-3xl font-normal text-foreground">
          {project.name}
        </h1>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-12 pb-8">
        <img
          src={project.image}
          alt={project.name}
          className="w-full max-w-4xl object-cover"
        />
      </section>

      {/* First description block */}
      <section className="px-6 md:px-12 pb-10 max-w-3xl">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description[0]}
        </p>
      </section>

      {/* Additional image */}
      {project.additionalImages[0] && (
        <section className="px-6 md:px-12 pb-8">
          <img
            src={project.additionalImages[0]}
            alt={`${project.name} application`}
            className="w-full max-w-4xl object-cover"
          />
        </section>
      )}

      {/* Second description block */}
      {project.description[1] && (
        <section className="px-6 md:px-12 pb-10 max-w-3xl">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description[1]}
          </p>
        </section>
      )}

      {/* Enterprises section */}
      {project.description[2] && (
        <>
          <section className="px-6 md:px-12 pb-2">
            <p className="text-xs text-muted-foreground italic">Enterprises</p>
          </section>
          <section className="px-6 md:px-12 pb-10 max-w-3xl">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description[2]}
            </p>
          </section>
        </>
      )}

      {/* Project info */}
      <section className="px-6 md:px-12 pb-16 border-t border-border pt-8">
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">{project.type}</span>
          <span className="text-muted-foreground">{project.year}</span>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
