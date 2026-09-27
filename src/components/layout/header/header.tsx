import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import MobileMenu from "./MobileMenu";

function Header() {
  return (
    <header className="mx-auto mt-4 mb-4 flex max-w-5xl items-center justify-between rounded-2xl bg-surface p-4">
      <HeaderLogo />

      <div className="hidden md:block">
        <HeaderNav />
      </div>

      <div className="block md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}

export default Header;