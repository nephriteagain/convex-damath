import { COUNTING } from "@/lib/data/gameData"
import { boxPiece, players } from "@/types"
import { forwardRef, Ref } from "react"

import Box from "./Box"
import Nums from "./Nums"

interface BoardProps {
    gameBoard: boxPiece[]|undefined
    players:players;
    playerTurn: string;
    side?: 'RED'|'BLUE'
}

const num = [0,1,2,3,4,5,6,7]
const numReverse = [7,6,5,4,3,2,1,0]

export default forwardRef(function Board({gameBoard = COUNTING, players, playerTurn, side}: BoardProps, ref: Ref<HTMLDivElement>) {

    const numArr = side === 'BLUE' ? numReverse : num
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
            <div className="vertical-num absolute w-8 h-full -left-12 flex flex-col shadow-lg drop-shadow-lg">
                {numArr.map(n => {
                    return <Nums number={n} key={n}/>            
                })}
            </div>
            <div className="horizontal-num absolute h-8 w-full -bottom-14 flex flex-row shadow-lg drop-shadow-lg">
                {numArr.map(n => {
                    return <Nums number={n} key={n}/>            
                })}
            </div>                
            </div>
    )
})