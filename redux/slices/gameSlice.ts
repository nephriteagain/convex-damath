import { cloneDeep } from 'lodash'
import { createSlice } from "@reduxjs/toolkit";
import { boxPiece, gameData, piece } from "@/types";
import { Id } from '@/convex/_generated/dataModel';

type initialState = {
    gameId: Id<'games'>|'';
    pieceToMove: null|piece;
    pieceIndex: number;
    gameData?: gameData;
}

const init : initialState = {
    gameId: '',
    pieceToMove: null,
    pieceIndex: -1,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState : init,
    reducers: {
        getGame(state, action)  {
            if (!state.gameId) {
                state.gameId = action.payload.id
            }
            state.gameData = action.payload.gameData
        },
        highlightMoves(state, action) {
            const index = action.payload.pieceIndex as number
            const piece = action.payload.pieceToMove as piece
            if (state.gameData) {
                console.log('test')
                const boardCopy = cloneDeep(state.gameData.boardData) as boxPiece[]
                boardCopy.forEach(b => {
                    if (b.hightlighted) {
                        b.hightlighted = false
                    }
                })
                piece.moves.forEach(m => {
                    boardCopy[m].hightlighted = true
                })
                state.gameData.boardData = boardCopy
                state.pieceToMove = piece
                state.pieceIndex = index
            }
            
        }
    }    
})

export const { getGame, highlightMoves } = gameSlice.actions
export default gameSlice.reducer