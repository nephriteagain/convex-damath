"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"

import { BiArrowBack } from 'react-icons/bi'
import Board from "@/components/game/Board"
import WatchTurnBar from "@/components/watch/WatchTurnBar"
import Scores from "@/components/game/Score"
import Link from "next/link"
import LoadingSvg from "@/components/common/LoadingSvg"
import EmptyBoard from "@/components/watch/EmptyBoard"
import Progress from "@/components/common/Progress"

const fakeScore = {
    x: 0,
    z: 0
}
const fakePlayerTurn = 'loading'
const fakePlayers = {
    x: 'fake',
    z: 'fake'
}

export default function Watch() {
    const [ start, setStart ] = useState(false)

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
        <div className=" h-full flex flex-col w-full items-center justify-center">
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
            <Link href={'/watch'} className="absolute left-4 top-3 px-3 py-[2px] font-bold text-lg flex flex-row items-center justify-center hover:underline hover:bg-customSec hover:text-customLight transition-all duration-150 rounded-lg"
                onClick={() => setStart(true)}
            >
                <BiArrowBack className="me-2"/> 
                <p>watch lobby</p>
            </Link>
        </div>
        <Toaster />
        <Progress start={start} />
        </>
    )

    
    return (
        <div className="flex flex-col  items-center justify-center w-[100vw] h-[100vh] fixed bg-transparent text-3xl text-customLight  z-20">
            <div className="absolute top-8 left-[50%] translate-x-[-50%] translate-y-[-50%] z-30">
                <LoadingSvg width={40} height={40} className="text-black"/>                
            </div>
            <WatchTurnBar players={fakePlayers} playerTurn={fakePlayerTurn} />
            <Scores score={fakeScore} className="opacity-70"/>
            <EmptyBoard className="z-10 text-black opacity-70"/>
        </div>
    )
    
}