import { MouseEvent } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { highlightMoves } from "@/redux/slices/gameSlice";
import { piece, players } from "@/types";

import { VALUES } from "@/lib/data/values";

interface PieceProps {
    piece: piece;
    index?: number;
    players: players;
    playerTurn: string;
}

export default function Piece({
    piece,
    index,
    players,
    playerTurn,
}: PieceProps) {
    const { id } = useAppSelector((state) => state.user);
    const { gameData } = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();
    const { type, value, moves, king, label } = piece;

    function handleClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        console.log("clicked");
        dispatch(highlightMoves({ pieceIndex: index, pieceToMove: piece }));
    }

    const onClick =
        piece.moves.length > 0 && playerTurn === id ? handleClick : undefined;

    const gameType = gameData?.gameType || "COUNTING";

    return (
        <div
            className={`z-10 ${type === "z" ? "red-piece" : "blue-piece"}
            ${moves.length > 0 ? "opacity-100 cursor-pointer" : "opacity-80"}
            ${king ? "border-4 border-dashed border-black" : ""}
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full`}
            onClick={onClick}
        >
            <span
                className={`${
                    (value === 6 || value === 9) && "border-t-4 border-white"
                }`}
            >
                <div
                    className={
                        gameType === "RADICAL"
                            ? "text-sm opacity-100"
                            : "opacity-100"
                    }
                    dangerouslySetInnerHTML={
                        gameType !== "RADICAL"
                            ? { __html: VALUES[gameType].get(value) || value }
                            : {
                                  __html:
                                      VALUES[gameType].get(label || value) ||
                                      value,
                              }
                    }
                />
            </span>
        </div>
    );
}
