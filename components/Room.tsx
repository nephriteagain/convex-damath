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
import { debounce } from "lodash";
import { useToast } from "./ui/use-toast";
import LobbyMessage from "./LobbyMessage";
import GameType from "./GameType";

import { useEffect } from "react";

interface RoomProps {
    userId: string;
    _id: Id<'lobby'>
}

export default function Room({_id,userId}: RoomProps) {
    const router = useRouter()
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    const debouncedDispatch = debounce(dispatch, 2000)
    const room = useQuery(api.lobby.getRoom, {id: _id})
    
    useEffect(() => {
        if (room?.start) {
            toast({
                description: 'game is starting...',
                duration: 2000,
            })
            debouncedDispatch(gameStart(room.start))
        }
    }, [room])

    if (!room) {
        return (
            <SheetContent className="bg-customNeutral">
                Loading...
            </SheetContent>
        )
    }
    const { gameType, host, guest,  _id: roomId, messages, } = room
    



    return (
        <SheetContent className="bg-customNeutral text-white">
            <SheetHeader className="mb-8">
            <SheetTitle className="text-2xl">Lobby</SheetTitle>            
            </SheetHeader>
            <div>

            <div className="w-fit">
            <div className="mb-4 border-4 border-customSec  px-4 py-1 shadow-md drop-shadow-md">
                <div>
                    TYPE
                </div>
                <GameType 
                    host={host}
                    gameType={gameType}
                    lobbyId={_id}
                />
            </div>
            <div className="mb-4 border-4 border-customSec  px-4 py-1 shadow-md drop-shadow-md">
                <div className="opacity-70">host</div>
                <div>{host}</div>
            </div>
            <div className="mb-4 border-4 border-customSec  px-4 py-1 shadow-md drop-shadow-md">
                <div className="opacity-70">guest</div>
                <div>{guest || 'EMPTY'}</div>
            </div>
            </div>
            <div>
                {
                host === userId ? 
                <div className="flex flex-row justify-between">
                    <button onClick={() => dispatch(deleteRoom(_id))}
                        className="px-2 py-1 disabled:opacity-40 text-white bg-red-600 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-800 active:scale-100 transition-all duration-150"
                    >
                        Leave Game
                    </button>
                    <button onClick={() => dispatch(startGame({id:_id, gameType, host, guest}))}
                        className="px-2 py-1 disabled:opacity-40 text-white bg-green-600 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-green-800 active:scale-100 transition-all duration-150"
                    >
                        Start Game
                    </button>
                </div> :
                <div>
                    <button onClick={() => dispatch(leaveRoom(_id))}
                        className="px-2 py-1 disabled:opacity-40 text-white bg-red-600 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-800 active:scale-100 transition-all duration-150"
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