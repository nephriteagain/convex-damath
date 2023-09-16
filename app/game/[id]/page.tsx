"use client"
import { useParams } from "next/navigation"
import Board from "@/components/game/Board"
import PlayerTurnBar from "@/components/game/PlayerTurnBar"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useEffect, useState, useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getGame } from "@/redux/slices/gameSlice"
import { GameTypes, gameData, players } from "@/types"
import { useRef } from "react"
import { boardStyleFlip } from "@/lib/helper/styleHelper"

import GameMessage from "@/components/game/GameMessage"
import Settings from "@/components/game/Settings"
import Rules from "@/components/game/Rules"
import Scores from "@/components/game/Score"
import WinnerModal from "@/components/game/WinnerModal"

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { appRestart, appChangeGameMode, clearCommands } from "@/redux/thunks"
import { Toaster } from "@/components/ui/toaster"
import { playerLeft } from "@/redux/slices/gameSlice"
import { useRouter } from "next/navigation"
import { debounce, delay } from "lodash"
import { getTotalRemainingScore } from "@/gameLogic/scoreHandler"
import { getLocalId } from "@/redux/slices/userSlice"

export default function Home() {
    const [ openRules, setOpenRules ] = useState(false)
    const [ showWinnerModal, setShowWinnerModal ] = useState(false)
    const [ totalScores, setTotalScores ] = useState({z:0, x:0})

    const gData = useAppSelector(state => state.game.gameData)
    const userId = useAppSelector(state => state.user.id)
    const { id } = useParams()
    const gameId = id as Id<'games'>
    const gameData = useQuery(api.game.getGameData, {id: gameId})
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const boardRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    if (gData && (gData.players.x !== userId && gData.players.z !== userId)) {
        router.push(`/watch/${gData._id}`)
    }

    function showRules() {
        setOpenRules((rule) => !rule)
    }

    function redirectToLobby() {
        router.push('/lobby')
    }

    const delayedRedirect = debounce(redirectToLobby, 3000)
    

    useLayoutEffect(() => {
        const localId = localStorage.getItem('localId')
        if (typeof localId === 'string') {
            dispatch(getLocalId(localId))
            return
        }
        localStorage.setItem('localId', userId)
    
        }, [])


    useEffect(() => {
        if (boardRef?.current && userId === gData?.players.x) {
            const board = boardRef.current as HTMLDivElement;              
            const verticalNum = document.querySelector('.vertical-num') as HTMLDivElement
            const horizontalNum = document.querySelector('.horizontal-num') as HTMLDivElement            
            boardStyleFlip(board, horizontalNum, verticalNum)              
        }
    }, [gData])

    useEffect(() => {
        if (gameData) {
            dispatch(getGame({id, gameData}))


        }
    } , [gameData])

    useEffect(() => {
        if (!gData) {
            return
        }
        if (!gData.boardData.some(box => box?.piece?.moves && box.piece.moves.length > 0)) {
            const totalScores = gData.score
            setTotalScores(totalScores)
            setShowWinnerModal(true)
        }

        if (!gData.gameOngoing) {
            toast({
                description: 'a player has left the game'
            })
            dispatch(playerLeft())
            delayedRedirect()
        }

        if (gData?.command?.type === 'REQ_RESTART') {
            if (userId === gData.command.sender) {
                toast({
                    description: 'a game restart request is sent, waiting for approval',
                    duration: 3000
                })
                dispatch(clearCommands(gData._id))
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
                dispatch(clearCommands(gData._id))
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
   
    function getPlayerColor(userId: string, players: players) {
        if (userId === players.x) {
            return 'BLUE'
        }
        return 'RED'
    }

    if (gData) return (
        <div className="h-full flex flex-col w-full items-center justify-center">
            <PlayerTurnBar/>
            <Scores score={gData.score}/>
            <Board 
                gameBoard={gData.boardData}
                players={gData.players}
                playerTurn={gData.playerTurn}
                ref={boardRef}
                side={getPlayerColor(userId, gData.players)}
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
        { showWinnerModal && <WinnerModal 
            totalScores={totalScores} 
            setShowWinnerModal={setShowWinnerModal}
        />}
        </div>
    )
    
    return (
        <div className="w-[100vw] h-[100vh] fixed bg-customBg text-3xl text-customLight flex items-center justify-center">
            Loading...
        </div>
        
    )
    
}