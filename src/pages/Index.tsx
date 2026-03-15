import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="px-6 md:px-12 pt-8 pb-16 max-w-3xl">
        <h1 className="text-2xl md:text-[1.75rem] leading-snug font-normal tracking-tight text-foreground">
          With a focus on growing enterprises across the globe, Daniel Lee Austin is an independent graphic designer specializing in the craft of commercial trademarks and visual identities.
        </h1>
        <Link
          to="/work"
          className="inline-block mt-6 text-sm font-semibold text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-200"
        >
          View selected work →
        </Link>
      </section>
      <ProjectGrid />
      <Footer />
    </div>
  );
};

export default Index;
