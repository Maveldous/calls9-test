import Link from "./Link"
import { ReactNode, useState } from "react"

export interface ILink {
  title: ReactNode | string
  link: string
}

interface IProps {
  navItems: ILink[]
}

function Nav({ navItems }: IProps) {
  const [mobMenuVisible, setMobMenuVisible] = useState(false)

  const toggleMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setMobMenuVisible((state) => !state)
  }

  return (
    <nav>
      <ul className="items-center hidden sm:flex">
        {navItems.map(({ title, link }) => (
          <li key={`Nav-${title}${link}`}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
      </ul>
      <div className="relative">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:hidden"
          onClick={toggleMenu}
        >
          Menu
        </button>
        {mobMenuVisible && (
          <ul
            role="menubar"
            className="absolute right-0 rounded-sm shadow-md bg-white w-fit whitespace-nowrap items-center flex flex-col sm:hidden"
          >
            {navItems.map(({ title, link }) => (
              <li className="my-3 w-full" key={`Nav-${title}${link}`}>
                <Link className="w-full block text-center" to={link}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
export default Nav
