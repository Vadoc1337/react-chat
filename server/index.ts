import express from 'express'
import {createServer} from "http"
import {Server} from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import authRouter from "./routers/authRouter";
import 'dotenv/config'
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./server_declarations";
import {corsConfig, sessionMiddleware, wrap} from "./controlers/serverController";
import {addColleague, authorizeUser, initializeUser, onDisconnect} from "./controlers/socketController";
import {direct_message} from "./controlers/direct_message";

const app = express()
const httpServer = createServer(app)
const PORT = 4000

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {cors: corsConfig})

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json())
app.use(sessionMiddleware)
app.use(authRouter)

io.use(wrap(sessionMiddleware))
io.use(authorizeUser)
io.on('connect', (socket: any) => {
    initializeUser(socket)
    socket.on("add_colleague", (colleagueName: any, callback: () => void) => {
        addColleague(socket, colleagueName, callback)
    })

    socket.on
    ("direct_message", (message:any) => {
        console.log(message, "Приемник сокета с фронта")
            direct_message(socket, message)
        }
    )

    socket.on
    ("disconnecting", () =>
        onDisconnect(socket)
    )
})


httpServer.listen(PORT, () => {
    console.log(`Порт сервера: ${PORT}`)
})