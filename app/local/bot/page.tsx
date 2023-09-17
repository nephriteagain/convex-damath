
import Link from "next/link"

export default function Page() {
    return (
        <div className="flex flex-col gap-4 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="font-semibold text-4xl">coming soon...</div>
            <Link href='/' className="select-none mx-auto w-fit underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
        </div>
    )
}