import {redisClient} from "../redis";

export const direct_message = async (socket: any, message: any) => {
    message.from = socket.user.userid;

    // to.from.content
    const messageString = [message.to, message.from, message.text].join(".");

    await redisClient.lpush(`chat:${message.to}`, messageString);
    await redisClient.lpush(`chat:${message.from}`, messageString);
    socket.to(message.to).emit("direct_message", message);
    console.log(message)
}