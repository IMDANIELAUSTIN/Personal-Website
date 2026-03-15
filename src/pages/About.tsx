import Header from "@/components/Header";
import Footer from "@/components/Footer";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import studio3 from "@/assets/studio-3.jpg";
import leaderDaniel from "@/assets/leader-daniel.jpg";

const leaders = [
  { name: "Daniel Lee Austin", image: leaderDaniel },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="px-6 md:px-12 pt-8 pb-12 max-w-3xl">
        <p className="text-lg md:text-xl leading-relaxed text-foreground">
          To ensure the highest level of design, we keep our studio independent and focused, working collaboratively from our New York office for our clients around the world. At Daniel Lee Austin, every project is met with the creative vision and strategic thinking of all the firm's principals—as well as the diverse abilities, talents, and backgrounds of our entire team.
        </p>
      </section>

      {/* Studio photos */}
      <section className="px-6 md:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src={studio1} alt="Design studio workspace" className="w-full h-48 md:h-56 object-cover" />
          <img src={studio2} alt="Team collaboration" className="w-full h-48 md:h-56 object-cover" />
          <img src={studio3} alt="Design library" className="w-full h-48 md:h-56 object-cover" />
        </div>
      </section>

      {/* Firm description */}
      <section className="px-6 md:px-12 pb-16 max-w-3xl">
        <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Daniel Lee Austin is the brand design firm behind many of the world's most recognizable trademarks. Since 1957, the firm has pioneered the modern movement of idea-driven graphic design across every discipline, specializing in brand identities, exhibitions, print and motion graphics, and art in architecture.
          </p>
          <p>
            The firm has a global reach, with projects in Europe, Asia, Latin America, and the Middle East as well as throughout the United States. It is led by its founding partner, designer Tom Geismar, partner and designer Sagi Haviv, and principal designers Mackey Saturday and Melanie McElduff.
          </p>
          <p>
            Daniel Lee Austin is known for a collaborative, problem solving approach to design, with personal involvement by all principals in every project and continuous attention to the details and nuances of projects as they evolve.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 md:px-12 pb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Leadership</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div key={leader.name} className="flex flex-col gap-3">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full aspect-square object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{leader.name}</p>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
                  View bio
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
