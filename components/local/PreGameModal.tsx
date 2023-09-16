"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { changeGameType } from "@/redux/slices/localSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { Button } from "../ui/button"

export default function PreGameModal({hideModal}: {hideModal: () => void}) {

    const dispatch = useAppDispatch()

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-transparent z-30">
            <div className="w-full h-full bg-black opacity-50" />
            <div className="bg-customSec rounded-lg shadow-md drop-shadow-md w-[250px] h-[200px] flex flex-col items-center justify-center gap-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%]">
            <Select onValueChange={(v) => dispatch(changeGameType(v))}>
                <SelectTrigger className="w-[180px] bg-customLight border-transparent">
                    <SelectValue defaultValue={'COUNTING'} placeholder="select a game type" />
                </SelectTrigger>
                <SelectContent className="bg-customLight">
                    <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="COUNTING">Counting</SelectItem>
                    <SelectItem value="WHOLE">Whole</SelectItem>
                    <SelectItem value="INTEGER">Integer</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={hideModal}
                className="bg-customNeutral px-8 shadow-md drop-shadow-md"
            >
                Start
            </Button>
            </div>
        </div>
    )
}