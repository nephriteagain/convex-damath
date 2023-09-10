import { GameTypes, Lobby } from '../types';
import { query, mutation } from './_generated/server'
import { v } from "convex/values";
import {COUNTING, WHOLE, INTEGER} from '../lib/data/gameData'
const games = {
    'COUNTING': COUNTING,
    'WHOLE': WHOLE,
    'INTEGER': INTEGER,
}

export const getLobby = query(async ({db}) => {
    return await db.query('lobby').collect()
})

export const getRoom = query({
    args: {id: v.id('lobby')},
    handler: async (ctx, args) => {
        const room = await ctx.db.get(args.id) as Lobby
        return room 
    }
})

export const createLobby = mutation({
    args: {id: v.string()},
    handler: async (ctx, args) => {
        const gameType  = GameTypes.COUNTING
        const newLobby = {host: args.id, guest: '', start: '', gameType}
        const res = await ctx.db.insert('lobby', newLobby)
        return res
    }
})

export const joinLobby = mutation({
    args: {id: v.id('lobby'), userId: v.string()},
    handler: async (ctx, args) => {
        const res = await ctx.db.patch(args.id, {guest: args.userId})
        return res
    }
})

export const leaveLobby = mutation({
    args: {id: v.id('lobby'),},
    handler: async (ctx, args) => {
        const res = await ctx.db.patch(args.id, {guest: ''})
        return res
    }
})

export const deleteLobby = mutation({
    args: {id: v.id('lobby')},
    handler: async (ctx, args) => {
        const res = await ctx.db.delete(args.id)
        return res
    }
})


export const startGame = mutation({
    args: {
        id: v.id('lobby'), 
        gameType: v.union(
            v.literal('COUNTING'),
            v.literal('WHOLE'),
            v.literal('INTEGER')
        ), 
        guest: v.string(), 
        host: v.string()
    },
    handler: async (ctx, args) => {
        const gameId = await ctx.db.insert('games', {
            from: args.id,
            boardData: games[args.gameType],
            playerTurn: args.host,
            players: {
                z: args.host,
                x: args.guest
            },
            gameType: args.gameType,
            gameOngoing: true
        })
        const res = await ctx.db.patch(args.id, {start: gameId})
        return res
    }
})

