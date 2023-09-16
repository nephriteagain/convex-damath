
const loaderData = new Array(5).fill(true)
import Link from "next/link"
import Filter from "../common/Filter"

export default function WatchLoading({opacity}: {opacity?:number}) {
    return (
        <div className="flex flex-col w-full items-center justify-center">

            <section className="mt-12 w-full sm:w-auto bg-customNeutral p-1 sm:p-8 pt-4  text-white h-[500px]"
                style={opacity? {opacity: `${opacity}`} : {opacity: '1'}}                
            >
                <div className="flex flex-row justify-end">
                    <Filter className="text-black ms"/>
                </div>
                <div className=" flex flex-row font-semibold px-4 py-2  mb-2 bg-customSec  text-basis sm:text-lg rounded-md shadow-md drop-shadow-md">
                    <div className="basis-1/4 ps-2">TYPE</div>
                    <div className="basis-1/4">HOST</div>
                    <div className="basis-1/4">GUEST</div>
                    <button className="basis-1/4 text-center">ACTION</button>
                </div>
                <div className=" bg-customBg px-2 py-1 w-full sm:w-[600px] h-[80%] overflow-y-auto">                
                {loaderData.map((l,i) =>{
                    return (
                        <div key={i} 
                            style={{animationDelay: `${100*i}ms`}}
                            className={`flex flex-row bg-customSec mb-2 px-4 py-1 w-full h-[1.75rem] animate-pulse`}
                        >
                        </div>
                    )
                })}
            </div>
            </section>
            <Link href='/' className="mt-2 underline decoration-2 text-xl text-center hover:text-customSec transition-all duration-150">
                Back to Home
            </Link>
            </div>
    )
}