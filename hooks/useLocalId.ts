import { useLayoutEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { getLocalId } from "@/redux/slices/userSlice";
import { checkJoinedLobby } from "@/redux/thunks";
/**
 * gets local id from localstorage and
 * checks if there is previously joined
 * room
 */
export function useLocalId(id:string) {
    const [ res, setRes ] = useState(id)

    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        const localId = localStorage.getItem('localId')
        if (typeof localId === 'string') {
            setRes(localId)
            dispatch(getLocalId(localId))
            dispatch(checkJoinedLobby(localId))
            return
        }
        localStorage.setItem('localId', id)
    
    }, [])
    return res

}