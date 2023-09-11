import { lobbyMessage } from "@/types";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendLobbyMsg } from "@/redux/thunks";
import { Id } from "@/convex/_generated/dataModel";

interface LobbyMessageProps {
    messages: lobbyMessage[];
    _id: Id<'lobby'>
}
export default function LobbyMessage({messages, _id}: LobbyMessageProps) {
    const [message, setMessage] = useState('')
    
    const {id: userId} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        await dispatch(sendLobbyMsg({
            id: _id,
            sId: userId,
            text: message,
            messages,
        }))        
        setMessage('')
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="mt-4 grid w-full gap-2">
            <Input placeholder="Type your message here." 
                type="text"
                value={message} 
                onChange={(e) => setMessage(e.currentTarget.value)}
            />
            <Button type="submit">
                    send
            </Button>
        </form>        
        <ul className="h-[250px] overflow-auto text-white bg-gray-600 py-2 px-4 flex flex-col">
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
            
        </>
    )
}