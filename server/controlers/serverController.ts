import session from "express-session";
import {default as RedisStore} from "connect-redis";
import {redisClient} from "../redis";
import 'dotenv/config'


export const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET || 'defaultSecret',
    name: "sessionId",
    store: new RedisStore({client: redisClient}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production" ? true : "auto",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }
});

export const wrap = (expressMiddleware: any) => (socket: any, next: any) => expressMiddleware(socket.request, {}, next)

export const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true
}
