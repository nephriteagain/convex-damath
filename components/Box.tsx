
import Piece from "./Piece"
import { piece, operation } from "@/types";


import { RiAddFill, RiSubtractFill, RiCloseFill, RiDivideFill,  } from 'react-icons/ri'


interface BoxProps {
    playable: boolean;
    piece: piece|undefined;
    operation: operation|undefined;
    index: number;
    highlighted: boolean|undefined;
}


export default function Box({playable, piece, operation, index, highlighted}: BoxProps) {

    

    return (
        <div className={`relative w-full aspect-square flex items-center justify-center ${highlighted? 'bg-green-300' : ''}`}
            style={playable ? {}: {background: 'linear-gradient(to top left, #111 0%, rgba(0, 0, 0, 0.80) 75%'}}
        >
            {
                (piece != undefined && piece.movable) &&
                <Piece 
                    piece={piece}
                    index={index}
                /> 
            }
            {
                (piece != undefined && !piece.movable) &&
                <Piece 
                    piece={piece} 
                /> 
            }
            <div className={`absolute ${piece != undefined ? 'left-[2px] top-[2px]' : ''}`}>
                <span className={`font-semibold ${piece == undefined ? 'text-4xl' : ''}`}>
                    {operation === 'add' && <RiAddFill />}
                    {operation === 'subtract' && <RiSubtractFill />}
                    {operation === 'multiply' && <RiCloseFill />}
                    {operation === 'divide' && <RiDivideFill />}          
                </span>
            </div>
            
        </div>
    )
}