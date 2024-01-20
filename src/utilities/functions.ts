export const ExtractMovieTitles = (string: string): string => {
  const titleRegex = /Download (.+? \(\d+\))/
  const text = string.match(titleRegex)
  return text ? text[1] : ""
}

export const ExtractMovieYear = (string: string): string => {
  const yearRegex = /\((\d+)\)/
  const text = string.match(yearRegex)
  return text ? text[1] : ""
}
