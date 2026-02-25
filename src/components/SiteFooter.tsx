const SiteFooter = () => {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold">
              THE DAILY<span className="text-accent">.</span>
            </h3>
            <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
              Delivering independent, quality journalism since 2026.
            </p>
          </div>
          {[
            { title: "Sections", links: ["World", "Technology", "Business", "Science"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Advertise"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Accessibility"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold tracking-wide uppercase mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-display text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="font-display text-xs text-muted-foreground">
            © 2026 The Daily. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
