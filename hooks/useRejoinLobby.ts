import { useAppDispatch } from "@/redux/hooks"
import { useEffect } from "react"
import { checkJoinedLobby } from "@/redux/thunks"

export function useRejoinLobby(id:string) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(checkJoinedLobby(id))
    }, [])
    return
}