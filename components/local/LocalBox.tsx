import { piece, operation } from "@/types";
import { RiAddFill, RiSubtractFill, RiCloseFill, RiDivideFill,  } from 'react-icons/ri'
import LocalPiece from "./LocalPiece";
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { movePiece } from "@/redux/slices/localSlice";
interface BoxProps {
    playable: boolean;
    piece: piece|undefined;
    operation: operation|undefined;
    index: number;
    highlighted: boolean|undefined;
    playerTurn: 'x'|'z';
}


export default function LocalBox({playable, piece, operation, index, highlighted, playerTurn}: BoxProps) {
    const dispatch = useAppDispatch()


    function handleClick(e: MouseEvent, index: number) {
        e.preventDefault()

        dispatch(movePiece({index}))
        return
    }

    return (
        <div className={`select-none relative w-full aspect-square flex items-center justify-center ${highlighted? 'bg-green-300' : ''}`}
            style={playable ? {}: {background: 'linear-gradient(to top left, #111 0%, rgba(0, 0, 0, 0.80) 75%'}}
            onClick={highlighted ? (e) => handleClick(e,index) : undefined}
        >
            {
                piece != undefined &&
                <LocalPiece 
                    piece={piece}
                    index={index}
                    playerTurn={playerTurn}
                /> 
            }
            <div className={`absolute ${piece != undefined ? 'left-0 top-0  sm:left-[2px] sm:top-[2px]' : ''}`}>
                <span className={` font-semibold ${piece == undefined ? 'text-4xl' : ''}`}>
                    {operation === 'add' && <RiAddFill />}
                    {operation === 'subtract' && <RiSubtractFill />}
                    {operation === 'multiply' && <RiCloseFill />}
                    {operation === 'divide' && <RiDivideFill />}          
                </span>
            </div>
            
        </div>
    )
}