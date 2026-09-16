import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';

function Header() {
  return (
    <header className="flex justify-between items-center p-4 rounded-2xl  max-w-5xl mx-auto mt-2">
      <HeaderLogo />
      <HeaderNav />
    </header>
  )
}

export default Header;