import { createSlice } from "@reduxjs/toolkit";
import { boxPiece, piece, score } from "@/types";
import { cloneDeep } from "lodash";
import {
    COUNTING,
    WHOLE,
    INTEGER,
    FRACTION,
    RATIONAL,
    RADICAL,
} from "@/lib/data/gameData";
import { movePiece as MovePieceHelper } from "@/gameLogic/movePiece";
import {
    checkMovablePieces,
    kingPromoter,
} from "@/gameLogic/checkMovablePieces";
import { scoreHandler, getNewPieceBox } from "@/gameLogic/scoreHandler";

const games = {
    COUNTING: COUNTING,
    WHOLE: WHOLE,
    INTEGER: INTEGER,
    FRACTION: FRACTION,
    RATIONAL: RATIONAL,
    RADICAL: RADICAL,
};

type initialState = {
    pvp: boolean;
    pieceToMove: null | piece;
    pieceIndex: number;
    playerTurn: "x" | "z";
    gameType:
        | "COUNTING"
        | "WHOLE"
        | "INTEGER"
        | "FRACTION"
        | "RATIONAL"
        | "RADICAL";
    gameOngoing: boolean;
    score: score;
    boardData: boxPiece[];
};

const init: initialState = {
    pvp: true,
    pieceToMove: null,
    pieceIndex: -1,
    playerTurn: "z",
    gameType: "COUNTING",
    gameOngoing: false,
    score: { z: 0, x: 0 },
    boardData: COUNTING,
};

export const localSlice = createSlice({
    name: "local",
    initialState: init,
    reducers: {
        changeGameType: (state, action) => {
            const type = action.payload as
                | "COUNTING"
                | "WHOLE"
                | "INTEGER"
                | "FRACTION"
                | "RATIONAL"
                | "RADICAL";
            state.gameType = action.payload;
            state.boardData = games[type];
        },
        highlightMoves: (state, action) => {
            const index = action.payload.pieceIndex as number;
            const piece = action.payload.pieceToMove as piece;
            if (state.boardData) {
                const boardCopy = cloneDeep(state.boardData) as boxPiece[];
                boardCopy.forEach((b) => {
                    if (b.hightlighted) {
                        b.hightlighted = false;
                    }
                });
                piece.moves.forEach((m) => {
                    boardCopy[m].hightlighted = true;
                });
                state.boardData = boardCopy;
                state.pieceToMove = piece;
                state.pieceIndex = index;
            }
        },
        movePiece: (state, action) => {
            const { index } = action.payload;

            const piece = state.pieceToMove as piece;
            const pieceIndex = state.pieceIndex;
            const playerTurn = state.playerTurn;
            const boardData = state.boardData;
            const score = state.score;

            let nextTurn: "x" | "z" = playerTurn === "z" ? "x" : "z";
            const oldBoard = cloneDeep(boardData);

            const capturedPieceArr: piece[] = [];

            const newBoardData = MovePieceHelper(
                boardData,
                piece,
                index,
                pieceIndex,
                capturedPieceArr,
            );
            const playerToCheck = nextTurn;

            const didCapturedAPiece =
                pieceCount(boardData) > pieceCount(newBoardData);
            const boardDataWithNewMoves = checkMovablePieces(
                newBoardData,
                playerToCheck,
                didCapturedAPiece,
                piece,
            );
            const canMultiJump = boardDataWithNewMoves.some(
                (box) =>
                    box?.piece?.moves &&
                    box.piece.moves.length > 0 &&
                    box?.piece?.type !== playerToCheck &&
                    box?.piece?.value === piece.value,
            );

            let newScore = score;
            if (didCapturedAPiece) {
                const capturedPiece = capturedPieceArr[0];
                const newPieceBox = getNewPieceBox(
                    boardDataWithNewMoves,
                    piece,
                );
                const scoree = nextTurn === "x" ? "z" : "x";
                newScore = scoreHandler(
                    score,
                    scoree,
                    piece,
                    capturedPiece,
                    newPieceBox,
                );
            }

            if (canMultiJump && didCapturedAPiece) {
                nextTurn = playerTurn === "z" ? "z" : "x";
            }

            if (!canMultiJump) {
                kingPromoter(boardDataWithNewMoves);
            }

            state.playerTurn = nextTurn;
            state.boardData = boardDataWithNewMoves;
            state.score = newScore;
            state.pieceIndex = -1;
            state.pieceToMove = null;
        },
        reset: (state) => {
            return {
                ...init,
                pvp: state.pvp,
                gameType: state.gameType,
                boardData: games[state.gameType],
            };
        },
        botMode: (state) => {
            state.pvp = false;
        },
        botMove: (state, action) => {
            localSlice.caseReducers.highlightMoves(state, action);
            localSlice.caseReducers.movePiece(state, action);
        },
    },
});

function pieceCount(board: boxPiece[]): number {
    let count = 0;
    board.forEach((box) => {
        if (box?.piece) {
            count++;
        }
    });
    return count;
}

export const {
    changeGameType,
    highlightMoves,
    movePiece,
    reset,
    botMode,
    botMove,
} = localSlice.actions;
export default localSlice.reducer;
