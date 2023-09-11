"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"
export default function Watch() {
    const watchList = useQuery(api.game.getWatchGameList)


    if (watchList) {
        return (
            <div>

            <div className="w-[600px]">
                <div className="flex flex-row font-semibold px-2 py-1 border-2 border-black mb-2">
                    <div className="basis-1/4">type</div>
                    <div className="basis-1/4">host</div>
                    <div className="basis-1/4">guest</div>
                    <button className="basis-1/4">action</button>
                </div>
                {watchList.map(g => {
                    const {_id, gameType, players} = g
                    return (
                        <div key={_id} className="flex flex-row px-2 py-1 border-2 border-black mb-2">
                            <div className="basis-1/4">{gameType}</div>
                            <div className="basis-1/4">{players.z}</div>
                            <div className="basis-1/4">{players.x}</div>
                            <Link  href={`/watch/${_id}`}
                            className="basis-1/4 text-center">
                                WATCH
                            </Link>
                        </div>
                    )
                })}
            </div>
            <Link href='/' className="underline decoration-2 text-xl text-center">
                Back to Home
            </Link>
            </div>
        )
    }

    return (
        <div>
            <div>
            Loading...
            </div>
            <Link href='/' className="underline decoration-2 text-xl text-center">
                Back to Home
            </Link>
        </div>
    )
    
}