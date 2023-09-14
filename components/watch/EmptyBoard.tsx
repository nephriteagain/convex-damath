
import { COUNTING } from "@/lib/data/gameData"
import { operation } from "@/types";
import { RiAddFill, RiSubtractFill, RiCloseFill, RiDivideFill,  } from 'react-icons/ri'


export default function EmptyBoard({className}: {className?: string}) {
    return (
        <div className={`board relative  w-[500px] aspect-square grid grid-cols-8 grid-rows-[8] bg-slate-100 shadow-xl drop-shadow-lg ${className}`}>
            {COUNTING.map((b,i) => {
                const { playable, operation} = b
                return (
                    <EmptyBox 
                        key={i}
                        playable={playable}
                        operation={operation}
                    />
                )
            })}
        </div>
    )
}

function EmptyBox({playable, operation,}: {playable: boolean; operation?: operation}) {
    return (
        <div className={`relative w-full aspect-square flex items-center justify-center`}
        style={playable ? {}: {background: 'linear-gradient(to top left, #111 0%, rgba(0, 0, 0, 0.80) 75%'}}
    >
        <div className={`absolute`}>
            <span className={`font-semibold text-4xl`}>
                {operation === 'add' && <RiAddFill />}
                {operation === 'subtract' && <RiSubtractFill />}
                {operation === 'multiply' && <RiCloseFill />}
                {operation === 'divide' && <RiDivideFill />}          
            </span>
        </div>
        </div>
    )
    
}