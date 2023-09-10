import { gameData } from "../types";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getGameData = query({
    args: {id: v.id('games')},
    handler: async (ctx, args) => {
        const gameData = await ctx.db.get(args.id) as gameData
        return gameData
    }
})