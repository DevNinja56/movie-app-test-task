import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import config from "../configurations/config"
import { UserDocument } from "../models/user/user.interface"
import User from "../models/user/user.modal"

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, ...rest } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({
        status: false,
        message: "User already exist",
        data: null
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const payload = { ...rest, email, password: hashedPassword }
    const createUser = await User.create(payload)

    return res.status(200).json({
      status: true,
      message: "User created successfully",
      data: createUser
    })
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: error as Error,
      data: null
    })
  }
}

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const findUser: UserDocument | null = await User.findOne({ email })

    if (!findUser) {
      return res.status(406).json({
        status: false,
        message: "Invalid Credentials"
      })
    }

    const comparePassword = await bcrypt.compare(password, findUser["password"])

    if (!comparePassword) {
      return res.status(406).json({
        status: false,
        message: "Invalid Credentials"
      })
    }

    const signedToken = jwt.sign({ id: findUser._id, email: findUser.email }, config.SERVER.SECRET_TOKEN)

    return res.status(200).json({
      status: true,
      token: signedToken,
      data: findUser
    })
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message
    })
  }
}

const verifyUser = async (req: Request | any, res: Response) => {
  try {
    if (req.user && req.token) {
      return res.status(200).json({
        status: true,
        token: req.token,
        data: req.user
      })
    }
  } catch (error: unknown) {
    res.status(500).json({
      status: false,
      message: (error as Error).message
    })
  }
}

export default {
  signUp,
  signIn,
  verifyUser
}
