import { createSlice } from "@reduxjs/toolkit";
import { Lobby } from "@/types";
import {
    createRoom,
    joinRoom,
    leaveRoom,
    deleteRoom,
    checkJoinedLobby,
} from "../thunks";
const initialState: {
    lobbies: Lobby[];
    lobbyData?: Lobby;
} = {
    lobbies: [],
};

import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";

export const lobbySlice = createSlice({
    name: "lobby",
    initialState,
    reducers: {
        getLobbies(state, action) {
            if (action.payload) {
                state.lobbies = action.payload;
            }
        },
        clearLobbyData(state) {
            state.lobbyData = undefined;
        },
        gameStart(state, action) {
            if (state?.lobbyData) {
                state.lobbyData.start = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createRoom.fulfilled, (state, action) => {
            const lobby = action.payload as Lobby;
            state.lobbyData = lobby;
        }),
            builder.addCase(joinRoom.fulfilled, (state, action) => {
                const lobby = action.payload as Lobby;
                state.lobbyData = lobby;
            }),
            builder.addCase(leaveRoom.fulfilled, (state) => {
                state.lobbyData = undefined;
            }),
            builder.addCase(deleteRoom.fulfilled, (_, action) => {
                convex.mutation(api.lobby.clearRoom, { id: action.payload });
            }),
            builder.addCase(checkJoinedLobby.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    const lobby = action.payload as Lobby;
                    state.lobbyData = lobby;
                }
            });
    },
});

export const { getLobbies, clearLobbyData, gameStart } = lobbySlice.actions;
export default lobbySlice.reducer;
