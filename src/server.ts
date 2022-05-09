import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import "./database"
import "./shared/container"
import { router } from "./routes"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())


app.use(router)



app.listen(3333, () => console.log("Server está Rodando"))