"use client";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Exit() {
    const router = useRouter();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="max-w-[200px] bg-customSec text-white border-none text-lg hover:scale-105 hover:bg-customBg hover:text-white transition-all duration-150"
                >
                    Exit
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-customNeutral border-transparent">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="px-16 sm:px-0">
                    <AlertDialogCancel className="sm:mb-0  bg-customNeutral sm:my-1 text-white">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => router.push("/")}
                        className=" bg-customSec my-1 text-white"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
