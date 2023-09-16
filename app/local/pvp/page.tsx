"use client"
import { useState } from "react"
import { useAppSelector } from "@/redux/hooks"


import PreGameModal from "@/components/local/PreGameModal"
import LocalBoard from "@/components/local/LocalBoard"
import LocalTurn from "@/components/local/LocalTurn"

export default function Page() {
    const [ gameStart, setGameStart ] = useState(false)
    const { playerTurn } = useAppSelector(s => s.local)


    function hideModal() {
        setGameStart(true)
    }


    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <LocalTurn  playerTurn={playerTurn} />
            <LocalBoard />
            { !gameStart &&
                <PreGameModal  hideModal={hideModal} />
            }
        </div>
    )
}