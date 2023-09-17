import BacktoHome from "@/components/common/BackToHome"
import { TbFaceIdError } from 'react-icons/tb'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-80%]">
            <TbFaceIdError className="text-6xl" />
            <p className='text-4xl font-bold text-customSec text-center'>
                Page Not Found
            </p>
            <BacktoHome />
        </div>
    )
}