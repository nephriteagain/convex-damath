import Link from "next/link"
import { TbFaceIdError } from 'react-icons/tb'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-80%]">
            <TbFaceIdError className="text-6xl" />
            <p className='text-4xl font-bold text-customSec'>
                Page Not Found
            </p>
            <Link href='/' className="select-none mx-auto w-fit underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
        </div>
    )
}