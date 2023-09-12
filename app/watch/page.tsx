"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"

// TODO: add pagination
export default function Watch() {
    const watchList = useQuery(api.game.getWatchGameList)


    if (watchList) {
        return (
            <div className="mt-12 flex flex-col w-full items-center justify-center">

            <div className="w-[600px] bg-customNeutral px-2 py-4 overflow-auto text-white">
                <div className="bg-customBg px-2 py-1">
                <div className="flex flex-row font-semibold px-2 py-1 border-2 border-black mb-2 bg-customSec">
                    <div className="basis-1/4">TYPE</div>
                    <div className="basis-1/4">HOST</div>
                    <div className="basis-1/4">GUEST</div>
                    <button className="basis-1/4">ACTION</button>
                </div>
                {watchList.map(g => {
                    const {_id, gameType, players} = g
                    return (
                        <div key={_id} className="flex flex-row px-2 py-1 mb-2 bg-customSec">
                            <div className="basis-1/4">{gameType}</div>
                            <div className="basis-1/4">{players.z}</div>
                            <div className="basis-1/4">{players.x}</div>
                            <Link  href={`/watch/${_id}`}
                            className="basis-1/4 text-center bg-green-600 hover:bg-green-800 transition-all duration-150 rounded-md mx-4">
                                WATCH
                            </Link>
                        </div>
                    )
                })}
            </div>
            </div>
            <Link href='/' className="underline decoration-2 text-xl text-center">
                Back to Home
            </Link>
            </div>
        )
    }

    return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">
            <div className="w-[600px] bg-customNeutral px-2 py-4 overflow-auto text-white">
            Loading...
            </div>
            <Link href='/' className="underline decoration-2 text-xl text-center">
                Back to Home
            </Link>
        </div>
    )
    
}