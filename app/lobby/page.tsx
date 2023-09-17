"use client"

import LobbyComponent from "@/components/lobby/Lobby"
import CreateRoom from "@/components/lobby/CreateRoom"
import Filter from "@/components/common/Filter"
import BacktoHome from "@/components/common/BackToHome"

import { useEffect, useRef, useLayoutEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearJoinedLobbyId, getLocalId } from "@/redux/slices/userSlice"
import { clearLobbyData } from "@/redux/slices/lobbySlice"
import { useRouter } from 'next/navigation'
import { clearRoom, checkJoinedLobby } from "@/redux/thunks"
import { Toaster } from "@/components/ui/toaster"
import { api } from "@/convex/_generated/api"
import { convex } from "@/lib/convex"
import { Id } from "@/convex/_generated/dataModel"
import Progress from "@/components/common/Progress"

export const dynamic = "force-dynamic";

export default  function Home() {
    const [ start, setStart ] = useState(false)

    const router = useRouter()
    const sheetRef = useRef<HTMLButtonElement>(null)
    const dispatch = useAppDispatch()
    const {id, joinedLobby} = useAppSelector(state => state.user)
    const {lobbies, lobbyData} = useAppSelector(state => state.lobby)


    useLayoutEffect(() => {
    const localId = localStorage.getItem('localId')
    if (typeof localId === 'string') {
        dispatch(getLocalId(localId))
        dispatch(checkJoinedLobby(localId))
        return
    }
    localStorage.setItem('localId', id)

    }, [])


    async function getGameData(gameId: Id<'games'>) {
        if (lobbyData?.start) {
            const data = await convex.query(api.game.getGameData, {id:gameId})
            dispatch(clearJoinedLobbyId())
            dispatch(clearLobbyData())
            if (data?.gameOngoing) {
                router.push(`/game/${lobbyData.start}`)
            }
            
        }
    }
    
    useEffect(() => {
        //TODO: make auto recon when game is disconnected,
        // fix this dont delete the db
        if (lobbyData?.start) {
            const gameId = lobbyData.start as Id<'games'>
            getGameData(gameId)
        }

    }, [lobbyData])


    function showSheet() {
        if (!sheetRef.current) {
            return
        }
        sheetRef.current.click()
    }

    return (
        <div className="w-full h-full flex flex-col">            
            <div className=" flex flex-col mt-12 py-8 px-1 sm:p-8 h-[85%] sm:h-auto bg-customNeutral shadow-lg drop-shadow-lg mb-4 w-full sm:w-[640px] mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <CreateRoom ref={sheetRef} showSheet={showSheet}/>
                    <Filter />
                </div>
                <LobbyComponent id={id} showSheet={showSheet} />
            </div>
            <BacktoHome onClick={() => setStart(true)} />
            <Toaster />
            <Progress start={start} />
        </div>
    )
}