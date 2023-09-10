import { Id } from '../convex/_generated/dataModel';
import { createAsyncThunk } from "@reduxjs/toolkit"
import { convex } from "@/app/lobby/page"
import { api } from "@/convex/_generated/api"
import { GameTypes } from '@/types';
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