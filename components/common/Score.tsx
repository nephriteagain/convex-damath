import { score } from "@/types"

interface ScoresProps {
    score: score;
    className?: string
}


export default function Scores({score, className}: ScoresProps) {

    return (
        <section className={`select-none w-[95%] max-w-[450px] sm:w-[450px] flex flex-row bg-stone-300 text-lg sm:text-xl font-semibold items-center justify-between px-4 py-2 mb-2 rounded-sm shadow-sm drop-shadow-sm ${className}`}>
            <div className="text-red-600 border-white border-2 px-2 py-1 shadow-sm drop-shadow-md text-center">
                Red: {score?.z ?? 0}
            </div>
            <div className="font-bold text-xl">SCORES</div>
            <div className="text-blue-600 border-white border-2 px-2 py-1 shadow-sm drop-shadow-md text-center">
                Blue: {score?.x ?? 0}
            </div>
        </section>
    )
}