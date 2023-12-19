export default function LocalTurn({ playerTurn }: { playerTurn: "x" | "z" }) {
    return (
        <div className="w-[95%] max-w-[450px] sm:w-[450px] bg-slate-300 mb-2 text-4xl text-center font-bold rounded-se-md rounded-ss-md shadow-md drop-shadow-lg">
            {playerTurn === "z" ? "Red Turn" : "Blue Turn"}
        </div>
    );
}
