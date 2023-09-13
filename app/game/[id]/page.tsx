"use client"
import { useParams } from "next/navigation"
import Board from "@/components/Board"
import PlayerTurnBar from "@/components/PlayerTurnBar"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getGame } from "@/redux/slices/gameSlice"
import { GameTypes, gameData } from "@/types"
import { useRef } from "react"
import { boardStyleFlip } from "@/lib/helper/styleHelper"

import GameMessage from "@/components/GameMessage"
import Settings from "@/components/Settings"
import Rules from "@/components/Rules"
import Scores from "@/components/Score"

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { appRestart, appChangeGameMode } from "@/redux/thunks"
import { Toaster } from "@/components/ui/toaster"
import { playerLeft } from "@/redux/slices/gameSlice"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"

export default function Home() {
    const [ openRules, setOpenRules ] = useState(false)
    const gData = useAppSelector(state => state.game.gameData)
    const userId = useAppSelector(state => state.user.id)
    const { id } = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const boardRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    function showRules() {
        setOpenRules((rule) => !rule)
    }
    
    function redirectToLobby() {
        router.push('/lobby')
    }
    const deboundedRedirect = debounce(redirectToLobby, 3000)

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
            
            // if (!gameData.boardData.some(b => b?.piece?.moves && b.piece.moves.length > 0)) {

            // }

        }
    } , [gameData])

    useEffect(() => {
        if (!gData) {
            return
        }
        if (!gData.gameOngoing) {
            toast({
                description: 'a player has left the game'
            })
            dispatch(playerLeft)
            deboundedRedirect()
        }

        if (gData?.command?.type === 'REQ_RESTART') {
            if (userId === gData.command.sender) {
                toast({
                    description: 'a game restart request is sent, waiting for approval',
                    duration: 3000
                })
            }
            if (userId !== gData.command.sender && 
                (gData.players.x === userId ||
                gData.players.z === userId)) {
                toast({
                    description: 'a player is requesting a game restart, click approve to confirm',
                    duration: 5000,
                    action: <ToastAction altText="approve" 
                        onClick={() => dispatch(appRestart({gameId: gData._id, gameType: gData.gameType}))}
                    >APPROVE</ToastAction>
                })
            }
        }
        if (gData?.command?.type === 'REQ_CHANGE_GAME_MODE' && gData?.command?.data) {
            if (userId === gData.command.sender) {
                toast({
                    description: `a change game mode to (${gData.command.data}) request is sent, waiting for approval`,
                    duration: 3000
                })
            }
            if (userId !== gData.command.sender && 
                (gData.players.x === userId ||
                gData.players.z === userId)) {
                    const newGameType = gData.command?.data as GameTypes
                toast({
                    description: `a player is requesting a change game mode to (${gData.command.data}), click approve to confirm`,
                    duration: 5000,
                    action: <ToastAction altText="approve" 
                        onClick={() => dispatch(appChangeGameMode({gameId: gData._id, gameType: newGameType}))}
                    >APPROVE</ToastAction>
                })
            }
        }

    }, [gData])
   
    if (gData) return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <PlayerTurnBar/>
            <Scores score={gData.score}/>
            <Board 
                gameBoard={gData.boardData}
                players={gData.players}
                playerTurn={gData.playerTurn}
                ref={boardRef}
            />
            <GameMessage 
                messages={gData.chat} 
                _id={gData._id}
            />
            <Settings   
                showRules={showRules}
                gameId={gData._id}
            />
            { openRules && <Rules
                openRules={openRules}
                setOpenRules={setOpenRules}        
        /> }
        <Toaster />
        </div>
    )
    
    return (
        <div className="w-[100vw] h-[100vh] fixed bg-customBg text-3xl text-customLight flex items-center justify-center">
            Loading...
        </div>
    )
    
}