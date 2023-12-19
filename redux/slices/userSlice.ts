import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { createRoom, joinRoom, leaveRoom, checkJoinedLobby } from "../thunks";
export function generateId() {
    return Math.random().toString(16).slice(2);
}

const newId = generateId() as string;

const initialState: User = {
    id: newId,
    isLoggedIn: false,
    joinedLobby: "",
    disableCreateLobby: true,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserId(state, action) {
            state.id = action.payload;
        },
        clearJoinedLobbyId(state) {
            state.joinedLobby = "";
        },
        getLocalId(state, action) {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createRoom.fulfilled, (state, action) => {
            if (action.payload) {
                state.joinedLobby = action.payload._id;
            }
        }),
            builder.addCase(joinRoom.fulfilled, (state, action) => {
                if (action.payload) {
                    state.joinedLobby = action.payload._id;
                }
            }),
            builder.addCase(leaveRoom.fulfilled, (state) => {
                state.joinedLobby = "";
            }),
            builder.addCase(checkJoinedLobby.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.joinedLobby = action.payload._id;
                }
                state.disableCreateLobby = false;
            }),
            builder.addCase(checkJoinedLobby.rejected, (state, action) => {
                state.disableCreateLobby = false;
            });
    },
});

export const { getUserId, clearJoinedLobbyId, getLocalId } = userSlice.actions;
export default userSlice.reducer;
