import { lobbyMessage } from "@/types";

interface MessagesProps {
    messages: lobbyMessage[];
    userId: string;
}

export default function Messages({messages, userId}: MessagesProps) {
    return (
        <ul className="h-[230px] overflow-auto text-black bg-customLight py-2 px-4 flex flex-col shadow-lg drop-shadow-lg rounded-md">
            {messages.map((m) => {
                const {sId, mId, text,} = m
                return (
                    <li key={mId} className={`bg-customSec text-white px-3 py-[2px] rounded-lg mb-2 ${userId === sId ? 'ms-auto text-right' : 'me-auto text-left'} shadow-md drop-shadow-md`}>
                        <div className="">
                            {text}
                        </div>
                        <div className="text-sm opacity-70">
                            {userId === sId ? 'you' : sId}
                        </div>                        
                    </li>
                )
            })}
        </ul>
    )
}