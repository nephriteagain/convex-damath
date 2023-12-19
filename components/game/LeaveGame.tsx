import { MouseEvent, useState } from "react";

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
} from "@/components/ui/alert-dialog";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Id } from "@/convex/_generated/dataModel";
import { leaveGame } from "@/redux/thunks";

import LoadingSvg from "../common/LoadingSvg";

interface LeaveGameProps {
    gameId: Id<"games">;
}
export default function LeaveGame({ gameId }: LeaveGameProps) {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    // const { id } = useAppSelector(state => state.game)

    async function handleClick(e: MouseEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            await dispatch(leaveGame(gameId));
        } catch (error) {
            console.error("something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-customSec hover:bg-[#ef4444] max-w-[200px] text-white py-[0.5rem] text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150 rounded-md">
                Leave Game
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-customLight">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="bg-transparent hover:bg-transparent border-2 border-customSec hover:bg-customSec hover:text-white">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className=" relative flex items-center justify-center bg-customSec text-white"
                        onClick={handleClick}
                        disabled={loading}
                    >
                        {loading && (
                            <LoadingSvg
                                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                                width={24}
                                height={24}
                            />
                        )}
                        <p className={loading ? "invisible" : "visible"}>
                            Continue
                        </p>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
