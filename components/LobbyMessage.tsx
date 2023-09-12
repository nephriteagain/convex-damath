import { lobbyMessage } from "@/types";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendLobbyMsg } from "@/redux/thunks";
import { Id } from "@/convex/_generated/dataModel";

import Messages from "./Messages";

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
        <form onSubmit={handleSubmit} className="my-4 grid w-full gap-2">
            <Input placeholder="Type your message here." 
                className="bg-customLight text-black border-none"
                type="text"
                value={message} 
                onChange={(e) => setMessage(e.currentTarget.value)}
            />
            <Button type="submit"
                className="bg-customSec hover:bg-customBg"
            >
                    send
            </Button>
        </form>        
        <Messages 
            messages={messages} 
            userId={userId} 
        />            
        </>
    )
}