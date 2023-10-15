interface IProps {
  cardImg: string
  title: string
  description: string
  badges?: string[]
  isFocused?: boolean
  onClick?: () => void
}

function Card({
  cardImg,
  title,
  description,
  badges,
  isFocused,
  onClick,
}: IProps) {
  return (
    <article
      className={`max-w-[360px] h-full flex flex-col hover:bg-white hover:shadow-sm focus:bg-white rounded-md cursor-pointer ${
        isFocused && "bg-white"
      }`}
      onClick={onClick}
    >
      <img
        src={cardImg}
        alt={`article image`}
        className="w-[360px] rounded-t-md"
      />
      <div className="flex flex-col p-4 flex-1">
        <p className="text-blue-400 text-xl">{title}</p>
        <p className="text-base mt-5 mb-10">{description}</p>
        <ul className="flex gap-2 flex-1 items-end">
          {badges?.map((badgeTitle) => (
            <li key={`${badgeTitle}article-badge-title`}>
              <div className="bg-gray-400 text-white px-2 py-1 uppercase">
                {badgeTitle}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
export default Card
