import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#080C10",
        borderTop: "1px solid rgba(242,154,46,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full btn-orange flex items-center justify-center font-display font-bold text-sm">
                EW
              </div>
              <div className="font-display font-bold">
                <span className="text-orange">Engineering</span>{" "}
                <span className="text-foreground">Wala</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Indore's most deliciously engineered food. Crafted with precision,
              served with love.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "home" },
                { label: "Menu", id: "menu" },
                { label: "About Us", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted-foreground hover:text-orange transition-colors"
                    data-ocid={`footer.${link.id}.link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm">Visit Us</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Near Bhawarkua Square,
              </p>
              <p className="text-sm text-muted-foreground">
                Indore, Madhya Pradesh
              </p>
              <p className="text-sm text-muted-foreground">Pin: 452010</p>
              <p className="text-sm text-orange font-medium">+91 97132 25322</p>
              <p className="text-sm text-muted-foreground">
                engineeringwala@gmail.com
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-4">
              {[
                { Icon: SiInstagram, label: "Instagram", href: "#" },
                { Icon: SiFacebook, label: "Facebook", href: "#" },
                { Icon: SiX, label: "Twitter", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-orange hover:border-orange/50 transition-all"
                  data-ocid={`footer.${label.toLowerCase()}.link`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Mon-Sun: 10 AM - 11 PM
            </p>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            © {year} Engineering Wala. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
