import { MouseEvent } from "react";
import Piece from "./Piece"
import { piece, operation, players } from "@/types";


import { RiAddFill, RiSubtractFill, RiCloseFill, RiDivideFill,  } from 'react-icons/ri'
import { movePiece } from "@/redux/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
interface BoxProps {
    playable: boolean;
    piece: piece|undefined;
    operation: operation|undefined;
    index: number;
    highlighted: boolean|undefined;
    players: players;
    playerTurn: string;
}


export default function Box({playable, piece, operation, index, highlighted, players, playerTurn}: BoxProps) {
    const dispatch = useAppDispatch()
    const { gameId, pieceToMove, pieceIndex, gameData, } = useAppSelector(state => state.game)
    function handleClick(e: MouseEvent, index: number) {
        console.log('move')
        e.stopPropagation();
        e.preventDefault();
        if (!gameData) {
            return
        }
        dispatch(movePiece({
            boardData: gameData.boardData,
            //@ts-ignore
            piece: pieceToMove,
            index,
            pieceIndex,
            playerTurn,
            //@ts-ignore
            id: gameId,
            players,
            score: gameData.score  
        }))
    }

    return (
        <div className={`relative w-full aspect-square flex items-center justify-center ${highlighted? 'bg-green-300' : ''}`}
            style={playable ? {}: {background: 'linear-gradient(to top left, #111 0%, rgba(0, 0, 0, 0.80) 75%'}}
            onClick={highlighted ? (e) => handleClick(e,index) : undefined}
        >
            {
                (piece != undefined && piece.moves.length > 0) &&
                <Piece 
                    piece={piece}
                    index={index}
                    players={players}
                    playerTurn={playerTurn}
                /> 
            }
            {
                (piece != undefined && piece.moves.length === 0) &&
                <Piece 
                    piece={piece} 
                    players={players}
                    playerTurn={playerTurn}
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