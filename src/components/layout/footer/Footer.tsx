
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";

function Footer() {
  return (
    <footer className="max-w-5xl mx-auto mt-12 mb-4 rounded-2xl bg-surface px-6 py-8">

      {/* Main footer content */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

        <FooterBrand />

        <FooterLinks />

      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-white/10" />

      {/* Bottom footer */}
      <div className="flex flex-col gap-3 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">

        <p>
          © {new Date().getFullYear()} PlotSci. All rights reserved.
        </p>

        <p>
          Built for science.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
