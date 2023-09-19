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
import { gameStart, clearLobbyData, } from "@/redux/slices/lobbySlice";
import { clearJoinedLobbyId } from "@/redux/slices/userSlice";
import { debounce } from "lodash";
import { useToast } from "../ui/use-toast";
import LobbyMessage from "./LobbyMessage";
import GameType from "../game/GameType";
import LoadingSvg from "../common/LoadingSvg";

import { MouseEvent, useEffect, useState, forwardRef, ForwardedRef } from "react";
import { GameTypes } from "@/types";

interface RoomProps {
    userId: string;
    _id: Id<'lobby'>
}

export default forwardRef(function Room({_id,userId}: RoomProps, ref: ForwardedRef<HTMLDivElement>) {
    const router = useRouter()
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    const debouncedDispatch = debounce(dispatch, 2000)
    const room = useQuery(api.lobby.getRoom, {id: _id})
    const [leaveLoading, setLeaveLoading] = useState(false)
    const [startLoading, setStartLoading] = useState(false)

    async function handleDeleteRoom(e: MouseEvent) {
        e.preventDefault()
        try {
            setLeaveLoading(true)
            await dispatch(deleteRoom(_id))
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setLeaveLoading(false)
        }
    }

    async function handleLeaveRoom(e: MouseEvent) {
        e.preventDefault()
        try {
            setLeaveLoading(true)
            await dispatch(leaveRoom(_id))
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setLeaveLoading(false)
        }
    }

    async function handleStartRoom(e: MouseEvent) {
        e.preventDefault()
        if (guest === '' || host === '') {
            return
        }
        try {
            setStartLoading(true)
            const type = gameType as  GameTypes
            await dispatch(startGame({id:_id, gameType: type, host, guest}))
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setStartLoading(false)
        }
    }

    useEffect(() => {
        if (room && room?.host === '') {
            dispatch(clearJoinedLobbyId())
            dispatch(clearLobbyData())
        }
    }, [room])

    useEffect(() => {
        if (room?.start) {
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
        <SheetContent className="bg-customNeutral text-white overflow-y-auto" ref={ref}>
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
                    <button 
                        onClick={handleDeleteRoom}
                        className="relative flex items-center justify-center px-2 py-1 disabled:opacity-40 text-white bg-red-600 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-800 active:scale-100 transition-all duration-150"
                        disabled={Boolean(leaveLoading)}
                    >   
                        { leaveLoading && <LoadingSvg 
                            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                            width={24}
                            height={24}
                        /> }
                        <p className={leaveLoading? 'invisible' : 'visible'}>
                            Leave Game                        
                        </p>
                    </button>
                    <button 
                        onClick={handleStartRoom}
                        className="relative flex items-center justify-center px-2 py-1 disabled:opacity-40 text-white bg-green-600 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-green-800 active:scale-100 transition-all duration-150"
                        disabled={Boolean(startLoading || (guest ==='' || host === ''))}
                    >
                         { startLoading && <LoadingSvg 
                            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                            width={24}
                            height={24}
                        /> }
                        <p className={startLoading? 'invisible' : 'visible'}>
                            Start Game
                        </p>
                    </button>
                </div> :
                <div>
                     <button 
                        onClick={handleLeaveRoom}
                        className="relative flex items-center justify-center px-2 py-1 disabled:opacity-40 text-white bg-red-600 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-800 active:scale-100 transition-all duration-150"
                        disabled={Boolean(leaveLoading)}
                    >   
                        { leaveLoading && <LoadingSvg 
                            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                            width={24}
                            height={24}
                        /> }
                        <p className={leaveLoading? 'invisible' : 'visible'}>
                            Leave Game                        
                        </p>
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
})