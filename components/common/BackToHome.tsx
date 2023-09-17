import Link from "next/link"

export default function BacktoHome() {
    return (
        <Link href='/' className="select-none mx-auto w-fit underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
        </Link>
    )
}