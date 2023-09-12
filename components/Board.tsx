import { COUNTING } from "@/lib/data/gameData"
import { boxPiece, players } from "@/types"
import { forwardRef, Ref } from "react"
import Box from "./Box"

interface BoardProps {
    gameBoard: boxPiece[]|undefined
    players:players;
    playerTurn: string;
}

export default forwardRef(function Board({gameBoard = COUNTING, players, playerTurn}: BoardProps, ref: Ref<HTMLDivElement>) {
    return (
        <div className="board relative  w-[500px] aspect-square grid grid-cols-8 grid-rows-[8] bg-slate-100 shadow-xl drop-shadow-lg"
            ref={ref}
        >
            {gameBoard.map((item,index) => {
                const { playable, piece, operation, hightlighted } = item
                return (
                    <Box
                        key={index}
                        playable={playable}
                        piece={piece}
                        operation={operation}
                        index={index}
                        highlighted={hightlighted}
                        players={players}
                        playerTurn={playerTurn}
                    />
                )
            })}
            <div className="vertical-num" />
            <div className="horizontal-num" />          
        </div>
    )
})