import { Router } from "express"

import FavoriteController from "../controllers/favorite.controller"
import VerifyToken from "../middleware/auth.middleware"

const router = Router()

// Create Favorite List
router.post("/favorite-list", VerifyToken, FavoriteController.createFavoriteList)

// Get All Favorite Lists
router.get("/favorite-list/all", VerifyToken, FavoriteController.findAllFavoriteList)

// Get All Favorite Lists By UserID
router.get("/favorite-list/all/user", VerifyToken, FavoriteController.findAllFavoriteListByUser)

// Find Favorite List By Id
router.get("/favorite-list/:id", VerifyToken, FavoriteController.findOneFavoriteList)

//Update Favorite List By Id
router.patch("/favorite-list/:id", VerifyToken, FavoriteController.updateFavoriteList)

//Delete Favorite List By Id
router.delete("/favorite-list/:id", VerifyToken, FavoriteController.deleteFavoriteList)

export default router
