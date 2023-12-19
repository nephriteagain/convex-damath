import { score } from "@/types";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import { playerLeft } from "@/redux/slices/gameSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";

export default function WinnerModal({
    totalScores,
    setShowWinnerModal,
}: {
    totalScores: score;
    setShowWinnerModal: Dispatch<SetStateAction<boolean>>;
}) {
    const router = useRouter();

    function redirectToLobby() {
        router.push("/lobby");
    }

    const dispatch = useAppDispatch();
    const delayedRedirect = debounce(redirectToLobby, 3000);

    function handleLeave() {
        dispatch(playerLeft());
        delayedRedirect();
    }

    function toggleModal(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.target !== e.currentTarget) {
            return;
        }
        setShowWinnerModal((bool) => !bool);
    }

    return (
        <div className="fixed w-[100vw] h-[100vh] bg-transparent z-30 text-white">
            <div
                className="w-full h-full bg-customBg opacity-50 z-40"
                onClick={(e) => toggleModal(e)}
            />
            <div className="bg-customSec absolute w-[280px] h-[200px] flex flex-col items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%] z-50 shadow-lg drop-shadow-lg">
                <div className="text-2xl font-bold">
                    {totalScores.z > totalScores.x
                        ? "RED WIN!"
                        : totalScores.x > totalScores.z
                          ? "BLUE WIN!"
                          : "DRAW!"}
                </div>
                <div className="text-lg font-semibold">
                    <div>RED TOTAL: {totalScores.z}</div>
                    <div>BLUE TOTAL: {totalScores.x}</div>
                </div>
                <div>
                    <Button
                        className="bg-customNeutral mt-4 shadow-md drop-shadow-md px-4"
                        onClick={(e) => {
                            toggleModal(e);
                            handleLeave();
                        }}
                    >
                        CLOSE
                    </Button>
                </div>
            </div>
        </div>
    );
}
