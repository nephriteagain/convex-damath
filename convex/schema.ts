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
        )
    }),
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
        ),
        boardData: v.array(v.any()),
        gameOngoing: v.boolean(),
        score: v.optional(v.object({
            z: v.number(),
            x: v.number()
        })),
        message: v.optional(v.any())
    })
})