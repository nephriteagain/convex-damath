import { players } from "@/types"

interface WatchTurnBarProps {
    players: players;
    playerTurn: string;
}

export default function WatchTurnBar({players, playerTurn}: WatchTurnBarProps) {
    function playerTurnHandler() : string {
        if (players.x === 'fake') {
            return 'Loading...'
        }
        if (players.x === playerTurn) {
            return 'Blue Turn'
        }
        if (players.z === playerTurn) {
            return 'Red Turn'
        }
        if (players.x !== playerTurn) {
            return 'Red Turn'
        }
        return 'Blue Turn'
    }

    return (
        <div className="w-[95%] sm:w-[500px] bg-slate-300 mb-2 text-4xl text-center font-bold rounded-se-md rounded-ss-md shadow-md drop-shadow-lg">
            {playerTurnHandler()}
        </div>
    )
}