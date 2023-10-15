import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Card from "../Card"

describe("Card Component", () => {
  const mockCard = {
    cardImg: "image-url.jpg",
    title: "Test Card",
    description: "Test description",
    badges: ["Badge 1", "Badge 2"],
    onClick: jest.fn(),
  }

  it("renders card content", () => {
    render(<Card {...mockCard} />)

    expect(screen.getByText(mockCard.title)).toBeInTheDocument()
    expect(screen.getByText(mockCard.description)).toBeInTheDocument()

    mockCard.badges.forEach((badge) => {
      expect(screen.getByText(badge)).toBeInTheDocument()
    })
  })

  it("triggers onClick when clicked", () => {
    render(<Card {...mockCard} />)

    fireEvent.click(screen.getByText(mockCard.title))

    expect(mockCard.onClick).toHaveBeenCalled()
  })
})
