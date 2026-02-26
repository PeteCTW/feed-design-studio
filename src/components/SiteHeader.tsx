import { Search, Menu, TrendingUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Feed", "Policy", "Elections", "Congress", "White House", "Trending"];

const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight leading-none">
              Unfor<span className="text-accent">-gov-</span>able
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <a
                key={cat}
                href="#"
                className="font-body text-xs font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {cat}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-secondary" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button className="hidden sm:block font-body text-xs font-semibold bg-accent text-accent-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Sign Up
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
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
              <div className="flex flex-col gap-1 py-3">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="font-body text-sm font-medium px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
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
