import logo from "assets/logo.png"
import { Nav } from "components/Nav"
import { LinkConfig } from "./link-config"

function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-2 bg-white border-gray-300 border-b-4 shadow-md">
      <img className="ml-4" src={logo} alt="Logo" />
      <Nav navItems={LinkConfig} />
    </header>
  )
}
export default Header
