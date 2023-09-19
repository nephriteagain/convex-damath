import { gameData } from "@/types";
import { RefObject, useEffect } from "react";
import { boardStyleFlip } from "@/lib/helper/styleHelper";

export function useBoardFlip(gData: gameData|undefined, boardRef: RefObject<HTMLDivElement>, userId: string) {

    useEffect(() => {
        if (boardRef?.current && userId === gData?.players.x) {
            const board = boardRef.current as HTMLDivElement;              
            const verticalNum = document.querySelector('.vertical-num') as HTMLDivElement
            const horizontalNum = document.querySelector('.horizontal-num') as HTMLDivElement            
            boardStyleFlip(board, horizontalNum, verticalNum)              
        }
    }, [gData])
}