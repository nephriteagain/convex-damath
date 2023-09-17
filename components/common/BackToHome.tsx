import Link from "next/link"

export default function BacktoHome({onClick}: {onClick?: () => void}) {
    return (
        <Link href='/' className="select-none mx-auto w-fit underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150"
            onClick={onClick != undefined ?  onClick : undefined}
        >
                Back to Home
        </Link>
    )
}