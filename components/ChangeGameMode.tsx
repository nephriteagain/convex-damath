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
import LoadingSvg from "./LoadingSvg"

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
        <Button variant="default" className="max-w-[200px] hover:scale-105 active:scale-95 transition-all duration-150">Change Game Mode</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select a Game Mode</AlertDialogTitle>
          <AlertDialogDescription>
            A request will be sent to your opponent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleClick}
            disabled={loading}
            className="relative flex items-center justify-center disabled:opacity-50"
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
                className="relative flex items-center justify-center disabled:opacity-50"
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
                className="relative flex items-center justify-center disabled:opacity-50"
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

          <AlertDialogCancel>
            Cancel
            </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        // <Dialog>
        // <DialogTrigger asChild>
        //     <Button variant="default"
        //         className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
        //     >            
        //         Change Game Mode
        //     </Button>
        // </DialogTrigger>
        // <DialogContent className="sm:max-w-[425px]">
        //     <DialogHeader>
        //     <DialogTitle className="font-bold text-center text-2xl">
        //         Select a Game Mode
        //     </DialogTitle>
        //     </DialogHeader>
        //     <div className="grid gap-4 py-4">
        //         <Button variant='outline'
        //         onClick={handleClick}
        //         >
        //             COUNTING
        //         </Button>
        //         <Button variant='outline'
        //         onClick={handleClick}
        //         >
        //             WHOLE
        //         </Button>
        //         <Button variant='outline'
        //         onClick={handleClick}
        //         >
        //             INTEGER
        //         </Button>
        //     <Select>
        //         {/* <SelectTrigger className="w-[180px]">
        //             <SelectValue placeholder="Timer" />
        //         </SelectTrigger>
        //         <SelectContent>
        //             <SelectItem value="5:00">5:00</SelectItem>
        //             <SelectItem value="1:00">1:00</SelectItem>
        //             <SelectItem value="3:00">3:00</SelectItem>
        //             <SelectItem value="10:00">10:00</SelectItem>
        //             <SelectItem value="No Timer">No Timer</SelectItem>
        //         </SelectContent> */}
        //     </Select>
        //     </div>
        //     {/* <DialogFooter>
        //     <Button>
        //         Start Game
        //     </Button>
        //     </DialogFooter> */}
        // </DialogContent>
        // </Dialog>
    )
}