import Side from "../game/Side"
import { useAppSelector } from "@/redux/hooks"
const num = [0,1,2,3,4,5,6,7]

import LocalBox from "./LocalBox"

export default function LocalBoard() {
    const { boardData, playerTurn } = useAppSelector(s => s.local)

    return (
        <div className="board relative  w-[95%] max-w-[500px] sm:w-[500px] aspect-square grid grid-cols-8 grid-rows-[8] bg-slate-100 shadow-xl drop-shadow-lg"
        >
            {
                boardData.map((item, index) => {
                const { playable, piece, operation, hightlighted } = item
                    return (
                        <LocalBox 
                            key={index}
                            playable={playable}
                            piece={piece}
                            operation={operation}
                            index={index}
                            highlighted={hightlighted}
                            playerTurn={playerTurn}
                        />
                    )
                })
            }
            <Side numArr={num} />
            </div>
    )   
}