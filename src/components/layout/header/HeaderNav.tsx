import Button from '../../ui/Button';

function HeaderNav() {
  return (
    <nav className="flex items-center justify-between w-lg">
      <div className="flex gap-2">
        <Button variant="navButton">About</Button>
        <Button variant="navButton">Contact</Button>
        <Button variant="navButton">Plot Graph</Button>
      </div>

      <div>
        <Button variant="navLink">Login</Button>|
        <Button variant="navLink" className="text-secondary">Sign Up</Button>
      </div>
    </nav>
  )
}

export default HeaderNav;