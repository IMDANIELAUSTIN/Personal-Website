import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border px-6 md:px-12 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {[
            { label: "Home", path: "/" },
            { label: "Work", path: "/" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Address */}
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-foreground">Daniel Lee Austin</span>
          <span className="text-muted-foreground">San Gabriel Valley</span>
          <span className="text-muted-foreground">Los Angeles, CA 91723</span>
          <span className="text-muted-foreground">626.838.2231</span>
        </div>

        {/* Inquiries */}
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground">Work Inquiries</span>
            <a href="mailto:info@astndsgn.com" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              info@astndsgn.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground">Press Inquiries</span>
            <span className="text-muted-foreground">Daniel Lee Austin</span>
            <span className="text-muted-foreground">626.838.2231</span>
            <a href="mailto:press@astndsgn.com" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              press@astndsgn.com
            </a>
          </div>
        </div>

        {/* Social */}
        <nav className="flex flex-col gap-2 text-sm">
          {["Twitter", "Threads", "Instagram", "Facebook", "Substack", "Medium"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
