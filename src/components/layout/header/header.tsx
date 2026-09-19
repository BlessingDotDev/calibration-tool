import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';

function Header() {
  return (
    <header className="flex justify-between items-center p-4 rounded-2xl bg-surface max-w-5xl mx-auto mt-4 mb-4">
      <HeaderLogo />
      <HeaderNav />
    </header>
  )
}

export default Header;