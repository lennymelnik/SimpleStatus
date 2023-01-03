import express from "express"
import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import auth from "./routes/auth.js"
import system from "./routes/system.js"

import { generalErrorHandler } from "./middleware/middleware.js"



const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())


app.get("/", (_req, res) => res.send("Backend Server is up and running!"));
app.use("/auth", auth)

app.use("/system", system)


app.use(generalErrorHandler)

export default app
