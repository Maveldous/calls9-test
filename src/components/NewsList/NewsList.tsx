import { useQuery } from "react-query"

import { Card } from "components/Card"
import { customFetch } from "@/services"

import CardImage0 from "assets/card-image-0.jpeg"
import CardImage1 from "assets/card-image-1.jpeg"
import CardImage2 from "assets/card-image-2.jpeg"
import CardImage3 from "assets/card-image-3.jpeg"

import { useMemo } from "react"

const cardImages = [CardImage0, CardImage1, CardImage2, CardImage3]

interface IProps {
  choosedStory?: string
  chooseStory: (storyId: string) => void
}

function NewsList({ chooseStory, choosedStory }: IProps) {
  const {
    isLoading,
    error,
    data: stories,
  } = useQuery("stories", async () => {
    const topStories = await customFetch("topstories.json")
      .then((res) => res.json())
      .catch((e) => {
        throw new Error(e)
      })

    return Promise.all(
      topStories
        .slice(0, 9)
        .map((id: string) =>
          customFetch(`item/${id}.json`).then((res) => res.json())
        )
    )
  })

  const storiesWithImages = useMemo(() => {
    return (
      stories?.map((story) => ({
        ...story,
        img: cardImages[Math.floor(Math.random() * 4)],
      })) || []
    )
  }, [stories])

  if (isLoading)
    return <div className="min-h-screen text-center">Content is loading...</div>

  if (error)
    return (
      <div className="min-h-screen text-center">{`Some error happen, details: ${error}`}</div>
    )

  return (
    <ul className="flex flex-wrap justify-center items-stretch gap-5 px-6 md:px-12 pb-10">
      {!storiesWithImages.length && "Looks like there's no news today :("}
      {storiesWithImages.map((story) => (
        <li key={`${story.url}+${story.title}`}>
          {/* As per requerements we do not have any description to how we pick story to comment I leave card without opportunity to go thru the link */}
          {/* <a href={story.url}> */}
          <Card
            cardImg={story.img}
            title={story.title}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde neque quae tempora exercitationem amet rerum. Dolore, alias natus. Provident dolorum quisquam maxime aut quis animi corrupti. Corporis praesentium atque amet!"
            }
            badges={["Gaming", "Wow"]}
            isFocused={choosedStory === story.id}
            onClick={() => chooseStory(story.id)}
          />
          {/* </a> */}
        </li>
      ))}
    </ul>
  )
}
export default NewsList
