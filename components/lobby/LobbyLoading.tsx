const loaderData = new Array(5).fill(true);
import Link from "next/link";
import BacktoHome from "../common/BackToHome";
export default function LobbyLoading({ opacity }: { opacity?: number }) {
    return (
        <div className="w-full h-full flex flex-col">
            <div
                className="flex flex-col mt-12 py-8 px-1  sm:p-8 h-[85%] sm:h-auto bg-customNeutral shadow-lg drop-shadow-lg mb-4 w-full sm:w-[640px] mx-auto"
                style={opacity ? { opacity: `${opacity}` } : { opacity: "1" }}
            >
                <div className="relative w-fit flex items-center justify-center px-3 py-1 text-white bg-green-600 mb-2 rounded-md shadow-md drop-shadow-md active:scale-100  disabled:opacity-40 disabled:cursor-progress transition-all duration-150">
                    loading...
                </div>
                <section className="w-full sm:max-w-[600px] bg-customBg px-0 sm:px-4 py-2  text-white h-[400px] overflow-y-auto">
                    <div className="select-none flex flex-row w-full bg-customSec mb-2 font-semibold  px-1 sm:px-4 py-2  text-base sm:text-lg ">
                        <div className="basis-1/4 text-center">TYPE</div>
                        <div className="basis-1/4 text-center">HOST</div>
                        <div className="basis-1/4 text-center">GUEST</div>
                        <div className="basis-1/4 text-center">ACTION</div>
                    </div>
                    <div className="h-full overflow-auto">
                        {loaderData.map((l, i) => {
                            return (
                                <div
                                    key={i}
                                    style={{ animationDelay: `${100 * i}ms` }}
                                    className={`flex flex-row bg-customSec mb-2 px-4 py-1 w-full h-[1.75rem] animate-pulse`}
                                ></div>
                            );
                        })}
                    </div>
                </section>
            </div>
            <BacktoHome />
        </div>
    );
}
