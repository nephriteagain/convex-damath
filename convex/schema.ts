import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    lobby: defineTable({
        host: v.string(),
        guest: v.string(),
        start: v.string(),
        gameType: v.union(
            v.literal('COUNTING'),
            v.literal('INTEGER'),
            v.literal('WHOLE'),
            v.literal('FRACTION'),
            v.literal('RATIONAL'),
            v.literal('RADICAL')
        ),
        messages: v.array(v.object({
            sId: v.string(),
            mId: v.string(),
            text: v.string()
        }))
    })
        .index("by_host", ["host"])
        .index("by_guest", ["guest"]),


    games: defineTable({
        from: v.id('lobby'),
        players: v.object({
            z: v.string(),
            x: v.string(),
        }),
        playerTurn: v.string(),
        gameType: v.union(
            v.literal('COUNTING'),
            v.literal('INTEGER'),
            v.literal('WHOLE'),
            v.literal('FRACTION'),
            v.literal('RATIONAL'),
            v.literal('RADICAL')
        ),
        boardData: v.array(v.any()),
        gameOngoing: v.boolean(),
        score: v.object({
            z: v.number(),
            x: v.number()
        }),
        command: v.optional(v.object({
            sender: v.string(),
            type: v.string(),
            data: v.optional(v.string())
        })),
        chat: v.array(v.object({
            sId: v.string(),
            mId: v.string(),
            text: v.string()
        }))
    })
})