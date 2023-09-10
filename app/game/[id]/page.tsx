"use client"
import { useParams } from "next/navigation"
import Board from "@/components/Board"
import PlayerTurnBar from "@/components/PlayerTurnBar"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getGame } from "@/redux/slices/gameSlice"
import { gameData } from "@/types"

export default function Home() {
    const gData = useAppSelector(state => state.game.gameData)
    const { id } = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (gameData) {
            dispatch(getGame({id, gameData}))
        }
    } , [gameData])
   
    if (gData) return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <PlayerTurnBar/>
            <Board 
                gameBoard={gData.boardData}
                players={gData.players}
                playerTurn={gData.playerTurn}
            />
        </div>
    )
    
    return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            Loading...
        </div>
    )
    
}