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

import { HiOutlineSortDescending, HiOutlineSortAscending } from 'react-icons/hi'
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function Filter({className}: {className?: string}) {
    const searchParams = useSearchParams()
    const order = searchParams.get('order')

    const path = usePathname()
    const [ selected, setSelected ] = useState<string|null>(order === 'asc' ? 'asc' : 'desc')
    const router = useRouter()

    function changeOrder(value: string) : void {
        const filter = searchParams.get('filter')
        if (filter) {            
            router.push(`${path}?filter=${filter}&order=${value}`)
            return
        }
        router.push(`${path}?order=${value}`)
        return
    }

    function changeFilter(value: string) : void {
        const order = searchParams.get('order')
        if (order) {
            router.push(`${path}?filter=${value}&order=${order}`)
            return
        }
        router.push(`${path}?filter=${value}`)
        return
    }
    
    return (
        <div className="flex flex-row gap-4">
            <Select onValueChange={(v) => changeFilter(v)}>
                <SelectTrigger className={`w-[100px] text-sm bg-customLight border-transparent ${className}`}>
                    <SelectValue 
                        placeholder="filter"
                    />
                </SelectTrigger>
                <SelectContent className={`bg-customLight transition-all duration-100 ${className}`}>
                    <SelectGroup>
                    <SelectLabel>variations</SelectLabel>
                    <SelectItem value="COUNTING">Counting</SelectItem>
                    <SelectItem value="WHOLE">Whole</SelectItem>
                    <SelectItem value="INTEGER">Integer</SelectItem>
                    <SelectItem value="">Remove Filter</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select  onValueChange={(v) => {
                setSelected(v)
                changeOrder(v)
            }}>
                <SelectTrigger className={`w-fit text-sm bg-customLight border-transparent ${className}`}>
                    <SelectValue 
                     onChange={(e) => console.log(e.currentTarget)}
                        defaultValue='desc' 
                        className="py-0"
                    >
                        {
                        selected === 'desc' ? 
                        <HiOutlineSortDescending /> :
                        <HiOutlineSortAscending />
                        }
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className={`bg-customLight ${className}`}>
                    <SelectGroup>
                    <SelectLabel>order</SelectLabel>
                    <SelectItem value="asc" >
                        <HiOutlineSortAscending />
                    </SelectItem>
                    <SelectItem value="desc" >
                        <HiOutlineSortDescending />
                    </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            
        </div>
    )
}