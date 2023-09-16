import { createSlice } from '@reduxjs/toolkit'
import {  boxPiece, piece, score } from '@/types'
import { cloneDeep } from 'lodash'
import { COUNTING } from '@/lib/data/gameData'
import { movePiece as MovePieceHelper } from '@/gameLogic/movePiece'

type initialState = {
    pvp: boolean;
    pieceToMove: null|piece;
    pieceIndex: number;
    playerTurn: 'x'|'z';
    gameType: 'COUNTING'|'WHOLE'|'INTEGER';
    gameOngoing: boolean;
    score: score;
    boardData: boxPiece[]
}

const init : initialState = {
    pvp: true,
    pieceToMove: null,
    pieceIndex: -1,
    playerTurn: 'z',
    gameType: 'COUNTING',
    gameOngoing: false,
    score: {z:0, x:0},
    boardData: COUNTING
}

export const localSlice = createSlice({
    name: 'local',
    initialState: init,
    reducers: {
        changeGameType: (state, action) => {
            state.gameType = action.payload
        },
        highlightMoves: (state, action) => {
            const index = action.payload.pieceIndex as number
            const piece = action.payload.pieceToMove as piece
            if (state.boardData) {
                const boardCopy = cloneDeep(state.boardData) as boxPiece[]
                boardCopy.forEach(b => {
                    if (b.hightlighted) {
                        b.hightlighted = false
                    }
                })
                piece.moves.forEach(m => {
                    boardCopy[m].hightlighted = true
                })
                state.boardData = boardCopy
                state.pieceToMove = piece
                state.pieceIndex = index
            }
        },
        movePiece: (state, action) => {
            const {
                piece, 
                index, 
                pieceIndex, 
                playerTurn, 
                id, 
                boardData, 
                score
            } = action.payload

            const nextTurn = playerTurn === 'z' ? 'x' : 'z'
            const oldBoard = cloneDeep(boardData)

            const capturedPieceArr : piece[] = []
            // TODO:
            // const newBoardData = MovePieceHelper()
        }
    }
})

export const { changeGameType, highlightMoves } = localSlice.actions
export default localSlice.reducer