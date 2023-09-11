"use client"
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { Id } from "@/convex/_generated/dataModel"
import { useAppDispatch } from "@/redux/hooks";
import { leaveRoom, deleteRoom, startGame } from "@/redux/thunks";
import { useQuery } from 'convex/react'
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { gameStart } from "@/redux/slices/lobbySlice";
import LobbyMessage from "./LobbyMessage";

interface RoomProps {
    userId: string;
    _id: Id<'lobby'>
}

export default function Room({_id,userId}: RoomProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const room = useQuery(api.lobby.getRoom, {id: _id})
    if (!room) {
        return (
            <SheetContent>
                Loading...
            </SheetContent>
        )
    }
    const { gameType, host, guest,  _id: roomId, messages } = room
    
    if (room?.start) {
        dispatch(gameStart(room.start))
    }

    return (
        <SheetContent>
            <SheetHeader className="mb-8">
            <SheetTitle className="text-2xl">Lobby</SheetTitle>            
            </SheetHeader>
            <div>

            <div className="mb-4">
                <div>
                    TYPE
                </div>
                <div>
                    {gameType}
                </div>
            </div>
            <div className="mb-4">
                <div>HOST</div>
                <div>{host}</div>
            </div>
            <div className="mb-4">
                <div>GUEST</div>
                <div>{guest || 'EMPTY'}</div>
            </div>
            <div>
                {
                host === userId ? 
                <div className="flex flex-row justify-between">
                    <button onClick={() => dispatch(deleteRoom(_id))}
                        className="border-2 border-black px-2 py-1 disabled:opacity-40"
                    >
                        Leave Game
                    </button>
                    <button onClick={() => dispatch(startGame({id:_id, gameType, host, guest}))}
                        className="border-2 border-black px-2 py-1 disabled:opacity-40"
                    >
                        Start Game
                    </button>
                </div> :
                <div>
                    <button onClick={() => dispatch(leaveRoom(_id))}
                        className="border-2 border-black px-2 py-1 disabled:opacity-40"
                    >
                        Leave Game
                    </button>
                </div>
                }
            </div>
            <div>
                <LobbyMessage messages={messages} _id={_id}/>
            </div>
            </div>
        </SheetContent>
    )
}