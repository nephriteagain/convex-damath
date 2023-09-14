import { lobbyMessage } from "@/types";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendLobbyMsg } from "@/redux/thunks";
import { Id } from "@/convex/_generated/dataModel";

import Messages from "../common/Messages";
import LoadingSvg from "../common/LoadingSvg";

interface LobbyMessageProps {
    messages: lobbyMessage[];
    _id: Id<'lobby'>
}
export default function LobbyMessage({messages, _id}: LobbyMessageProps) {
    const [message, setMessage] = useState('')
    const [loading, setLoading ] = useState(false)
    
    const {id: userId} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        try {
            setLoading(true)
            await dispatch(sendLobbyMsg({
                id: _id,
                sId: userId,
                text: message,
                messages,
            }))    
            setMessage('')
        } catch (error) {
            console.error('something went wrong')                
        } finally {
            setLoading(false)
        }
        
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
                className="relative bg-customSec hover:bg-customBg flex items-center justify-center disabled:opacity-50"
                disabled={loading}
            >       
                { loading && <LoadingSvg
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                width={24}
                height={24}
                />}
                <p className={loading ? 'invisible' : 'visible'}>
                    send
                </p>
            </Button>
        </form>        
        <Messages 
            messages={messages} 
            userId={userId} 
        />            
        </>
    )
}