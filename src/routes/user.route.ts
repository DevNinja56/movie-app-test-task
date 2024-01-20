import { Router } from "express"

import UserController from "../controllers/user.controller"
import VerifyToken from "../middleware/auth.middleware"

const router = Router()

// Get All Users
router.get("/user/all", VerifyToken, UserController.findAllUsers)

// Find User By Id
router.get("/user/:id", VerifyToken, UserController.findUserById)

//Update User By Id
router.patch("/user/:id", VerifyToken, UserController.updateUser)

//Delete User By Id
router.delete("/user/:id", VerifyToken, UserController.deleteUser)

export default router
