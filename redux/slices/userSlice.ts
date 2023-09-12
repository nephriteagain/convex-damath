import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { createRoom, joinRoom, leaveRoom } from "../thunks";
export function generateId() {
    return Math.random().toString(16).slice(2)
}

const newId = generateId() as string



const initialState : User = {
    id: newId,
    isLoggedIn: false,
    joinedLobby: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserId(state, action) {
            state.id = action.payload
        },
        clearJoinedLobbyId(state) {
            state.joinedLobby = ''
        }
    },
    extraReducers: builder => {
        builder.addCase(createRoom.fulfilled, (state, action) => {
            if (action.payload) {
                state.joinedLobby = action.payload._id
            }
        }),
        builder.addCase(joinRoom.fulfilled, (state, action) => {
            if (action.payload) {
                state.joinedLobby = action.payload._id
            }        
        }),
        builder.addCase(leaveRoom.fulfilled, (state) => {
            state.joinedLobby = ''
        })
    }
})

export const { getUserId, clearJoinedLobbyId } = userSlice.actions
export default userSlice.reducer