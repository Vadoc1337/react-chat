import {NextFunction} from "express";
import {redisClient} from "../redis";

export const rateLimiter = async (req: any, res: any, next: NextFunction) => {
    const ip = req.connection.remoteAddress ? req.connection.remoteAddress.slice(7) : "unknown"
    const [response]: any = await redisClient
        .multi()
        .incr(ip)
        .expire(ip, 60)
        .exec();
    if (response[1] > 10) {
        res.json({loggedIn: false, status: "Повторите попытку позже"})
    }
    else {next()}
}
