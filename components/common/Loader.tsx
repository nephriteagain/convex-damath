
const load = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.']
export default function Loader() {
    return (
        <div className="w-[100vw] h-[100vh] fixed bg-customBg text-3xl text-customLight flex items-center justify-center">
            {load.map((d,i) => <span key={i} className="mx-1 animate-load" style={{animationDelay: `${200*i}ms`}} >{d}</span>)}
        </div>
    )
}