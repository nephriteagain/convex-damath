import { useEffect } from "react";
import { Lobby } from "@/types";
import { convex } from "@/lib/convex";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useAppDispatch } from "@/redux/hooks";
import { clearJoinedLobbyId } from "@/redux/slices/userSlice";
import { clearLobbyData } from "@/redux/slices/lobbySlice";
import { useRouter } from "next/navigation";
export function useRecon(lobbyData: Lobby | undefined) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    async function getGameData(gameId: Id<"games">) {
        if (lobbyData?.start) {
            const data = await convex.query(api.game.getGameData, {
                id: gameId,
            });
            dispatch(clearJoinedLobbyId());
            dispatch(clearLobbyData());
            if (data?.gameOngoing) {
                router.push(`/game/${lobbyData.start}`);
            }
        }
    }

    useEffect(() => {
        if (lobbyData?.start) {
            const gameId = lobbyData.start as Id<"games">;
            getGameData(gameId);
        }
    }, [lobbyData]);

    return;
}
