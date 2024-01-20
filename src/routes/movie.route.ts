import { Router } from "express"

import MovieController from "../controllers/movie.controller"
import VerifyToken from "../middleware/auth.middleware"

const router = Router()

// Get All movies
router.get("/movie/all", VerifyToken, MovieController.getAllMovies)

// Get All movies by search
router.get("/movie-search", VerifyToken, MovieController.searchMovieByName)

// Get movie details by id
router.post("/movie-details/id", VerifyToken, MovieController.getMovieById)

// Get movie details by name
router.post("/movie-details/name", VerifyToken, MovieController.getMovieByName)

export default router
