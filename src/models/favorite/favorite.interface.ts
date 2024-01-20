import mongoose from "mongoose"

/**
 * UserDetail interface
 */
export interface FavoriteDocument extends mongoose.Document {
  movieName: string
  movieCover: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
