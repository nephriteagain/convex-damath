
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useState, MouseEvent } from "react"
import { useAppDispatch } from "@/redux/hooks"
import { joinRoom } from "@/redux/thunks"
import { Id } from "@/convex/_generated/dataModel"

import LoadingSvg from "./LoadingSvg"

interface JoinRoomButtonProps {
    id: Id<'lobby'>;
    userId: string;
    joinedLobby: string;
}

export default function JoinRoomButton({id, userId, joinedLobby}: JoinRoomButtonProps) {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    async function handleJoinRoom(e: MouseEvent) {
        e.preventDefault()
        try {
            setLoading(true)
            await dispatch(joinRoom({id, userId}))
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
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
    )

}