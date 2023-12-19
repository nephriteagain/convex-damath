"use client";

import LobbyComponent from "@/components/lobby/Lobby";
import CreateRoom from "@/components/lobby/CreateRoom";
import Filter from "@/components/common/Filter";
import BacktoHome from "@/components/common/BackToHome";
import Progress from "@/components/common/Progress";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useRecon } from "@/hooks/useRecon";
import { useRejoinLobby } from "@/hooks/useRejoinLobby";
import { useLocalContext } from "@/components/common/LocalProvider";

export const dynamic = "force-dynamic";

export default function Home() {
    const [start, setStart] = useState(false);

    const sheetRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();
    const { id, joinedLobby } = useAppSelector((state) => state.user);
    const { lobbies, lobbyData } = useAppSelector((state) => state.lobby);

    const { localId } = useLocalContext()
    useRejoinLobby(localId);
    useRecon(lobbyData);

    function showSheet() {
        if (!sheetRef.current) {
            return;
        }
        sheetRef.current.click();
    }

    useEffect(() => {
        if (joinedLobby === "") {
            localStorage.removeItem("joined_lobby");
        } else {
            localStorage.setItem("joined_lobby", joinedLobby);
        }
    }, [joinedLobby]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className=" flex flex-col mt-12 py-8 px-1 sm:p-8 h-[85%] sm:h-auto bg-customNeutral shadow-lg drop-shadow-lg mb-4 w-full sm:w-[640px] mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <CreateRoom ref={sheetRef} showSheet={showSheet} />
                    <Filter />
                </div>
                <LobbyComponent id={id} showSheet={showSheet} />
            </div>
            <BacktoHome onClick={() => setStart(true)} />
            <Toaster />
            <Progress start={start} />
        </div>
    );
}
