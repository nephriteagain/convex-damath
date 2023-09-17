"use client"
import { useState, useEffect, useLayoutEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { botMode, highlightMoves, botMove } from "@/redux/slices/localSlice"

import PreGameModal from "@/components/local/PreGameModal"
import LocalBoard from "@/components/local/LocalBoard"
import LocalTurn from "@/components/local/LocalTurn"
import Scores from "@/components/game/Score"
import PostGameModal from "@/components/local/GameOverModal"

import { debounce } from "lodash"
import { piece } from "@/types"

export default function Page() {
    const [ gameStart, setGameStart ] = useState(false)    
    const [ isGameOver, setIsGameOver ] = useState(false)

    const { playerTurn, score, boardData } = useAppSelector(s => s.local)
    const dispatch = useAppDispatch()



    const delayedDispatch = debounce(dispatch, 2000)

    function hideModal() {
        setGameStart(true)
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

    // bot effect
    useEffect(() => {
        const isGameOver = !boardData.some(b => b?.piece && b.piece.moves.length > 0)
        if (playerTurn === 'z' && !isGameOver) return
        const possibleMovesArr : {
            index: number;
            piece: piece
        }[] = []
        boardData.forEach((b,idx) => {
            if (b?.piece && b.piece.moves.length > 0 && b.piece.type === 'x') {
                possibleMovesArr.push({index:idx, piece: b.piece})
            }
        })
        if (possibleMovesArr.length === 0) return
        const random = getRandomIndex(possibleMovesArr)
        const randomIdx = possibleMovesArr[random].index
        const randomPiece = possibleMovesArr[random].piece
       
        const randomMoveIdx = getRandomIndex(randomPiece.moves)
        const randomMove = randomPiece.moves[randomMoveIdx]
        delayedDispatch(botMove({
            pieceToMove: randomPiece,
            pieceIndex: randomIdx,
            index: randomMove
        }))
    }, [playerTurn])


    function getRandomIndex(array: any[]) {
        if (!Array.isArray(array) || array.length === 0) {
          return -1; // Return -1 if the input is not a valid array or if it's empty.
        }
      
        const randomIndex = Math.floor(Math.random() * array.length);
        return randomIndex;
      }

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
        </div>
    )
}