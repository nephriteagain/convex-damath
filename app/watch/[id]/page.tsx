"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import Board from "@/components/Board"
import WatchTurnBar from "@/components/WatchTurnBar"
export default function Watch() {
    const {id} = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})



    if (gameData) return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <WatchTurnBar 
                players={gameData.players}
                playerTurn={gameData.playerTurn}
            />
            <Board 
                gameBoard={gameData.boardData}
                players={gameData.players}
                playerTurn={gameData.playerTurn}
            />
        </div>
    )

    
    return (
        <div className="w-[100vw] h-[100vh] fixed bg-customBg text-3xl text-customLight flex items-center justify-center">
            Loading...
        </div>
    )
    
}