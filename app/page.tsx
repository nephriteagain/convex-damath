"use client"
import Link from "next/link"
import About from "@/components/game/About"
import RuleModal from "@/components/game/RuleModal"



export default function Home() {



  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-[200px] flex flex-col items-center justify-center gap-4 p-2">
            <Link href={'/lobby'} className="w-full text-center bg-customNeutral text-white text-2xl rounded-md shadow-lg drop-shadow-lg px-4 py-1 hover:scale-105 hover:bg-customSec hover:shadow-md hover:drop-shadow-md active:scale-100 transition-all duration-150">
                Lobbies
            </Link>
            <Link href={'/watch'} className="w-full text-center mb-4 bg-customNeutral text-white text-2xl rounded-md shadow-lg drop-shadow-lg px-4 py-1 hover:scale-105 hover:bg-customSec hover:shadow-md hover:drop-shadow-md active:scale-100 transition-all duration-150">
                Watch
            </Link>
            <RuleModal />
            <About />    
        </div>
      
      
    </main>
  )
}
