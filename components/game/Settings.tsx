
import { Button } from "../ui/button"
import ChangeGameMode from "./ChangeGameMode"
import LeaveGame from "./LeaveGame"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { MouseEvent, useState } from "react"

import { reqRestart } from "@/redux/thunks"
import { IoMdSettings } from 'react-icons/io'

import { Id } from "@/convex/_generated/dataModel"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"

import LoadingSvg from "../common/LoadingSvg"

interface ButtonsProps {
    showRules: () => void
    gameId: Id<'games'>
}


export default function Settings({showRules, gameId}: ButtonsProps) {
    const dispatch = useAppDispatch()
    const { id: userId } = useAppSelector(state => state.user)
    const [ loading, setLoading ] = useState(false)

    async function handleRestart(e: MouseEvent) {
        e.preventDefault()
        try {
            setLoading(true)
            await dispatch(reqRestart({gameId, userId}))
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button variant={null}
            className="absolute top-4 left-2 hover:scale-125 hover:rotate-90  transition-all duration-150"
        >
            <span className="text-3xl">
                <IoMdSettings />
            </span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className="flex flex-col gap-4 w-[280px]">
           
           <Button variant="default"
               className="max-w-[200px] text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
               onClick={showRules}
           >
               Show Rules
           </Button>
           <Button variant="destructive"
               className=" relative flex items-center justify-center max-w-[200px] text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all duration-150"
               onClick={handleRestart}
               disabled={loading}
           >
                { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}
                <p className={loading ? 'invisible' : 'visited:'}>
                    Restart Game
                </p>
           </Button>
           <LeaveGame gameId={gameId} />
           <ChangeGameMode gameId={gameId} />

      </SheetContent>
    </Sheet>
        
    )
}