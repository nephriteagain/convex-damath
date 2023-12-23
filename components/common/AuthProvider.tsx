"use client"

import { useContext, createContext, ReactNode, useEffect } from "react"
import { auth } from "@/auth";



const AuthContext = createContext({});

export function AuthProvider({children}: {children:ReactNode}) {

    useEffect(() => {
        if (!auth.currentUser) {
            // do something
            return
        }
        const email = auth.currentUser.email;
        // check if email is already in convex,
        // if not create update new user,

    }, [auth])

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthProvider() {
    return useContext(AuthContext)
}