"use client"
import Link from "next/link"

import LobbyComponent from "@/components/lobby/Lobby"
import CreateRoom from "@/components/lobby/CreateRoom"
import Filter from "@/components/common/Filter"

import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearJoinedLobbyId } from "@/redux/slices/userSlice"
import { clearLobbyData } from "@/redux/slices/lobbySlice"
import { useRouter } from 'next/navigation'
import { clearRoom } from "@/redux/thunks"
import { Toaster } from "@/components/ui/toaster"


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
            dispatch(clearJoinedLobbyId())
            dispatch(clearLobbyData())
            router.push(`/game/${lobbyData.start}`)
        }

    }, [lobbyData])

    let i=0
    while(i < 1000 * 60) {
        i++
    }

    function showSheet() {
        if (!sheetRef.current) {
            return
        }
        sheetRef.current.click()
    }

    return (
        <div className="w-full h-full flex flex-col">            
            <div className=" flex flex-col mt-12 py-8 px-1 sm:p-8 h-[85%] sm:h-auto bg-customNeutral shadow-lg drop-shadow-lg mb-4 w-full sm:w-[640px] mx-auto">
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