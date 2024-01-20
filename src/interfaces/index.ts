import { Request } from "express"

import { UserDocument } from "../models/user/user.interface"

export interface RequestWithUser extends Request {
  token?: string
  user?: UserDocument | null
}
