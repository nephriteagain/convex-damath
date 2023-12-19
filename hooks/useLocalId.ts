import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { getLocalId } from "@/redux/slices/userSlice";
import { checkJoinedLobby } from "@/redux/thunks";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";

/**
 * gets local id from localstorage and
 * checks if there is previously joined
 * room
 */
export  function useLocalId(id: string) {
    const [res, setRes] = useState(id);

    const dispatch = useAppDispatch();

    async function fetchUser() {
        const localId = localStorage.getItem("localId");
        if (typeof localId === "string") {
            setRes(localId);
            dispatch(getLocalId(localId));
            dispatch(checkJoinedLobby(localId));
            return;
        }
        const newId = await convex.mutation(api.user.createUser)
        localStorage.setItem("localId", newId)
    }

    useEffect(() => {
        fetchUser()
    }, []);
    return res;
}
