"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useAppSelector  } from "@/redux/hooks"
import Room from "./Room"
import { Id } from "@/convex/_generated/dataModel"

import JoinRoomButton from "./JoinRoomButton"

export default function JoinRoom({id, userId}: {id: Id<'lobby'>, userId: string}) {

    const { joinedLobby} = useAppSelector(state => state.user)
    const { lobbyData } = useAppSelector(state => state.lobby)


    return (
        <Sheet>
            <JoinRoomButton 
                id={id}
                userId={userId}
                joinedLobby={joinedLobby}
            />        
            {lobbyData != undefined && 
            <Room 
                _id={lobbyData._id}
                userId={userId}
            />
           }
        </Sheet>
    )
}