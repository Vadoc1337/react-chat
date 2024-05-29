import {redisClient} from "../redis";

export const authorizeUser = (socket: any, next: any) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Неавторизованный пользователь")
        next(new Error("Неавторизованный пользователь"));
    } else {
        socket.user = {...socket.request.session.user}
        redisClient.hset(`userid:${socket.user.username}`, "userid", socket.user.userid)
        next();
    }
};

export const initializeUser = async (socket: any) => {
    socket.user = {...socket.request.session.user} //TODO возможно удалить
    socket.join(socket.user.username)
    await redisClient.hset(
        `userid:${socket.user.username}`,
        "userid",
        socket.user.userid,
        "connected",
        "true"
    );
    const colleagueList = await redisClient.lrange(`colleagues:${socket.user.username}`, 0, -1)
    const parsedColleagueList = await parseColleagueList(colleagueList)
    const colleagueRooms = parsedColleagueList.map((colleague: { userid: string }) => colleague.userid)

    if (colleagueRooms.length > 0) {
        socket.to(colleagueRooms).emit("connected", "true", socket.user.username)
    }
    socket.emit("colleagues", parsedColleagueList)

    const messageQuery = await redisClient.lrange(
        `chat:${socket.user.userid}`,
        0,
        -1
    );
    const messages = messageQuery.map(messageString => {
        const parsedString = messageString.split(".");
        return {to: parsedString[0], from: parsedString[1], content: parsedString[2]};
    });
    if (messages && messages.length > 0) {
        socket.emit("messages", messages);
    }
};

export const addColleague = async (socket: any, colleagueName: any, callback: any) => {
    if (colleagueName === socket.user.username) {
        callback({done: "false", errorMsg: "Вы не можете добавить себя"})
        return;
    }
    const colleague: any = await redisClient.hgetall(`userid:${colleagueName}`)
    const currentColleagueList = await redisClient.lrange(`colleagues:${socket.user.username}`, 0, -1);
    if (!colleague.userid) {
        callback({done: "false", errorMsg: "Пользователь не найден"})
        return
    }
    if (currentColleagueList && currentColleagueList.indexOf(`${colleagueName}.${colleague.userid}`) !== -1) {
        callback({done: "false", errorMsg: "Коллега уже добавлен Вами"})
        return
    }
    await redisClient.lpush(`colleagues:${socket.user.username}`, [colleagueName, colleague.userid].join("."));
    const newColleague = {
        username: colleagueName,
        userid: colleague.userid,
        connected: colleague.connected
    }
    callback({done: "true", newColleague})
}

export const onDisconnect = async (socket: any) => {
    await redisClient.hset(
        `userid:${socket.user.username}`,
        "userid",
        socket.user.userid,
        "connected",
        "true"
    );
    const colleagueList = await redisClient.lrange(`colleagues:${socket.user.username}`, 0, -1);
    const colleagueRooms = await parseColleagueList(colleagueList)
        .then(colleagues => colleagues.map((colleague: { userid: string }) =>
            colleague.userid));
    socket.to(colleagueRooms).emit("connected", "false", socket.user.username);
    console.log(colleagueRooms, "сделал действие") // TODO логика работы отображения коллег онлайн, фиксить...
};

export const parseColleagueList = async (colleagueList: string[]): Promise<any> => {
    const newColleagueList: any = [];
    for (let colleague of colleagueList) {
        const parsedColleague = colleague.split(".");
        const colleagueConnected = await redisClient.hget(
            `userid:${parsedColleague[0]}`,
            "connected"
        );
        newColleagueList.push({
            username: parsedColleague[0],
            userid: parsedColleague[1],
            connected: colleagueConnected,
        });
    }
    return newColleagueList;
};