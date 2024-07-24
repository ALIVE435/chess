import { Color, PieceSymbol, Square } from "chess.js";

export default function ChessBoard({board}:{
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]
}){
    return (
        <div className="text-white">
            {board.map((row, i)=>{
                return <div key={i} className="flex">
                    {row.map((square, j)=>{
                        console.log("square:", square)
                        return <div key={j} className={`w-8 h-8 ${(i+j)%2==0 ? 'bg-green-950' : 'bg-green-300'} text-center`}>
                            {square ? square.type : ""}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}