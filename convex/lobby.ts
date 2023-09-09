import { Lobby } from '../types';
import { query, mutation } from './_generated/server'
import { v } from "convex/values";
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
        const newLobby = {host: args.id, guest: '', start: false, gameType: 'COUNTING'}
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
    args: {id: v.id('lobby')},
    handler: async (ctx, args) => {
        const res = await ctx.db.patch(args.id, {startGame: true})
        return res
    }
})