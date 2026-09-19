import logo from '../../../assets/logo.png';
import { NavLink } from 'react-router-dom';

function HeaderLogo() {
  return (
    <NavLink to="/" className="flex items-center gap-2">
      <img className="h-10 w-10" src={logo} alt="Logo" />

      <p className="hidden md:block text-xl font-semibold tracking-wider ">
        Plot
        <span className="text-secondary pl-1">
          Sci
        </span>
      </p>
    </NavLink>
  )
}

export default HeaderLogo;