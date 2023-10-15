import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { QueryClientProvider } from "react-query"
import { default as createQueryClientMock } from "@/test/__mocks__/QueryClientMock"
import NewsList from "../NewsList"
import "@testing-library/jest-dom"

const mockCustomFetch = jest.fn()

jest.mock("@/services", () => ({
  customFetch: () => {
    return mockCustomFetch()
  },
}))

const queryClient = createQueryClientMock()

describe("NewsList Component", () => {
  beforeEach(() => {
    mockCustomFetch.mockClear()
    mockCustomFetch.mockReset()
  })

  it("renders loading state", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewsList chooseStory={() => {}} />
      </QueryClientProvider>
    )

    expect(screen.getByText("Content is loading...")).toBeInTheDocument()
  })

  it("renders error state", async () => {
    mockCustomFetch.mockImplementation(() => Promise.reject())

    render(
      <QueryClientProvider client={queryClient}>
        <NewsList chooseStory={() => {}} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(
        screen.getByText("Some error happen, details", { exact: false })
      ).toBeInTheDocument()
    })
  })

  it("renders empty state", async () => {
    mockCustomFetch.mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    )

    render(
      <QueryClientProvider client={queryClient}>
        <NewsList chooseStory={() => {}} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(
        screen.getByText("Looks like there's no news today", { exact: false })
      ).toBeInTheDocument()
    })
  })

  it("renders news cards", async () => {
    // Mocking data for stories
    const mockStories = [
      {
        id: "1",
        title: "Test Story 1",
        img: "test-image-1.jpg",
      },
      {
        id: "2",
        title: "Test Story 2",
        img: "test-image-2.jpg",
      },
    ]

    render(
      <QueryClientProvider client={queryClient}>
        <NewsList chooseStory={() => {}} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      queryClient.setQueryData("stories", mockStories)

      expect(screen.getByText("Test Story 1")).toBeInTheDocument()
      expect(screen.getByText("Test Story 2")).toBeInTheDocument()
    })
  })

  it("handles card click event", async () => {
    const chooseStoryMock = jest.fn()

    const mockStories = [
      {
        id: "1",
        title: "Test Story 1",
        img: "test-image-1.jpg",
      },
    ]

    render(
      <QueryClientProvider client={queryClient}>
        <NewsList chooseStory={chooseStoryMock} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      // Mock the query response
      queryClient.setQueryData("stories", mockStories)

      userEvent.click(screen.getByText("Test Story 1"))

      expect(chooseStoryMock).toHaveBeenCalledWith("1")
    })
  })
})
