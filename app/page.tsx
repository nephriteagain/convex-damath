"use client";
import Link from "next/link";
import About from "@/components/game/About";
import RuleModal from "@/components/game/RuleModal";
import Local from "@/components/local/Local";
import Progress from "@/components/common/Progress";

import { useState } from "react";

export default function Home() {
    const [start, setStart] = useState(false);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-3xl sm:text-5xl font-bold border-4 border-dashed p-4">
                <span className="me-4 text-red-800">Damath</span>
                <span className="text-blue-800">Online</span>
            </h1>
            <div className="w-[200px] flex flex-col items-center justify-center gap-4 p-2">
                <Link
                    href={"/lobby"}
                    className="w-full text-center bg-customNeutral text-white text-2xl rounded-md shadow-lg drop-shadow-lg px-4 py-1 hover:scale-105 hover:bg-customSec hover:shadow-md hover:drop-shadow-md active:scale-100 transition-all duration-150"
                    onClick={() => setStart(true)}
                >
                    Lobbies
                </Link>
                <Local />
                <Link
                    href={"/watch"}
                    className="w-full text-center mb-4 bg-customNeutral text-white text-2xl rounded-md shadow-lg drop-shadow-lg px-4 py-1 hover:scale-105 hover:bg-customSec hover:shadow-md hover:drop-shadow-md active:scale-100 transition-all duration-150"
                    onClick={() => setStart(true)}
                >
                    Watch
                </Link>

                <RuleModal />
                <About />
            </div>

            <Progress start={start} />
        </main>
    );
}
