import mongoose from "mongoose"

/**
 * UserDetail interface
 */
export interface UserDocument extends mongoose.Document {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
