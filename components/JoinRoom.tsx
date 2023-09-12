"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import Room from "./Room"
import { joinRoom } from "@/redux/thunks"
import { Id } from "@/convex/_generated/dataModel"


export default function JoinRoom({id, userId}: {id: Id<'lobby'>, userId: string}) {

    const { joinedLobby} = useAppSelector(state => state.user)
    const { lobbyData } = useAppSelector(state => state.lobby)
    const dispatch = useAppDispatch()

    return (
        <Sheet>
            <SheetTrigger 
                className="basis-1/4 disabled:opacity-40 bg-green-600 rounded-md shadow-md drop-shadow-md hover:bg-green-800 transition-all duration-150"
                onClick={() => dispatch(joinRoom({id, userId}))}
                disabled={Boolean(joinedLobby)}
            >
                JOIN
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