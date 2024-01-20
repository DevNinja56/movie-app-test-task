import mongoose from "mongoose"

import { UserDocument } from "./user.interface"

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exist"]
    },
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8
    }
  },
  {
    timestamps: true,
    minimize: false
  }
)

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id
  }
})

const User = mongoose.model<UserDocument>("User", UserSchema, "users")

export default User
