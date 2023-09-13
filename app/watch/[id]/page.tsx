"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"

import Board from "@/components/Board"
import WatchTurnBar from "@/components/WatchTurnBar"
import Scores from "@/components/Score"
export default function Watch() {
    const {id} = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})
    const router = useRouter()
    const { toast } = useToast()
    function redirectToWatchLobby() {
        router.replace('/watch')
    }
    const debouncedRedirect = debounce(redirectToWatchLobby, 2000)

    useEffect(() => {
        if (gameData && !gameData?.gameOngoing) {
            toast({
                description: 'a player has left the game',
                duration: 2000
            })
            debouncedRedirect()
        }
    }, [gameData])

    if (gameData) return (
        <>
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <WatchTurnBar 
                players={gameData.players}
                playerTurn={gameData.playerTurn}
            />
            <Scores score={gameData.score}/>
            <Board 
                gameBoard={gameData.boardData}
                players={gameData.players}
                playerTurn={gameData.playerTurn}
            />
        </div>
        <Toaster />
        </>
    )

    
    return (
        <div className="w-[100vw] h-[100vh] fixed bg-customBg text-3xl text-customLight flex items-center justify-center">
            Loading...
        </div>
    )
    
}