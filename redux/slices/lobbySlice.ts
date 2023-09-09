import { createSlice } from "@reduxjs/toolkit";
import { Lobby } from "@/types";
import { createRoom, joinRoom } from "../thunks";
const initialState : {
    lobbies: Lobby[];
    lobbyData?: Lobby;
} = {
    lobbies: [],
}

export const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        getLobbies(state, action) {
            if (action.payload) {
                state.lobbies = action.payload
            }
        },
        clearLobbyData(state) {
            state.lobbyData = undefined
        }
    },
    extraReducers: builder => {
        builder.addCase(createRoom.fulfilled, (state, action) => {
            state.lobbyData = action.payload
        }),
        builder.addCase(joinRoom.fulfilled, (state, action) => {
            state.lobbyData = action.payload
        })
    }
})

export const { getLobbies, clearLobbyData } = lobbySlice.actions
export default lobbySlice.reducer
