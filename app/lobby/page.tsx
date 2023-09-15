"use client"
import Link from "next/link"

import LobbyComponent from "@/components/lobby/Lobby"
import CreateRoom from "@/components/lobby/CreateRoom"
import Filter from "@/components/lobby/Filter"

import { useEffect, useRef } from "react"
import { ConvexHttpClient } from "convex/browser"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearJoinedLobbyId } from "@/redux/slices/userSlice"
import { clearLobbyData } from "@/redux/slices/lobbySlice"
import { useRouter } from 'next/navigation'
import { clearRoom } from "@/redux/thunks"
import { Toaster } from "@/components/ui/toaster"

export const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default  function Home() {
    const router = useRouter()
    const sheetRef = useRef<HTMLButtonElement>(null)
    const dispatch = useAppDispatch()
    const {id, joinedLobby} = useAppSelector(state => state.user)
    const {lobbies, lobbyData} = useAppSelector(state => state.lobby)
    
    useEffect(() => {
        if (lobbyData?.start && lobbyData.host === id) {
            dispatch(clearRoom(lobbyData._id))
        }
        if (lobbyData?.start) {
            router.push(`/game/${lobbyData.start}`)
        }

    }, [lobbyData])



    function showSheet() {
        if (!sheetRef.current) {
            return
        }
        sheetRef.current.click()
    }

    return (
        <div className="w-full h-full flex flex-col">            
            <div className="flex flex-col mt-12 p-8 bg-customNeutral shadow-lg drop-shadow-lg mb-4 w-[650px] mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <CreateRoom ref={sheetRef} showSheet={showSheet}/>
                    <Filter />
                </div>
                <LobbyComponent id={id} showSheet={showSheet} />
            </div>
            <Link href='/' className="select-none mx-auto w-fit underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
            <Toaster />
        </div>
    )
}