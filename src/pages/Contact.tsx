import Header from "@/components/Header";
import contactArt from "@/assets/contact-art.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl md:text-4xl font-light text-foreground">Contact</h1>

            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-foreground">Work Inquiries</span>
              <a href="mailto:info@cghnyc.com" className="text-muted-foreground hover:text-foreground transition-colors">
                info@astndsgn.com
              </a>
              <span className="text-foreground">626.838.2231</span>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-foreground">Press Inquiries</span>
              <span className="text-foreground">Daniel Lee Austin</span>
              <span className="text-foreground">626.838.2231</span>
              <a href="mailto:press@cghnyc.com" className="text-muted-foreground hover:text-foreground transition-colors">
                press@astndsgn.com
              </a>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-foreground">Daniel Lee Austin</span>
              <span className="text-muted-foreground">San Gabrial Valley</span>
              <span className="text-muted-foreground">Los Angeles, CA 91723</span>
            </div>

            <nav className="flex flex-col gap-1 text-sm">
              {["Twitter", "Instagram", "Facebook"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Artwork */}
          <div className="flex items-start">
            <img
              src={contactArt}
              alt="Colorful paper cut-out botanical artwork"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
