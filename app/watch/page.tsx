"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"

const loaderData = new Array(5).fill(true)

// TODO: add pagination
export default function Watch() {
    const watchList = useQuery(api.game.getWatchGameList)
    if (watchList?.length === 0) {
        return (
            <div className="mt-12 flex flex-col w-full items-center justify-center">

            <section className=" bg-customNeutral  p-8  text-white h-[500px]">
                <div className=" flex flex-row font-semibold px4 py-2  mb-2 bg-customSec text-lg rounded-md shadow-md drop-shadow-md">
                    <div className="basis-1/4 ps-2">TYPE</div>
                    <div className="basis-1/4">HOST</div>
                    <div className="basis-1/4">GUEST</div>
                    <button className="basis-1/4 text-center">ACTION</button>
                </div>
                <div className=" bg-customBg px-2 py-1 w-[600px] h-[80%] overflow-y-auto">
                    <p className="text-center mt-4">no active game to watch</p>                
                </div>
            </section>
            <Link href='/' className="mt-2 underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
            </div>
        )
        
    }

    if (watchList) {
        return (
            <div className="mt-12 flex flex-col w-full items-center justify-center">

            <section className=" bg-customNeutral  p-8  text-white h-[500px]">
                <div className=" flex flex-row font-semibold px4 py-2  mb-2 bg-customSec text-lg rounded-md shadow-md drop-shadow-md">
                    <div className="basis-1/4 ps-2">TYPE</div>
                    <div className="basis-1/4">HOST</div>
                    <div className="basis-1/4">GUEST</div>
                    <button className="basis-1/4 text-center">ACTION</button>
                </div>
                <div className=" bg-customBg px-2 py-1 w-[600px] h-[80%] overflow-y-auto">
                
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
            </section>
            <Link href='/' className="mt-2 underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
            </div>
        )
    }

    return (
        <div className="mt-12 flex flex-col w-full items-center justify-center">

            <section className=" bg-customNeutral  p-8  text-white h-[500px]">
                <div className=" flex flex-row font-semibold px4 py-2  mb-2 bg-customSec text-lg rounded-md shadow-md drop-shadow-md">
                    <div className="basis-1/4 ps-2">TYPE</div>
                    <div className="basis-1/4">HOST</div>
                    <div className="basis-1/4">GUEST</div>
                    <button className="basis-1/4 text-center">ACTION</button>
                </div>
                <div className=" bg-customBg px-2 py-1 w-[600px] h-[80%] overflow-y-auto">                
                {loaderData.map((l,i) =>{
                    return (
                        <div key={i} 
                            style={{animationDelay: `${100*i}ms`}}
                            className={`flex flex-row bg-customSec mb-2 px-4 py-1 w-full h-[1.75rem] animate-pulse`}
                        >
                        </div>
                    )
                })}
            </div>
            </section>
            <Link href='/' className="mt-2 underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
            </div>
        // <div className="mt-12 flex flex-col w-full items-center justify-center">
        //      <div className='flex flex-row w-full bg-customSec mb-2 font-semibold px-4 py-2 text-lg'>
        //     <div className='basis-1/4 text-center'>TYPE</div>
        //     <div className='basis-1/4 text-center'>HOST</div>
        //     <div className='basis-1/4 text-center'>GUEST</div>
        //     <div className='basis-1/4 text-center'>ACTION</div>
        //   </div>
        //     <section className='w-[600px] bg-customBg px-4 py-2  text-white h-[400px] overflow-auto'>
         
        //     <div className="">
        //         {loaderData.map((l,i) =>{
        //             return (
        //                 <div key={i} 
        //                     style={{animationDelay: `${100*i}ms`}}
        //                     className={`flex flex-row bg-customSec mb-2 px-4 py-1 w-full h-[1.75rem] animate-pulse`}
        //                 >
        //                 </div>
        //             )
        //         })}
        //     </div>
        // </section>
        //     <Link href='/' className="underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
        //         Back to Home
        //     </Link>
        // </div>
    )
    
}