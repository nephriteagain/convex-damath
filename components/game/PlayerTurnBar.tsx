import { useAppSelector } from "@/redux/hooks";

export default function PlayerTurnBar() {
    const { id } = useAppSelector((state) => state.user);
    const gameData = useAppSelector((state) => state.game.gameData);

    return (
        <div className="select-none  w-[95%] max-w-[450px] sm:w-[450px] bg-slate-300 mb-2 text-4xl text-center font-bold rounded-se-md rounded-ss-md shadow-md drop-shadow-lg">
            {gameData?.playerTurn === id ? "Your Turn" : "Opponent's Turn"}
        </div>
    );
}
