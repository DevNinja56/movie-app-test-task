import { Request, Response } from "express"

import User from "../models/user/user.modal"

const findAllUsers = async (req: Request, res: Response) => {
  try {
    const findAllUsers = await User.find({})

    if (findAllUsers) {
      return res.status(200).json({
        status: true,
        message: "Users found successfully",
        data: findAllUsers
      })
    }
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

const findUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const findUser = await User.findById(userId)

    return res.status(200).json({
      status: true,
      message: "User found successfully",
      data: findUser
    })
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const findUser = await User.findById(req.params.id)

    if (findUser) {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        upsert: false,
        runValidators: true
      })

      if (updateUser) {
        return res.status(200).json({
          status: true,
          message: "User updated successfully",
          data: updateUser
        })
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "User not found against this id",
        data: null
      })
    }
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const data = await User.findByIdAndDelete(userId)

    if (data) {
      return res.status(200).json({
        status: true,
        message: "User deleted successfully",
        data: null
      })
    } else {
      return res.status(404).json({
        status: false,
        message: "User not found against this id",
        data: null
      })
    }
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: (error as Error).message,
      data: null
    })
  }
}

export default {
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser
}
