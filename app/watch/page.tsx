"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"

import WatchLoading from "@/components/watch/WatchLoading"
import Filter from "@/components/common/Filter"
import { useSearchParams } from "next/navigation"
import BacktoHome from "@/components/common/BackToHome"
import Progress from "@/components/common/Progress"
import { useState } from "react"


// TODO: add pagination
export default function Watch() {
    const [ start, setStart ] = useState(false)

    const searchParams = useSearchParams()
    
    type FILTER = 'COUNTING'|'WHOLE'|'INTEGER'|null|''
    type ORDER = 'asc' | 'desc'
    
    const filter = searchParams.get('filter') as FILTER
    const order = searchParams.get('order') as ORDER || 'desc' as ORDER

    const watchList = useQuery(api.game.getWatchGameList, {filter, order})
    
    if (watchList?.length === 0) {
        return (
            <>
            <div className="mt-12 flex flex-col w-full items-center justify-center">

            <section className=" w-full sm:w-auto bg-customNeutral p-1 sm:p-8 pt-4  text-white h-[500px]">
                <div className="flex flex-row justify-end">
                    <Filter className="text-black ms"/>
                </div>
                <div className=" flex flex-row font-semibold px4 py-2  mb-2 bg-customSec sm:text-lg rounded-md shadow-md drop-shadow-md">
                    <div className="basis-1/4 ps-2">TYPE</div>
                    <div className="basis-1/4">HOST</div>
                    <div className="basis-1/4">GUEST</div>
                    <button className="basis-1/4 text-center">ACTION</button>
                </div>
                <div className=" bg-customBg px-2 p-0 py-1 w-full sm:w-[600px] h-[80%] overflow-y-auto">
                    <p className="text-center mt-4">no active game to watch</p>                
                </div>
            </section>
            <BacktoHome onClick={() => setStart(true)} />            
            </div>
            <Progress start={start} />
            </>
        )
        
    }

    if (watchList) {
        return (
            <>
            <div className="mt-12 flex flex-col w-full items-center justify-center">
            <section className=" w-full sm:w-auto bg-customNeutral p-1 sm:p-8 pt-4  text-white h-[500px]">
                <div className="flex flex-row justify-end">
                    <Filter className="text-black ms"/>
                </div>
                <div className=" flex flex-row font-semibold px4 py-2  mb-2 bg-customSec sm:text-lg rounded-md shadow-md drop-shadow-md">
                    <div className="basis-1/4 ps-2">TYPE</div>
                    <div className="basis-1/4">HOST</div>
                    <div className="basis-1/4">GUEST</div>
                    <button className="basis-1/4 text-center">ACTION</button>
                </div>
                <div className=" bg-customBg p-0 sm:px-2 py-1 w-full sm:w-[600px] h-[80%] overflow-y-auto">
                
                {watchList.map(g => {
                    const {_id, gameType, players} = g
                    return (
                        <div key={_id} className="text-sm sm:text-base flex flex-row px-1 sm:px-2 py-1 mb-2 bg-customSec">
                            <div className="basis-[27%] overflow-clip px-2">{gameType}</div>
                            <div className="basis-[27%] overflow-clip px-2">{players.z}</div>
                            <div className="basis-[27%] overflow-clip px-2">{players.x}</div>
                            <Link  href={`/watch/${_id}`}
                                className="basis-[19%] text-center bg-green-600 hover:bg-green-800 transition-all duration-150 rounded-md mx-4"
                                onClick={() => setStart(true)}
                            >
                                WATCH
                            </Link>
                        </div>
                    )
                })}
            </div>
            </section>
            <BacktoHome onClick={() => setStart(true)} />
            </div>
            <Progress start={start} />
            </>
        )
    }

    return (
        <>
        <WatchLoading onClick={() => setStart(true)} />
        <Progress start={start} />
        </>
    )
    
}