"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import Board from "@/components/Board"

export default function Watch() {
    const {id} = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})



    if (gameData) return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <Board 
                gameBoard={gameData.boardData}
                players={gameData.players}
                playerTurn={gameData.playerTurn}
            />
        </div>
    )

    
    return (
        <div>Loading...</div>
    )
    
}