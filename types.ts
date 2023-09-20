import { Id } from "./convex/_generated/dataModel";

export interface User {
    id: string;
    isLoggedIn: boolean;
    joinedLobby: string;
    disableCreateLobby: boolean;
}

export interface Lobby {
    _id: Id<"lobby">;
    host: string;
    guest: string;
    start: string;
    gameType: GameTypes;
    messages: lobbyMessage[];
}

export interface lobbyMessage {
    sId: string;
    text:string;
    mId: string;
}



export interface boxPiece {
    x: number;
    y: number;
    playable: boolean;
    operation?: operation;
    piece?: piece;
    hightlighted?: boolean;
}

export interface piece {
    type: 'x'|'z';
    value: number;
    king: boolean;
    moves: number[];
}

export enum operation {
    ADD = 'add',
    SUBTRACT = 'subtract',
    MULTIPLY = 'multiply',
    DIVIDE = 'divide'
}

export interface players {
    z: string;
    x: string;
}

export interface gameData {
    from: Id<'lobby'>
    _id: Id<'games'>;
    players: players;
    playerTurn: string;
    gameType: GameTypes;
    boardData: boxPiece[];
    gameOngoing: boolean;
    score: score;
    command?: message;
    chat: lobbyMessage[];
}

export enum GameTypes  {
    COUNTING = 'COUNTING',
    WHOLE = 'WHOLE',
    INTEGER = 'INTEGER',
}
export interface score {
    z: number;
    x: number;
}

export interface message {
    sender: string;
    type: string;
    data?: GameTypes
}



export interface movablePieces {
    piece: piece;
    index: number;
    jumpIndex: number;
    direction: 'top right'|'top left'|'bot right'|'bot left'
}