
import { NavLink } from "react-router-dom";

function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">

      {/* Product */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text">
          Product
        </h3>

        <div className="flex flex-col gap-3 text-sm text-text/50">
          <NavLink
            to="/project"
            className="transition hover:text-text"
          >
            Plot Graph
          </NavLink>

          <NavLink
            to="/about"
            className="transition hover:text-text"
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className="transition hover:text-text"
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Account */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text">
          Account
        </h3>

        <div className="flex flex-col gap-3 text-sm text-text/50">
          <NavLink
            to="/login"
            className="transition hover:text-text"
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className="transition hover:text-text"
          >
            Sign Up
          </NavLink>
        </div>
      </div>

      {/* Legal */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text">
          Legal
        </h3>

        <div className="flex flex-col gap-3 text-sm text-text/50">
          <NavLink
            to="/privacy"
            className="transition hover:text-text"
          >
            Privacy
          </NavLink>

          <NavLink
            to="/terms"
            className="transition hover:text-text"
          >
            Terms
          </NavLink>
        </div>
      </div>

    </div>
  );
}

export default FooterLinks;
