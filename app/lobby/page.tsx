"use client"
import Link from "next/link"

import LobbyComponent from "@/components/Lobby"
import CreateRoom from "@/components/CreateRoom"

import { useEffect } from "react"
import { ConvexHttpClient } from "convex/browser"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearJoinedLobbyId } from "@/redux/slices/userSlice"
import { clearLobbyData } from "@/redux/slices/lobbySlice"
import { useRouter } from 'next/navigation'
export const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default  function Home() {
    const router = useRouter()

    const dispatch = useAppDispatch()
    const {id, joinedLobby} = useAppSelector(state => state.user)
    const {lobbies, lobbyData} = useAppSelector(state => state.lobby)
    
    useEffect(() => {
        if (lobbyData?.start) {
            router.push(`/game/${lobbyData.start}`)
        }
    }, [lobbyData])

    useEffect(() => {
        if (!lobbies.some(l => l._id === joinedLobby)) {
            dispatch(clearJoinedLobbyId())
            dispatch(clearLobbyData())
        }
    }, [lobbies])

    return (
        <div className="w-full h-full flex flex-col">            
            <div className="p-8 bg-customNeutral shadow-lg drop-shadow-lg mb-4 w-[700px] mx-auto mt-20">
                <CreateRoom />
                <LobbyComponent id={id} />
            </div>
            <Link href='/' className="underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
        </div>
    )
}