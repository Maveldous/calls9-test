const COMMENT_TYPE = "comment"

interface IProps {
  storyId?: string
}

function FeedbackForm({ storyId }: IProps) {
  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      comment: { value: string }
    }

    console.log(
      JSON.stringify({
        by: target.email?.value,
        text: target.comment?.value,
        parent: storyId,
        time: new Date(),
        type: COMMENT_TYPE,
      })
    )
  }

  return (
    <div className="bg-slate-800 px-10 md:px-20 pb-20">
      <h2 className="text-white text-center text-2xl py-10">Leave a comment</h2>
      <form
        className="flex flex-col items-stretch mx-auto w-80"
        onSubmit={submitForm}
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@somemail.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your comment
          </label>
          <textarea
            placeholder="Leave your comment here"
            name="comment"
            id="comment"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
export default FeedbackForm
