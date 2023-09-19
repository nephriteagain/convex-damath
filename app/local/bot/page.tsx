"use client"
import { useState, useEffect, useLayoutEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { botMode } from "@/redux/slices/localSlice"

import PreGameModal from "@/components/local/PreGameModal"
import LocalBoard from "@/components/local/LocalBoard"
import LocalTurn from "@/components/local/LocalTurn"
import Scores from "@/components/common/Score"
import PostGameModal from "@/components/local/GameOverModal"
import LocalSettings from "@/components/local/LocalSettings"
import Rules from "@/components/common/Rules"

import { useBotMove } from "@/hooks/useBotMove"

import { debounce } from "lodash"

export default function Page() {
    const [ gameStart, setGameStart ] = useState(false)    
    const [ isGameOver, setIsGameOver ] = useState(false)
    const [ openRules, setOpenRules ] = useState(false)

    const { playerTurn, score, boardData } = useAppSelector(s => s.local)
    const dispatch = useAppDispatch()



    const delayedDispatch = debounce(dispatch, 2000)

    function showRules() {
        setOpenRules((rule) => !rule)
    }


    function hideModal() {
        setGameStart(true)
    }

    
    function shoModal() {
        setGameStart(false)
    }

    useLayoutEffect(() => {
        dispatch(botMode())
    }, [])

    
    
    useEffect(() => {
        const isGameOver = !boardData.some(b => b?.piece && b.piece.moves.length > 0)
        if (isGameOver) {
            setIsGameOver(true)
        }
    }, [boardData])

    useBotMove()


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