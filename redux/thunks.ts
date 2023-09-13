import { Id } from '../convex/_generated/dataModel';
import { createAsyncThunk } from "@reduxjs/toolkit"
import { convex } from "@/app/lobby/page"
import { api } from "@/convex/_generated/api"
import { GameTypes, piece, boxPiece, operation, players, lobbyMessage, score } from '@/types';


export const createRoom = createAsyncThunk(
    'lobby/createRoom',
    async (id:string) => {
        const joinedLobby = await convex.mutation(api.lobby.createLobby, {id})
        const roomData = await convex.query(api.lobby.getRoom, {id: joinedLobby})
        return roomData
    }
)

export const joinRoom = createAsyncThunk(
    '/lobby/joinRoom',
    async ({id, userId}: {id: Id<"lobby">, userId: string}) => {
        await convex.mutation(api.lobby.joinLobby, {id, userId})
        const roomData = await convex.query(api.lobby.getRoom, {id})
        return roomData
    }
)

export const leaveRoom = createAsyncThunk(
    'lobby/leaveRoom',
    async (id:Id<'lobby'>) => {
        await convex.mutation(api.lobby.leaveLobby, {id})
    }
)

export const deleteRoom = createAsyncThunk(
    'lobby/deleteRoom',
    async (id: Id<'lobby'>) => {
        await convex.mutation(api.lobby.deleteLobby, {id})        
    }
)


export const startGame = createAsyncThunk(
    'lobby/startGame',
    async ({id, gameType, guest, host}: {
        id: Id<'lobby'>; 
        gameType: GameTypes; 
        guest: string; 
        host: string
    }) => {
        await convex.mutation(api.lobby.startGame, {id, gameType, guest, host})
    }
)
type moveArgs = {
    piece: piece;
    index:number;
    pieceIndex:number;
    playerTurn:string;
    players: players;
    id: Id<'games'>;
    boardData: boxPiece[];
    score: score;

}
export const movePiece = createAsyncThunk(
    'game/move',
    async (args: moveArgs) => {
        const {piece, index, pieceIndex, playerTurn, players, id, boardData, score} = args
        await convex.mutation(
            api.game.movePiece, {
                piece,
                index,
                pieceIndex, 
                playerTurn, 
                players, 
                id, 
                //@ts-ignore
                boardData,
                score
            }
            )
        return 
    }
)

type sendLobbyMsgArgs = {
    id: Id<'lobby'>;
    sId: string;
    text: string;
    messages: lobbyMessage[]
}
export const sendLobbyMsg = createAsyncThunk(
    'lobby/sendMessage',
    async (args: sendLobbyMsgArgs) => {
        const {id, sId, text, messages} = args
        await convex.mutation(api.lobby.sendMessage, {id,sId, text,messages})
        return
    }
)

type sendGameMsgArgs = {
    id: Id<'games'>;
    sId: string;
    text: string;
    chat: lobbyMessage[]
}
export const sendGameMsg = createAsyncThunk(
    'game/sendMessage',
    async (args: sendGameMsgArgs) => {
        const {id, sId, text, chat} = args
        await convex.mutation(api.game.sendGameMessage, {id, sId, text, chat})
    }
)

type changeTypeArgs = {
    _id: Id<'lobby'>;
    gameType: 'COUNTING'|'WHOLE'|'INTEGER';
} 

export const changeType = createAsyncThunk(
    'game/changeGameType',
    async (args: changeTypeArgs) => {
        const { _id, gameType } = args
        await convex.mutation(api.lobby.changeGameType, {_id, gameType})
    }
)

type reqRestartArgs = {
   userId: string;
   gameId: Id<'games'>;
}

export const reqRestart = createAsyncThunk(
    'game/reqRestart',
    async (args: reqRestartArgs) => {
        const { userId, gameId } = args
        await convex.mutation(api.game.requestRestart, {userId, gameId})
    }
)
type appRestartArgs = {
    gameId: Id<'games'>;
    gameType: 'COUNTING'|'WHOLE'|'INTEGER';
 }

export const appRestart = createAsyncThunk(
    'game/appRestart',
    async (args: appRestartArgs) => {
        const { gameId, gameType } = args
        await convex.mutation(api.game.approveRestart, {gameId, gameType})
    }
)

type reqChangeGameModeArgs = {
    userId: string;
    gameId: Id<'games'>;
    gameType: 'COUNTING'|'WHOLE'|'INTEGER';
 }
 
export const reqChangeGameMode = createAsyncThunk(
    'game/reqChangeGameMode',
    async (args: reqChangeGameModeArgs) => {
        const { userId, gameId, gameType } = args
        await convex.mutation(api.game.requestChangeGameMode, {userId, gameId, gameType})
    }
)

type appChangeGameModeArgs = {
    gameId: Id<'games'>;
    gameType: 'COUNTING'|'WHOLE'|'INTEGER';
 }
 
export const appChangeGameMode = createAsyncThunk(
    'game/appChangeGameMode',
    async (args: appChangeGameModeArgs) => {
        const { gameId, gameType } = args
        await convex.mutation(api.game.approveChangeGameMode, {gameId, gameType})
    }
)

export const leaveGame = createAsyncThunk(
    'game/leaveGame',
    async (gameId: Id<'games'>) => {
        await convex.mutation(api.game.leaveGame, {gameId})
    }
)