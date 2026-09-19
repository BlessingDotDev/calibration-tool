
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

function FooterBrand() {
  return (
    <div className="max-w-sm">

      <NavLink to="/" className="inline-flex items-center gap-2">
        <img
          className="h-10 w-10"
          src={logo}
          alt="PlotSci Logo"
        />

        <p className="text-xl font-semibold tracking-wider text-text">
          Plot
          <span className="pl-1 text-secondary">
            Sci
          </span>
        </p>
      </NavLink>

      <p className="mt-4 text-sm leading-6 text-text/50">
        A simple and powerful tool for creating calibration
        curves, analysing data, and visualising scientific results.
      </p>

    </div>
  );
}

export default FooterBrand;

