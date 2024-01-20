import http from "http"

import bodyParser from "body-parser"
import cors from "cors"
import express, { Express, Request, Response } from "express"
import mongoose from "mongoose"

import config from "./configurations/config"
import logging from "./configurations/logging"
import AuthRoutes from "./routes/auth.route"
import UserRoutes from "./routes/user.route"
import FavoriteRoutes from "./routes/favorite.route"
import MovieRoutes from "./routes/movie.route"

const app: Express = express()

const NAMESPACE = "Server"

// Public Folder
app.use(express.static("./public"))

mongoose.set("strictQuery", false)

mongoose
  .connect(config.MONGO.URL)
  .then(() => {
    logging.info(NAMESPACE, "Mongo Connected")
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error)
  })

mongoose.Promise = global.Promise

app.use(
  cors({
    origin: "*"
  })
)

app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    )
  })

  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }

  next()
})

/** Routes */

// Base routes

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Movie-App-Backend Application." })
})
app.get(config.SERVER.API_PREFIX, (req: Request, res: Response) => {
  res.json({ message: "Welcome to Movie-App-Backend Application." })
})

app.get(config.SERVER.API_PREFIX, (req: Request, res: Response) => {
  res.json({ message: "Welcome to Movie-App-Backend Application." })
})

// Routes
app.use(config.SERVER.API_PREFIX, AuthRoutes)
app.use(config.SERVER.API_PREFIX, UserRoutes)
app.use(config.SERVER.API_PREFIX, FavoriteRoutes)
app.use(config.SERVER.API_PREFIX, MovieRoutes)

const httpServer = http.createServer(app)

httpServer.listen(config.SERVER.PORT, () => {
  logging.info(NAMESPACE, `Server is running at ${config.SERVER.PORT}`)
})
