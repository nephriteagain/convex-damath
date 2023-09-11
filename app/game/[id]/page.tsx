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
import { useRef } from "react"
import { boardStyleFlip } from "@/lib/helper/styleHelper"
import WatchMessage from "@/components/WatchMessage"


export default function Home() {
    const gData = useAppSelector(state => state.game.gameData)
    const userId = useAppSelector(state => state.user.id)
    const { id } = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})
    const dispatch = useAppDispatch()

    const boardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (gameData) {
            dispatch(getGame({id, gameData}))

            // TODO: this causes stack overflow
            // if (userId === gameData.players.x && boardRef.current) {
            //     const board = boardRef.current as HTMLDivElement;              
            //     const verticalNum = document.querySelector('.vertical-num') as HTMLDivElement
            //     const horizontalNum = document.querySelector('.horizontal-num') as HTMLDivElement            
            //     boardStyleFlip(board, horizontalNum, verticalNum)
            //   }

        }
    } , [gameData])
   
    if (gData) return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <PlayerTurnBar/>
            <Board 
                gameBoard={gData.boardData}
                players={gData.players}
                playerTurn={gData.playerTurn}
                ref={boardRef}
            />
            { gData && <WatchMessage 
                messages={gData.chat} 
                _id={gData._id}
            />}
        </div>
    )
    
    return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            Loading...
        </div>
    )
    
}