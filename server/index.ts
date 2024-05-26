import express from 'express'
import {createServer} from "http"
import {Server} from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'
import Redis from "ioredis"
const RedisStore = require("connect-redis").default;
import authRouter from "./routers/authRouter";
import 'dotenv/config'
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./server_declarations";


const app = express()
const httpServer = createServer(app)
const PORT = 4000

const socketIO = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    }
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({message: 'Hello World!'});
})

const redisClient = new Redis();

let redisStore = new RedisStore({
    client: redisClient,
});

app.use(helmet());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json())

app.use(session({
    secret: process.env.COOKIE_SECRET || 'defaultSecret',
    //@ts-ignore тут можно добавить интерфейс для credentials
    // credentials: true,
    name: "sessionId",
    store: new RedisStore({client:redisClient}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIROMENT === "production" ? true : "auto",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        sameSite: process.env.ENVIROMENT === "production" ? "none" : "lax",
    }
}))
app.use(authRouter)

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} Подключился`)
    socket.on('disconnect', () => {
        console.log(`${socket.id} Отключился`)
    })
})

httpServer.listen(PORT, () => {
    console.log(`Порт сервера: ${PORT}`)
})

// TODO добавить типы либо удалить полность креденшионалс
