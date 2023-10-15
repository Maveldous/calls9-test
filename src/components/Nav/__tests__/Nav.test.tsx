import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Nav from "../Nav"

describe("Nav Component", () => {
  const mockNavItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
  ]

  it("renders navigation items", () => {
    render(<Nav navItems={mockNavItems} />)

    mockNavItems.forEach((navItem) => {
      expect(screen.getByText(navItem.title)).toBeInTheDocument()
    })
  })

  it("toggles mobile menu visibility", () => {
    render(<Nav navItems={mockNavItems} />)

    const menuButton = screen.getByText("Menu")

    fireEvent.click(menuButton)

    const mobileMenu = screen.queryByRole("menubar")

    expect(mobileMenu).toBeInTheDocument()

    fireEvent.click(menuButton)

    expect(mobileMenu).not.toBeVisible()
  })
})
