import { NewsList } from "components/NewsList"
import { FeedbackForm } from "components/FeedbackForm"
import { useState } from "react"

function Main() {
  const [currentStory, setStory] = useState("")

  return (
    <main className="bg-gray-100 flex-1">
      <h1 className="text-center text-3xl py-16">News</h1>
      <section>
        <NewsList chooseStory={setStory} choosedStory={currentStory} />
      </section>
      <section>
        <FeedbackForm storyId={currentStory} />
      </section>
    </main>
  )
}
export default Main
