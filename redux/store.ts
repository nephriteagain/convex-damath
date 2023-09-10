import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import lobbySlice from './slices/lobbySlice'
import gameSlice from './slices/gameSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        lobby: lobbySlice,
        game: gameSlice,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch