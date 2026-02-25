import { Search, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["World", "Technology", "Business", "Science", "Culture", "Sports"];

const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="container">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-sm font-display text-muted-foreground">
            Tuesday, February 25, 2026
          </span>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button className="font-display text-sm font-medium bg-accent text-accent-foreground px-4 py-1.5 rounded-sm hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="py-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            THE DAILY<span className="text-accent">.</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-display tracking-widest uppercase">
            Independent Journalism
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-t border-border">
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="font-display text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-accent transition-colors"
            >
              {cat}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex justify-center py-3 border-t border-border">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 font-display text-sm font-medium text-muted-foreground"
          >
            <Menu className="w-4 h-4" />
            Sections
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col items-center gap-3 py-4">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="font-display text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-accent transition-colors"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default SiteHeader;
