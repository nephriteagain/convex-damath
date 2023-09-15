import { MouseEvent, } from "react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { highlightMoves } from "@/redux/slices/gameSlice";
import { piece, players } from "@/types";

interface PieceProps {
    piece: piece;
    index?: number;
    players: players;
    playerTurn: string;
}



export default function Piece({piece, index, players, playerTurn}: PieceProps) {
    const {id} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const { type, value, moves, king } = piece

    function handleClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        console.log('clicked')
        dispatch(highlightMoves({pieceIndex: index, pieceToMove: piece}))
    }

    const onClick = (
        piece.moves.length > 0 &&  
        playerTurn === id
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