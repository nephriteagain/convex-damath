import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <Link href={'/lobby'} className="border-2 border-black px-2 py-1">
        Go to Lobbies
      </Link>
      <Link href={'/watch'} className="border-2 border-black px-2 py-1">
        Watch Games
      </Link>
    </main>
  )
}
