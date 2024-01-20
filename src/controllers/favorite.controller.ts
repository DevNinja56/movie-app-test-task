import { Request, Response } from "express"

import { RequestWithUser } from "../interfaces"
import Favorite from "../models/favorite/favorite.modal"

const createFavoriteList = async (req: RequestWithUser, res: Response) => {
  try {
    const payload = { ...req.body, userId: req.user ? req.user.id : "" }
    const response = await Favorite.create(payload)

    if (response) {
      return res.status(201).json({
        status: true,
        message: "Favorite List added successfully",
        data: response
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

const findAllFavoriteList = async (req: Request, res: Response) => {
  try {
    const response = await Favorite.find({})

    if (response) {
      return res.status(200).json({
        status: true,
        message: "Favorite List found successfully",
        data: response
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

const findAllFavoriteListByUser = async (req: RequestWithUser, res: Response) => {
  try {
    const response = await Favorite.find({ userId: req.user ? req.user.id : "" })

    if (response) {
      return res.status(200).json({
        status: true,
        message: "Favorite List found successfully",
        data: response
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

const findOneFavoriteList = async (req: Request, res: Response) => {
  try {
    const response = await Favorite.findById(req.params.id)

    if (response) {
      return res.status(200).json({
        status: true,
        message: "Favorite List found successfully",
        data: response
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

const updateFavoriteList = async (req: Request, res: Response) => {
  try {
    const findFavorite = await Favorite.findById(req.params.id)

    if (findFavorite) {
      const updateFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        upsert: false,
        runValidators: true
      })

      if (updateFavorite) {
        return res.status(200).json({
          status: true,
          message: "Favorite List updated successfully",
          data: updateFavorite
        })
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "Favorite List not found against this id",
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

const deleteFavoriteList = async (req: Request, res: Response) => {
  try {
    const favoriteListId = req.params.id
    const data = await Favorite.findByIdAndDelete(favoriteListId)

    if (data) {
      return res.status(200).json({
        status: true,
        message: "Favorite List removed successfully",
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
  createFavoriteList,
  findAllFavoriteList,
  findAllFavoriteListByUser,
  findOneFavoriteList,
  updateFavoriteList,
  deleteFavoriteList
}
