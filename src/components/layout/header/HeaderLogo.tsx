import logo from '../../../assets/logo.png';

function HeaderLogo() {
  return (
    <div className="flex items-center gap-2">
      <img className="h-10 w-10" src={logo} alt="Logo" />

      <p className="hidden md:block text-xl font-semibold tracking-wider ">
        Plot
        <span className="text-secondary pl-1">
          Sci
        </span>
      </p>
    </div>
  )
}

export default HeaderLogo;