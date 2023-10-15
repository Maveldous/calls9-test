import { render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import FeedbackForm from "../FeedbackForm"
import userEvent from "@testing-library/user-event"

describe("FeedbackForm Component", () => {
  let container: Element

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })
  it("renders form elements", () => {
    act(() => {
      render(<FeedbackForm />, { container })
    })

    expect(screen.getByLabelText("Your email")).toBeInTheDocument()
    expect(screen.getByLabelText("Your comment")).toBeInTheDocument()
    expect(screen.getByText("Submit")).toBeInTheDocument()
  })

  // Skiped as it has not resolved bug in js-dom work with base input statement
  it.skip("submits the form", async () => {
    const user = userEvent.setup()
    render(<FeedbackForm />, { container })

    console.log = jest.fn()
    JSON.stringify = (t) => t

    const email = container.querySelector("#email")
    const comment = container.querySelector("#comment")

    if (!(email && comment))
      throw new Error("Email or comment field doesn't exist")

    await user.type(email, "test@example.com")
    await user.type(comment, "This is a test comment")

    const submitButton = screen.getByText("Submit")
    await user.click(submitButton)

    await act(async () => {
      expect(console.log).toHaveBeenCalledWith(
        JSON.stringify({
          by: "test@example.com",
          text: "This is a test comment",
          parent: undefined,
          time: expect.anything(),
          type: "comment",
        })
      )
    })
  })
})
