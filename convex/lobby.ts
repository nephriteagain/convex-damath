import { GameTypes, Lobby } from '../types';
import { query, mutation } from './_generated/server'
import { v } from "convex/values";
import {COUNTING, WHOLE, INTEGER} from '../lib/data/gameData'

function generateId() {
    return Math.random().toString(16).slice(2)
}

const games = {
    'COUNTING': COUNTING,
    'WHOLE': WHOLE,
    'INTEGER': INTEGER,
}


export const checkJoinedLobby = query({
    args: {
        localId: v.string()
    },
    handler: async (ctx, args) => {
        const existingLobby = await ctx.db
            .query('lobby')
            .filter((q) => q.or(
                    q.eq(q.field('host'), args.localId), 
                    q.eq(q.field('guest'), args.localId)
            ))
            .first()
        if (existingLobby) {
            return existingLobby
        }
        return null
    }
})


export const getLobby = query({
    args: {
        filter: v.optional(v.union(
            v.string(),
            v.null()
        )),
        order: v.optional(v.union(
            v.literal('asc'),
            v.literal('desc'),
        ))
    },
    handler: async (ctx, args) => {
        const {filter, order = 'desc'} = args
        if (
            filter === 'COUNTING' ||
            filter === 'WHOLE' ||
            filter === 'INTEGER'
        ) {
            return await ctx.db
                .query('lobby')
                .filter(q => q.eq(q.field('gameType'), filter))
                .filter(q => q.eq(q.field('start'), ''))
                .order(order)
                .collect()
        }
        return await ctx.db
            .query('lobby')
            .filter(q => q.eq(q.field('start'), ''))
            .order(order)
            .collect()
    }
})

export const getRoom = query({
    args: {id: v.id('lobby')},
    handler: async (ctx, args) => {
        const room = await ctx.db.get(args.id) 
        return room 
    }
})

export const createLobby = mutation({
    args: {id: v.string()},
    handler: async (ctx, args) => {
        const gameType  = GameTypes.COUNTING
        const newLobby = {host: args.id, guest: '', start: '', gameType, messages: []}
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
        const res = await ctx.db.patch(args.id, {host: ''})
        return args.id
    }
})

export const clearRoom = mutation({
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
            gameOngoing: true,
            chat: [],
            score: {
                x: 0,
                z: 0
            }
        })
        const res = await ctx.db.patch(args.id, {start: gameId})
        return res
    }
})

export const sendMessage = mutation({
    args: {
        id: v.id('lobby'), 
        sId: v.string(), 
        text: v.string(),
        messages: v.array(v.object({
            sId: v.string(),
            mId: v.string(),
            text: v.string()
        }))
    },
    handler: async (ctx, args) => {
        const {id, sId, text, messages} = args
        const newMessage = {
            sId, 
            mId: generateId(),
            text,
        }
        const newMessages = [...messages, newMessage]
        // how to add the new Message to the messages[]?
        const res = await ctx.db.patch(id, {messages: newMessages})
        return res
    }
})

export const changeGameType = mutation({
    args: {
        _id: v.id('lobby'),
        gameType: v.union(
            v.literal('COUNTING'),
            v.literal('WHOLE'),
            v.literal('INTEGER')
        ), 
    },
    handler: async (ctx, args) => {
        const { _id, gameType } = args
        const res = await ctx.db.patch(_id, {gameType})
        return res
    }
})

