import { createSlice } from "@reduxjs/toolkit";
import { piece } from "@/types";


type initialState = {
    gameId: string;
    pieceToMove: null|piece;
    pieceIndex: number;
}

const init : initialState = {
    gameId: '',
    pieceToMove: null,
    pieceIndex: -1
}

export const gameSlice = createSlice({
    name: 'game',
    initialState : init,
    reducers: {
        getGame(state, action)  {
            state.gameId = action.payload
        }
    }
})

export const { getGame } = gameSlice.actions
export default gameSlice.reducer