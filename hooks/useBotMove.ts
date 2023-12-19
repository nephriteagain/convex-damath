import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { piece } from "@/types";
import { debounce } from "lodash";
import { botMove } from "@/redux/slices/localSlice";

function getRandomIndex(array: any[]) {
    if (!Array.isArray(array) || array.length === 0) {
        return -1; // Return -1 if the input is not a valid array or if it's empty.
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
}

export function useBotMove() {
    const { boardData, playerTurn } = useAppSelector((s) => s.local);
    const dispatch = useAppDispatch();
    const delayedDispatch = debounce(dispatch, 2000);

    useEffect(() => {
        const isGameOver = !boardData.some(
            (b) => b?.piece && b.piece.moves.length > 0,
        );
        if (playerTurn === "z" && !isGameOver) return;
        const possibleMovesArr: {
            index: number;
            piece: piece;
        }[] = [];
        boardData.forEach((b, idx) => {
            if (b?.piece && b.piece.moves.length > 0 && b.piece.type === "x") {
                possibleMovesArr.push({ index: idx, piece: b.piece });
            }
        });
        if (possibleMovesArr.length === 0) return;
        const random = getRandomIndex(possibleMovesArr);
        const randomIdx = possibleMovesArr[random].index;
        const randomPiece = possibleMovesArr[random].piece;

        const randomMoveIdx = getRandomIndex(randomPiece.moves);
        const randomMove = randomPiece.moves[randomMoveIdx];
        delayedDispatch(
            botMove({
                pieceToMove: randomPiece,
                pieceIndex: randomIdx,
                index: randomMove,
            }),
        );
    }, [boardData]);
}
