import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import lobbySlice from './slices/lobbySlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        lobby: lobbySlice,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch