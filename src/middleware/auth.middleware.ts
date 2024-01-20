import { NextFunction, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

import config from "../configurations/config"
import { RequestWithUser } from "../interfaces"
import User from "../models/user/user.modal"

const VerifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  let token = ""

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Not authorized to access this route"
    })
  }

  try {
    const verifyUser: JwtPayload | string = jwt.verify(token, config.SERVER.SECRET_TOKEN) as {
      id: string
      email: string
    }

    req.user = await User.findOne({ email: verifyUser["email"] })
    req.token = token

    next()
  } catch (error: unknown) {
    return res.status(401).json({
      status: false,
      message: "Not authorized to access this route"
    })
  }
}

export default VerifyToken
