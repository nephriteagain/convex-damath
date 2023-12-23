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

export const verifyUser = mutation({
    args: {
        id: v.id('user'),
        email: v.string()
    },
    handler: async (ctx, args) => {
        const { id, email } = args
        await ctx.db.patch(id, {
            email
        })
    }
})

export const getUserByEmail = query({
    args: {
        email: v.string()
    },
    // throws an error if multiple users with same email is found
    handler: async (ctx, {email}) => {
        const user = await ctx.db.query("user")
            .filter(q => q.eq(q.field('email'), email))
            .unique()
        return user
    }
})