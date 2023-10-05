import {  MouseEvent, useState } from "react"

import { Button } from "@/components/ui/button"


// import { requestChangeGameMode } from "@/redux/gameThunks/thunks"
import { reqChangeGameMode } from "@/redux/thunks"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Id } from "@/convex/_generated/dataModel"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import LoadingSvg from "../common/LoadingSvg"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { GameTypes } from "@/types"



interface ChangeGameModeProps {
  gameId: Id<'games'>
}

export default function ChangeGameMode({gameId}: ChangeGameModeProps) {
    const [ loading, setLoading ] = useState(false)
    const dispatch = useAppDispatch()
    // const { id } = useAppSelector(state => state.game)
    const { id: userId } = useAppSelector(state => state.user)

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const gameType = e.currentTarget.innerText.trim() as GameTypes
        try {
          setLoading(true)
          await dispatch(reqChangeGameMode({userId, gameId, gameType}))
        } catch (error) {
          console.error('something went wrong')
        } finally {
          setLoading(false)
        }
    }

    return (
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" 
          className="bg-customSec max-w-[200px]  hover:scale-105 active:scale-95 transition-all duration-150">
          Change Game Mode
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-customLight border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Select a Game Mode</AlertDialogTitle>
          <AlertDialogDescription>
            A request will be sent to your opponent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-wrap sm:gap-2">
          <AlertDialogAction 
            onClick={handleClick}
            disabled={loading}
            className="mt-2 sm:mt-0 relative flex items-center justify-center disabled:opacity-50 bg-customSec"
          >
            { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}                
                <p className={loading ? 'invisible' : 'visible'}>
                    COUNTING
                </p>
            </AlertDialogAction>
            <AlertDialogAction 
                onClick={handleClick}
                disabled={loading}
                className="mt-2 sm:mt-0 relative flex items-center justify-center disabled:opacity-50 bg-customSec"
            >
                { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}
                <p className={loading ? 'invisible' : 'visible'}>
                    WHOLE
                </p>
            </AlertDialogAction>
            <AlertDialogAction 
                onClick={handleClick}
                disabled={loading}
                className="mt-2 sm:mt-0 relative flex items-center justify-center disabled:opacity-50 bg-customSec"
            >
              { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}
                <p className={loading ? 'invisible' : 'visible'}>
                    INTEGER
                </p>
            </AlertDialogAction>
            <AlertDialogAction 
            onClick={handleClick}
            disabled={loading}
            className="mt-2 sm:mt-0 relative flex items-center justify-center disabled:opacity-50 bg-customSec"
          >
            { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}                
                <p className={loading ? 'invisible' : 'visible'}>
                    FRACTION
                </p>
            </AlertDialogAction>
            <AlertDialogAction 
            onClick={handleClick}
            disabled={loading}
            className="mt-2 sm:mt-0 relative flex items-center justify-center disabled:opacity-50 bg-customSec"
          >
            { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}                
                <p className={loading ? 'invisible' : 'visible'}>
                    RATIONAL
                </p>
            </AlertDialogAction>
            <AlertDialogAction 
            onClick={handleClick}
            disabled={loading}
            className="mt-2 sm:mt-0 relative flex items-center justify-center disabled:opacity-50 bg-customSec"
          >
            { loading && <LoadingSvg
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                    width={24}
                    height={24}
                />}                
                <p className={loading ? 'invisible' : 'visible'}>
                    RADICAL
                </p>
            </AlertDialogAction>
          <AlertDialogCancel className="bg-transparent border-customSec border-2 hover:bg-customSec hover:text-white">
            CLOSE
            </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    )
}