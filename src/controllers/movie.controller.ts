import axios from "axios"
import { Request, Response } from "express"

import config from "../configurations/config"
import { ExtractMovieTitles, ExtractMovieYear } from "../utilities/functions"

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const { page = 1 } = req.query

    const options = {
      method: "GET",
      url: config.MOVIE_VERSE.URL + `/${+page}`,
      headers: {
        "X-RapidAPI-Key": config.MOVIE_VERSE.API_KEY,
        "X-RapidAPI-Host": config.MOVIE_VERSE.API_HOST
      }
    }

    const response = await axios.request(options)

    const data = response.data.movies.map((movie: any) => ({
      title: ExtractMovieTitles(movie.text),
      cover: movie.img
    }))

    return res.status(200).json({
      status: true,
      message: "Movie found successfully",
      data: {
        movies: data,
        currentPage: +page,
        totalPages: response.data.totalPages,
        itemsPerPage: response.data.itemsPerPage
      }
    })
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

const searchMovieByName = async (req: Request, res: Response) => {
  try {
    const { text } = req.query

    return res.status(200).json({
      status: true,
      message: "Movie found successfully",
      data: await onSearchMovieApi(text as string)
    })
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    return res.status(200).json({
      status: true,
      message: "Movie found successfully",
      data: await onGetMovieDetailById(id as string)
    })
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

const getMovieByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const searchMovie = await onSearchMovieApi(name as string)
    const { id } = searchMovie.find((movie: any) => +movie.movieReleaseYear === +ExtractMovieYear(name))

    return res.status(200).json({
      status: true,
      message: "Movie found successfully",
      data: await onGetMovieDetailById(id as string)
    })
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

const onSearchMovieApi = async (text: string) => {
  const options = {
    method: "GET",
    url: config.IMDB.URL,
    params: { query: text },
    headers: {
      "X-RapidAPI-Key": config.IMDB.API_KEY,
      "X-RapidAPI-Host": config.IMDB.API_HOST
    }
  }

  const response = await axios.request(options)

  return response.data.titleResults.results.map((movie: any) => ({
    id: movie.id,
    title: movie.titleNameText,
    cover: movie.titlePosterImageModel ? movie.titlePosterImageModel.url : "",
    movieReleaseYear: movie.titleReleaseText,
    topCredits: movie.topCredits
  }))
}

const onGetMovieDetailById = async (id: string) => {
  const options = {
    method: "GET",
    url: config.IMDB.MOVIE_DETAIL_URL,
    params: { id },
    headers: {
      "X-RapidAPI-Key": config.IMDB.API_KEY,
      "X-RapidAPI-Host": config.IMDB.API_HOST
    }
  }

  const response = await axios.request(options)

  const {
    titleText,
    primaryImage,
    titleType,
    canHaveEpisodes,
    episodes,
    releaseYear,
    releaseDate,
    ratingsSummary,
    featuredReviews,
    genres,
    plot,
    countriesOfOrigin,
    production,
    cast,
    creators
  } = response.data

  return {
    id,
    title: titleText ? titleText.text : "",
    cover: primaryImage ? primaryImage.url : "",
    caption: primaryImage ? primaryImage.caption.plainText : "",
    titleType: titleType
      ? {
          type: titleType.text,
          isSeries: titleType.isSeries,
          isEpisode: titleType.isEpisode,
          canHaveEpisodes: canHaveEpisodes,
          totalEpisodes: episodes ? episodes.episodes.total : ""
        }
      : "",
    releaseYear: releaseYear
      ? {
          year: releaseYear.year,
          endYear: releaseYear.endYear
        }
      : "",
    releaseDate: releaseDate
      ? {
          day: releaseDate.day,
          month: releaseDate.month,
          year: releaseDate.year
        }
      : "",
    rating: ratingsSummary
      ? {
          ratingsSummary: ratingsSummary.aggregateRating,
          voteCount: ratingsSummary.voteCount
        }
      : "",
    featuredReviews: featuredReviews
      ? featuredReviews.edges.map((review: any) => ({
          author: review.node.author.nickName,
          summary: review.node.summary.originalText,
          review: review.node.text.originalText.plainText,
          rating: review.node.authorRating,
          submissionDate: review.node.submissionDate
        }))
      : "",
    genres: genres ? genres.genres.map((genre: any) => genre.text) : "",
    language: plot ? plot.language.id : "",
    countryOfOrigin: countriesOfOrigin ? countriesOfOrigin.countries.map((country: any) => country.id) : "",
    production: production ? production.edges.map((production: any) => production.node.company.companyText.text) : "",
    cast: cast
      ? cast.edges.map((cast: any) => ({
          name: cast.node.name.nameText.text,
          image: cast.node.name.primaryImage ? cast.node.name.primaryImage.url : "",
          category: cast.node.category.id,
          characters: cast.node.characters.map((character: any) => character.name)
        }))
      : "",
    credits: creators
      ? creators.map((creator: any) => ({
          category: creator.category.text,
          name: creator.credits.map((credit: any) => credit.name.nameText.text)
        }))
      : ""
  }
}

export default { getAllMovies, searchMovieByName, getMovieById, getMovieByName }
