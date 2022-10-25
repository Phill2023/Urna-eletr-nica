import express from "express"
import { routes } from "./routes.js"
import cors from 'cors'

const server = express()

const port = 8888
server.use(cors)
server.use(express.json())

server.use(routes)

server.listen(port, () => console.log("servidor rodando"))