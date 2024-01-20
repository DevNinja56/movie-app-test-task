import { Router } from "express"

import AuthController from "../controllers/auth.controller"
import VerifyToken from "../middleware/auth.middleware"

const router = Router()

// Authentication Routes
router.post("/auth/signUp", AuthController.signUp)
router.post("/auth/signIn", AuthController.signIn)

// Verify User
router.get("/auth/me", VerifyToken, AuthController.verifyUser)

export default router
