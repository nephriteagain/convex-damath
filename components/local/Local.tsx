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
import { Button } from "@/components/ui/button"

import Link from "next/link"


export default function Local() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default"
                    className="w-full text-center bg-customNeutral text-white text-2xl rounded-md shadow-lg drop-shadow-lg px-4 py-1 hover:scale-105 hover:bg-customSec hover:shadow-md hover:drop-shadow-md active:scale-100 transition-all duration-150"
                >
                    Local
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-customNeutral text-white">
                <AlertDialogHeader>
                <AlertDialogTitle>
                    Local
                </AlertDialogTitle>
                <AlertDialogDescription className="flex flex-row justify-center items-center m-0 gap-4">
                <AlertDialogCancel className="bg-transparent text-white border-customSec border-2 hover:bg-transparent">
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="bg-customSec">
                    <Link href={'/local/pvp'}>
                    Player vs Player
                    </Link>
                </AlertDialogAction>
                <AlertDialogAction className="bg-customSec">
                    <Link href={'/local/bot'}>
                    Player vs Bot
                    </Link>
                </AlertDialogAction>
                </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}