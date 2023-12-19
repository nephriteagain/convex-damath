import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import lobbySlice from "./slices/lobbySlice";
import gameSlice from "./slices/gameSlice";
import localSlice from "./slices/localSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        lobby: lobbySlice,
        game: gameSlice,
        local: localSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
