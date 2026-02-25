const SiteFooter = () => {
  return (
    <footer className="border-t border-border mt-16 bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold">
              Unfor<span className="text-accent">-gov-</span>able
            </h3>
            <p className="font-body text-xs text-primary-foreground/60 mt-2 leading-relaxed">
              Accountability in every line. Independent political journalism since 2026.
            </p>
          </div>
          {[
            { title: "Sections", links: ["Policy", "Elections", "Congress", "White House"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Advertise"] },
            { title: "Legal", links: ["Privacy", "Terms", "Ethics Policy", "Corrections"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-xs font-semibold tracking-widest uppercase mb-3 text-primary-foreground/80">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-xs text-primary-foreground/50 hover:text-accent transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center">
          <p className="font-body text-[10px] text-primary-foreground/40 tracking-wider">
            © 2026 Unfor-gov-able. All rights reserved. All articles require minimum 3 citations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
