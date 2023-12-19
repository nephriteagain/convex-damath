import { query, mutation } from "./_generated/server";
import { v } from "convex/values";



export const getUser =  query({
    args: {
        id: v.id('user')
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.id)        
        return user
    }

})

export const createUser = mutation({
    handler: async (ctx) => {
        const  newUser = await ctx.db.insert("user", {isVerified: false})
        return newUser
    }
})