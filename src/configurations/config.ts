import * as dotenv from "dotenv"
dotenv.config()

const config = {
  MONGO: {
    URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/development"
  },
  SERVER: {
    API_PREFIX: process.env.API_PREFIX || "/api/v1",
    PORT: process.env.PORT || 4000,
    SECRET_TOKEN: process.env.TOKEN_SECRET || ""
  },
  MOVIE_VERSE: {
    URL: process.env.MOVIE_VERSE_URL || "",
    API_KEY: process.env.MOVIE_VERSE_API_KEY || "",
    API_HOST: process.env.MOVIE_VERSE_API_HOST || ""
  },
  IMDB: {
    URL: process.env.IMDB_URL || "",
    MOVIE_DETAIL_URL: process.env.IMDB_MOVIE_DETAIL_URL || "",
    API_KEY: process.env.IMDB_API_KEY || "",
    API_HOST: process.env.IMDB_API_HOST || ""
  }
}

export default config
