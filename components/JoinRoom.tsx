"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useAppSelector, useAppDispatch  } from "@/redux/hooks"
import Room from "./Room"
import { Id } from "@/convex/_generated/dataModel"
import { useState, MouseEvent, useRef } from "react"
import LoadingSvg from "./LoadingSvg"
import { joinRoom } from "@/redux/thunks"
export default function JoinRoom({id, userId, showSheet}: {id: Id<'lobby'>, userId: string, showSheet: () => void}) {
    const dispatch = useAppDispatch()
    const sheetRef = useRef<HTMLDivElement>(null)
    const { joinedLobby} = useAppSelector(state => state.user)
    const { lobbyData } = useAppSelector(state => state.lobby)
    const [loading, setLoading] = useState(false)

      async function handleJoinRoom(e: MouseEvent) {
        e.preventDefault()
        console.log('clicked')
        try {
            setLoading(true)
            await dispatch(joinRoom({id, userId}))
            showSheet()
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setLoading(false)
            
        }
    }

    return (
        <Sheet>
            <SheetTrigger         
            className="relative flex items-center justify-center basis-1/4 disabled:opacity-40 bg-green-600 rounded-md shadow-md drop-shadow-md hover:bg-green-800 transition-all duration-150"
            onClick={handleJoinRoom}
            disabled={Boolean(joinedLobby)}
    >
            { loading && <LoadingSvg
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                width={24}
                height={24}
            />}
            <p className={loading ? 'invisible' : 'visible'}>
                JOIN
            </p>
        </SheetTrigger>            
            {lobbyData != undefined && 
            <Room
                _id={lobbyData._id}
                userId={userId}
                ref={sheetRef}
            />
           }
        </Sheet>
    )
}