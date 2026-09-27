import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  LogIn,
  UserPlus,
  ShieldCheck,
  FileText,
  ChevronRight,
  ChartNoAxesCombined,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent background scrolling when menu is open
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
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
    },
    {
      name: "Plot Graph",
      path: "/plot",
      icon: ChartNoAxesCombined,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
    },
  ];

  const authItems = [
    {
      name: "Sign In",
      path: "/login",
      icon: LogIn,
    },
    {
      name: "Create Account",
      path: "/register",
      icon: UserPlus,
    },
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

      {/* Mobile Menu */}
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

          {/* Navigation Label */}
          <div className="mb-3 px-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </p>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-secondary/10 text-secondary"
                        : "text-foreground hover:bg-background hover:text-secondary"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />

                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  </div>

                  <ChevronRight
                    size={16}
                    strokeWidth={1.8}
                    className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-4 h-px bg-border" />

          {/* Authentication */}
          <div className="mb-3 px-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Account
            </p>
          </div>

          <div className="space-y-2">
            {authItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-secondary text-white"
                        : "bg-background text-foreground hover:bg-secondary/10 hover:text-secondary"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />

                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  </div>

                  <ChevronRight
                    size={16}
                    strokeWidth={1.8}
                    className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-border" />

          {/* Legal */}
          <div className="flex items-center gap-4 px-3 pb-1">
            <NavLink
              to="/privacy"
              onClick={closeMenu}
              className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-secondary"
            >
              <ShieldCheck size={14} strokeWidth={1.8} />

              <span>Privacy Policy</span>
            </NavLink>

            <span className="text-border">•</span>

            <NavLink
              to="/terms"
              onClick={closeMenu}
              className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-secondary"
            >
              <FileText size={14} strokeWidth={1.8} />

              <span>Terms</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;