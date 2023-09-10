import { MouseEvent, } from "react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { piece } from "@/types";

interface PieceProps {
    piece: piece;
    index?: number
}



export default function Piece({piece, index}: PieceProps) {


    

    const { type, value, movable, king } = piece
    return (
        <div className={`z-10 ${type === 'z' ? 'red-piece' : 'blue-piece'}
            ${movable ? 'opacity-100 cursor-pointer' : 'opacity-70'}
            ${king ? 'border-4 border-dashed border-black' : ''}
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full`}
        >
            <span className={`${(value === 6 || value === 9) && "border-t-4 border-white"}`}>
                {value}
            </span>
        </div>
    )
}