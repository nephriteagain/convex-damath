import {  internalMutation } from "./_generated/server";
import { Lobby } from "../types";
export const clearOldRooms = internalMutation({
    handler: async (ctx) => {
        const res = await ctx.db
            .query('lobby')
            .filter(q => q.lte(q.field('_creationTime'), (Date.now() - (5*60_000))))
            .collect()
        res.forEach( async (r) => {
            await ctx.db.delete(r._id)
        })
    }
})
