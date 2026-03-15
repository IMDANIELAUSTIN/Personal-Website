import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "/src/components/ui/sonner";
import { Toaster } from "/src/components/ui/toaster";
import { TooltipProvider } from "/src/components/ui/tooltip";
import Index from "/src/pages/Index.tsx";
import Work from "/src/pages/Work.tsx";
import About from "/src/pages/About.tsx";
import Contact from "/src/pages/Contact.tsx";
import ProjectDetail from "/src/pages/ProjectDetail.tsx";
import NotFound from "/src/pages/NotFound.tsx";
import ScrollToTop from "/src/components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
