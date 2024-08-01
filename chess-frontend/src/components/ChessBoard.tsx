import { Color, PieceSymbol, Square } from "chess.js";

export default function ChessBoard({board}:{
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]
}){
    //array.map on 2D array
    return (
        <div className="">
            {board.map((row, i)=>{
                return <div key={i} className="flex">
                    {row.map((square, j)=>{
                        //console.log("square:", square)
                        return <div key={j} className={`w-16 h-16 ${(i+j)%2==0 ? 'bg-green-600' : 'bg-green-300'} flex justify-center items-center text-2xl font-bold ${square?.color === 'b' ? 'text-slate-950' : 'text-slate-50'} `}>
                            {square ? square.type.toUpperCase() : ""}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}