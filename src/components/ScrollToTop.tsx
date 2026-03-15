import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setVisible(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
};
export default ScrollToTop;
