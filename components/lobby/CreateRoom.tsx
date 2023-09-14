"use client"
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"  
import { createRoom } from "@/redux/thunks"
import { MouseEvent, useState, forwardRef, ForwardedRef } from "react"
import Room from "./Room"
import LoadingSvg from "../common/LoadingSvg"


export default  forwardRef(function CreateRoom(_,ref: ForwardedRef<HTMLButtonElement>) {

    const [ loading, setLoading ] = useState(false)
    const {id: userId, joinedLobby} = useAppSelector(state => state.user)
    const { lobbyData } = useAppSelector(state => state.lobby)
    const dispatch = useAppDispatch()

    async function handleCreateRoom(e: MouseEvent) {
        e.preventDefault()
        try {
            setLoading(true)
            await dispatch(createRoom(userId))    
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setLoading(false)
        }
    }

    if (!joinedLobby) {
        return (
            <Sheet>
            <SheetTrigger 
                className="relative w-fit flex items-center justify-center px-3 py-1 text-white bg-green-600 mb-2 rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-100 hover:bg-green-800 disabled:opacity-40 transition-all duration-150"
                onClick={handleCreateRoom}
                disabled={Boolean(joinedLobby || lobbyData || loading)}
            >
                { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}
                <p className={loading? 'invisible' : 'visible'}>
                Create Room
                </p>
            </SheetTrigger>            
            {lobbyData != undefined && 
            <Room 
                _id={lobbyData._id}
                userId={userId}
            />
            }
            </Sheet>
        )
    }

    return (
        <Sheet>            
            <SheetTrigger className="px-3 py-1 text-white bg-green-600 mb-2 rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-100 hover:bg-green-800 disabled:opacity-40 transition-all duration-150 w-fit"
                ref={ref}
            >
                Show Room
            </SheetTrigger>            
            {lobbyData != undefined && 
            <Room 
                _id={lobbyData._id}
                userId={userId}
            />
           }
        </Sheet>
    )
})