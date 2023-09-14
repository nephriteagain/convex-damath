import { score } from "@/types"

interface ScoresProps {
    score: score;
    className?: string
}


export default function Scores({score, className}: ScoresProps) {

    return (
        <section className={`w-[500px] flex flex-row bg-stone-300 text-xl font-semibold items-center justify-between px-4 py-2 mb-2 rounded-sm shadow-sm drop-shadow-sm ${className}`}>
            <div className="text-red-600 border-white border-2 px-2 py-1 shadow-sm drop-shadow-md">
                Red: {score?.z ?? 0}
            </div>
            <div className="font-bold text-xl">SCORES</div>
            <div className="text-blue-600 border-white border-2 px-2 py-1 shadow-sm drop-shadow-md">
                Blue: {score?.x ?? 0}
            </div>
        </section>
    )
}