// ? socket.io interfaces

import {Session} from "socket.io-adapter";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

// ? Auth interfaces
//TODO delete
interface CustomSession extends Session {
    user?: {
        username: string;
        id: number;
    };
    username?: string;
    id?: number;
}

export type {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    CustomSession,
}
