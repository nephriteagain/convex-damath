import { piece } from "@/types";
interface PieceProps {
    piece: piece;
    index?: number;
    playerTurn: 'z'|'x';
}
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { highlightMoves } from "@/redux/slices/localSlice";

export default function LocalPiece({piece, index, playerTurn}: PieceProps){
    const { pvp } = useAppSelector(s => s.local)

    const { type, value, moves, king } = piece
    const dispatch = useAppDispatch()


    function handleClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (piece.moves.length === 0 || playerTurn !== piece.type) {
            return
        }
        // for bots
        if (!pvp && playerTurn === 'x') {
            return
        }
        console.log('clicked')
        dispatch(highlightMoves({pieceIndex: index, pieceToMove: piece}))
    }
    
    const onClick = (
        piece.moves.length > 0 &&  
        playerTurn === piece.type
    ) ? handleClick : undefined

    return (
        <div className={`z-10 ${type === 'z' ? 'red-piece' : 'blue-piece'}
            ${moves.length > 0 ? 'opacity-100 cursor-pointer' : 'opacity-70'}
            ${king ? 'border-4 border-dashed border-black' : ''}
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full`}
            onClick={onClick}
        >
            <span className={`${(value === 6 || value === 9) && "border-t-4 border-white"}`}>
                {value}
            </span>
        </div>
    )
}