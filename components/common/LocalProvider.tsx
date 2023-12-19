"use client"
import { ReactNode, createContext, useContext, useState, useEffect } from "react"
import { getLocalId } from "@/redux/slices/userSlice"
import { checkJoinedLobby, createUser } from "@/redux/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Loader from "./Loader"
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });

const LocalContext = createContext({} as {localId:string})
export function LocalProvider({children}: {children:ReactNode}) {
    const { id : userId } = useAppSelector(s => s.user)

    const [ id, setId ] = useState<string>('')
    const dispatch = useAppDispatch()

    async function fetchUser() {
        const localId = localStorage.getItem("localId");
        if (typeof localId === "string") {
            setId(localId);
            dispatch(getLocalId(localId));
            dispatch(checkJoinedLobby(localId));
            return;
        }
        // todo make this a thunk and modify the userid with extra reducer
        dispatch(createUser())        
    }

    useEffect(() => {
        fetchUser()
    }, []);

    useEffect(() => {
        localStorage.setItem("localId", userId)
        setId(userId)
    }, [userId])

    // add a loading while waiting for player to get id from db
    return (
        <LocalContext.Provider value={{localId:id}}>
            {
                id ?
                children :
                <body
                        className={`${inter.className} bg-customLight flex flex-col w-full h-full`}
                >
                        <Loader />
                </body>
            }
        </LocalContext.Provider>
    )
}

export function useLocalContext() {
    return useContext(LocalContext)
}