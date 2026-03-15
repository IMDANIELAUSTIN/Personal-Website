import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
const Work = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="px-6 md:px-12 pt-8 pb-4">
        <h1 className="text-2xl md:text-[1.75rem] leading-snug font-normal tracking-tight text-foreground">
          Selected Work
        </h1>
      </section>
      <ProjectGrid />
      <Footer />
    </div>
  );
};
export default Work;
