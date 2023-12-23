import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { createRoom, joinRoom, leaveRoom, checkJoinedLobby, createUser, getUser, signIn } from "../thunks";
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
        signOut(state) {
            state.id = generateId();
            state.isLoggedIn = false;
        }
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
            }),
            builder.addCase(createUser.fulfilled, (state, action) => {
                state.id = action.payload
            }),
            builder.addCase(getUser.fulfilled, (state, action) => {
                state.id = action.payload;
                state.isLoggedIn = true;
            }),
            builder.addCase(signIn.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.isLoggedIn = action.payload.isVerified
            })

    },
});

export const { getUserId, clearJoinedLobbyId, getLocalId } = userSlice.actions;
export default userSlice.reducer;
