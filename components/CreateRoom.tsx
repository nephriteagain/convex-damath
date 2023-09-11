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
                className="border-2 border-black px-3 py-1 disabled:opacity-40"
                onClick={() => dispatch(createRoom(userId))}
                disabled={Boolean(joinedLobby)}
            >
                Create Room
            </SheetTrigger> :
            
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
            <SheetTrigger>
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