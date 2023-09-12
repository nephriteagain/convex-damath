"use client"
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"  
import { createRoom } from "@/redux/thunks"
import Room from "./Room"
export default function CreateRoom() {

    const {id: userId, joinedLobby} = useAppSelector(state => state.user)
    const { lobbyData } = useAppSelector(state => state.lobby)
    const dispatch = useAppDispatch()

    if (!joinedLobby) {
        return (
            <Sheet>
            <SheetTrigger 
                className="px-3 py-1 text-white bg-green-600 mb-2 rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-100 hover:bg-green-800 disabled:opacity-40 transition-all duration-150"
                onClick={() => dispatch(createRoom(userId))}
                disabled={Boolean(joinedLobby)}
            >
                Create Room
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
            <SheetTrigger className="px-3 py-1 text-white bg-green-600 mb-2 rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-100 hover:bg-green-800 disabled:opacity-40 transition-all duration-150">
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
}