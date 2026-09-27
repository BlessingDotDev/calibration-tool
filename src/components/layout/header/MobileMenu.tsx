import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent scrolling while the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Plot Graph", path: "/plot" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface transition-all duration-300 hover:border-secondary hover:text-secondary"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <X size={22} strokeWidth={1.8} />
        ) : (
          <Menu size={22} strokeWidth={1.8} />
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation */}
      <aside
        id="mobile-navigation"
        className={`fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-4">
          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-foreground hover:bg-background hover:text-secondary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-4 h-px bg-border" />

          {/* Legal Links */}
          <div className="flex items-center justify-between px-4 pb-1 text-xs">
            <NavLink
              to="/privacy"
              onClick={closeMenu}
              className="text-muted-foreground transition-colors hover:text-secondary"
            >
              Privacy Policy
            </NavLink>

            <span className="text-border">•</span>

            <NavLink
              to="/terms"
              onClick={closeMenu}
              className="text-muted-foreground transition-colors hover:text-secondary"
            >
              Terms
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;