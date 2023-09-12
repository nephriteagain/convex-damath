import { lobbyMessage } from "@/types";

interface MessagesProps {
    messages: lobbyMessage[];
    userId: string;
}

export default function Messages({messages, userId}: MessagesProps) {
    return (
        <ul className="h-[230px] overflow-auto text-white bg-customBg py-2 px-4 flex flex-col shadow-lg drop-shadow-lg">
            {messages.map((m) => {
                const {sId, mId, text,} = m
                return (
                    <li key={mId} className={`mb-2 ${userId === sId ? 'ms-auto text-right' : 'me-auto text-left'}`}>
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