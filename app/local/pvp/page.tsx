"use client"
import { useState, useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"


import PreGameModal from "@/components/local/PreGameModal"
import LocalBoard from "@/components/local/LocalBoard"
import LocalTurn from "@/components/local/LocalTurn"
import Scores from "@/components/game/Score"
import PostGameModal from "@/components/local/GameOverModal"
import LocalSettings from "@/components/local/LocalSettings"
import Rules from "@/components/game/Rules"

export default function Page() {
    const [ gameStart, setGameStart ] = useState(false)    
    const [ isGameOver, setIsGameOver ] = useState(false)
    const [ openRules, setOpenRules ] = useState(false)

    const { playerTurn, score, boardData } = useAppSelector(s => s.local)

    function showRules() {
        setOpenRules((rule) => !rule)
    }

    function hideModal() {
        setGameStart(true)
    }

    function shoModal() {
        setGameStart(false)
    }
    
    useEffect(() => {
        const isGameOver = !boardData.some(b => b?.piece && b.piece.moves.length > 0)
        if (isGameOver) {
            setIsGameOver(true)
        }
    }, [boardData])


    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Scores score={score} />
            <LocalTurn  playerTurn={playerTurn} />
            <LocalBoard />
            { (!gameStart) &&
                <PreGameModal 
                hideModal={hideModal} 
                />
            }
            {
                isGameOver &&
                <PostGameModal 
                setGameStart={setGameStart}
                setIsGameOver={setIsGameOver}
                score={score}
                />
            }
            { openRules && <Rules
                openRules={openRules}
                setOpenRules={setOpenRules}
                />
            }
            <LocalSettings 
                showRules={showRules} 
                showModal={shoModal}
            />
        </div>
    )
}