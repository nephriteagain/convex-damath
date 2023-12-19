import { internalMutation } from "./_generated/server";
import { Lobby } from "../types";
export const clearOldRooms = internalMutation({
    handler: async (ctx) => {
        const res = await ctx.db
            .query("lobby")
            .filter((q) =>
                q.lte(q.field("_creationTime"), Date.now() - 20 * 60_000),
            )
            .collect();
        res.forEach(async (r) => {
            await ctx.db.delete(r._id);
        });
    },
});

export const completedGames = internalMutation({
    handler: async (ctx) => {
        const res = await ctx.db
            .query("games")
            .filter((q) =>
                q.lte(q.field("_creationTime"), Date.now() - 40 * 60_000),
            )
            .filter((q) => q.eq(q.field("gameOngoing"), true))
            .collect();
        res.forEach(async (r) => {
            await ctx.db.patch(r._id, { gameOngoing: false });
        });
    },
});
