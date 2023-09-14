import Nums from "./Nums"

export default function Side({numArr}: {numArr:number[]}) {
    return (
        <>
        <div className="vertical-num absolute w-8 h-full -left-12 flex flex-col shadow-lg drop-shadow-lg">
            {numArr.map(n => {
                return <Nums number={n} key={n}/>            
            })}
        </div>
        <div className="horizontal-num absolute h-8 w-full -bottom-12 flex flex-row shadow-lg drop-shadow-lg">
            {numArr.map(n => {
                return <Nums number={n} key={n}/>            
            })}
        </div>      
        </>
    )
}