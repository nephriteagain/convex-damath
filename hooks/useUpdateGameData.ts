import { useEffect } from "react";
import { getGame } from "@/redux/slices/gameSlice";
import { useAppDispatch } from "@/redux/hooks";

export function useUpdateGameData(gameData: any, id: string | string[]) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (gameData) {
            dispatch(getGame({ id, gameData }));
        }
    }, [gameData]);
}
