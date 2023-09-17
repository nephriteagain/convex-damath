import { Id } from "@/convex/_generated/dataModel";
import { lobbyMessage } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendGameMsg } from "@/redux/thunks";
import { useState, FormEvent, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
  import { Button } from "../ui/button";
  import { Input } from "../ui/input";

import Messages from "../common/Messages";
import LoadingSvg from "../common/LoadingSvg";

interface WatchMessageProps {
    messages: lobbyMessage[]
    _id: Id<'games'>
}

export default function GameMessage({messages, _id} : WatchMessageProps) {
    const [ message, setMessage ] = useState('')
    const [ readMsgCount, setReadMsgCount ] = useState(0)
    const [ isOpen, setIsOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const {id: userId} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (message.length === 0) return

        try {
            setLoading(true)
            await dispatch(sendGameMsg({
                id: _id,
                sId: userId,
                text: message,
                chat: messages
            }))
            setMessage('')
        } catch (error) {
            console.error('something went wrong')
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        if (isOpen) {
            setReadMsgCount(messages.length)
        }
    }, [messages])

    function getUnreadMsgCount() {
        if (messages.length - readMsgCount > 9) {
            return '9+'
        }
        if (messages.length === readMsgCount) {
            return null
        }
        return messages.length - readMsgCount
    }

    return (
        <Sheet onOpenChange={(open) => {
            setIsOpen(open)
            if (isOpen) {
                setReadMsgCount(messages.length)
            }
        }}>
            <SheetTrigger className="absolute top-2 right-4 bg-green-600 rounded-md text-lg text-white hover:bg-green-800 hover:scale-105 active:scale-100 transition-all duration-150">
                <div className="relative w-full h-full">
                 {  messages.length - readMsgCount > 0 &&
                 <div className="absolute -right-3 -top-3 w-6 aspect-square rounded-full bg-blue-300 animate-bounce">
                    {getUnreadMsgCount()}
                </div>
                }
                </div>
                <div className="mx-3 my-1"

                >
                    Open Chat
                </div>
            </SheetTrigger>
            <SheetContent className=" bg-customNeutral text-white">
            <form onSubmit={handleSubmit} className="my-4 grid w-full gap-2">
            <Input placeholder="Type your message here." 
                className="bg-customLight text-black border-none"
                type="text"
                value={message} 
                onChange={(e) => setMessage(e.currentTarget.value)}
            />
            <Button type="submit"
                className="relative bg-customSec hover:bg-customBg flex items-center justify-center disabled:opacity-50"
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
            </SheetContent>
        </Sheet>
    )
}