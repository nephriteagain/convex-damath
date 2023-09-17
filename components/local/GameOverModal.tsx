"use client"
import { Button } from "../ui/button"
import { score } from "@/types"
import { Dispatch, MouseEvent, SetStateAction } from "react"
import { reset } from "@/redux/slices/localSlice"
import { useAppDispatch } from "@/redux/hooks"

interface PostGameModal {
    setGameStart: Dispatch<SetStateAction<boolean>>;
    setIsGameOver: Dispatch<SetStateAction<boolean>>;
    score: score
}

export default function PostGameModal({ setGameStart, setIsGameOver, score}: PostGameModal) {

    const dispatch = useAppDispatch()

    function handleClick(e: MouseEvent) {
        e.preventDefault()
        dispatch(reset())
        setGameStart(false)
        setIsGameOver(false)
    }

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-transparent z-30">
            <div className="w-full h-full bg-black opacity-50" />
            <div className="text-white bg-customSec rounded-lg shadow-md drop-shadow-md w-[250px] h-[200px] flex flex-col items-center justify-center gap-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%]">            
                <div className="text-2xl font-bold">
                    {
                        score.z > score.x ? 
                        'RED WIN!' :
                        score.x > score.z ?
                        'BLUE WIN!' :
                        'DRAW!'
                    }
                </div>   
                <div className="text-lg font-semibold">
                    <div>
                        RED TOTAL: {score.z}
                    </div>
                    <div>
                        BLUE TOTAL: {score.x}
                    </div>
                </div>
                <Button 
                    onClick={handleClick}
                    className="bg-customNeutral px-8 shadow-md drop-shadow-md"
                >
                    Restart
                </Button>
            </div>
        </div>
    )
}