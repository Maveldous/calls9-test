const BASE_URL = "https://hacker-news.firebaseio.com/v0/"

export default (requestString: string, options?: RequestInit) =>
  fetch(`${BASE_URL}${requestString}`, options)
