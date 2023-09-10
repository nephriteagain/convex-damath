"use client"
import { useParams } from "next/navigation"
import Board from "@/components/Board"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useEffect } from "react"
import { useAppDispatch } from "@/redux/hooks"
import { getGame } from "@/redux/slices/gameSlice"


export default function Home() {
    const { id } = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (gameData) {
            dispatch(getGame(id))
        }
    } , [])

    return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <Board 
                gameBoard={gameData?.boardData}
            />
        </div>
    )
}