import { GameTypes } from "@/types";
import { Id } from "@/convex/_generated/dataModel";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { changeType } from "@/redux/thunks";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface GameTypeProps {
    host: string;
    gameType:
        | "COUNTING"
        | "INTEGER"
        | "WHOLE"
        | "FRACTION"
        | "RATIONAL"
        | "RADICAL";
    lobbyId: Id<"lobby">;
}

export default function GameType({ host, gameType, lobbyId }: GameTypeProps) {
    const dispatch = useAppDispatch();
    const { id } = useAppSelector((state) => state.user);

    if (host === id)
        return (
            <Select
                onValueChange={async (value) => {
                    const gameType = value as GameTypes;
                    await dispatch(changeType({ _id: lobbyId, gameType }));
                }}
                defaultValue={GameTypes.COUNTING}
            >
                <SelectTrigger className="text-white bg-customSec py-1 border-none outline-none">
                    <SelectValue placeholder={gameType} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={GameTypes.COUNTING}>COUNTING</SelectItem>
                    <SelectItem value={GameTypes.WHOLE}>WHOLE</SelectItem>
                    <SelectItem value={GameTypes.INTEGER}>INTEGER</SelectItem>
                    <SelectItem value={GameTypes.FRACTION}>FRACTION</SelectItem>
                    <SelectItem value={GameTypes.RATIONAL}>RATIONAL</SelectItem>
                    <SelectItem value={GameTypes.RADICAL}>RADICAL</SelectItem>
                </SelectContent>
            </Select>
        );

    return (
        <div className="bg-customSec w-fit text-white px-3 py-1 rounded-md shadow-md drop-shadow-md">
            {gameType}
        </div>
    );
}
