import mongoose from "mongoose"

import { FavoriteDocument } from "./favorite.interface"

const FavoriteSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: [true, "Movie Name is required"]
    },
    movieCover: {
      type: String,
      required: [true, "Movie Cover is required"]
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"]
    }
  },
  {
    timestamps: true,
    minimize: false
  }
)

FavoriteSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id
  }
})

const Favorite = mongoose.model<FavoriteDocument>("Favorite", FavoriteSchema, "favorites")

export default Favorite
