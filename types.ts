import { Id } from "./convex/_generated/dataModel";

export interface User {
    id: string;
    isLoggedIn: boolean;
    joinedLobby: string;
}

export interface Lobby {
    _id: Id<"lobby">;
    host: string;
    guest: string;
    start: boolean;
    gameType: string;
}
