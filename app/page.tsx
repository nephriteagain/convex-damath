import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-2">
      <Link href={'/lobby'} className="bg-green-600 text-white text-2xl rounded-xl shadow-lg drop-shadow-lg px-4 py-1 hover:scale-105 hover:bg-green-800 hover:shadow-xl hover:drop-shadow-xl active:scale-100 transition-all duration-150">
        Go to Lobbies
      </Link>
      <Link href={'/watch'} className="bg-green-600 text-white text-2xl rounded-xl shadow-lg drop-shadow-lg px-4 py-1 hover:scale-105 hover:bg-green-800 hover:shadow-xl hover:drop-shadow-xl active:scale-100 transition-all duration-150">
        Watch Games
      </Link>
    </main>
  )
}
