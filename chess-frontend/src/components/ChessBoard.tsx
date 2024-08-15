import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import {MOVE} from "../screens/Game";

type setBoardType = React.Dispatch<React.SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][]>>

export default function ChessBoard({ chess, board, socket, setBoard}: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket : WebSocket;
    setBoard : setBoardType;
    chess : Chess;
}) {
    const [initial, setInitial] = useState<string | null>("");

    const move = (i:number, j:number) => {
        let position: string = String.fromCharCode(97+j) + (8-i).toString();
        if(!initial){
            setInitial(position)
            return
        }
        socket.send(JSON.stringify({
            type:MOVE,
            payload:{
                from:initial,
                to:position
            }
        }))
        console.log({
            from:initial,
            to:position
        })
        setInitial(null)
        //console.log(chess.ascii())
        chess.move({
            from:initial,
            to:position
        })
        //console.log(chess.ascii())
        setBoard(chess.board())
    }
    //array.map on 2D array
    return (
        <div className="">
            {board.map((row, i) => {
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        //console.log("square:", square)
                        return <div key={j} onClick={() => move(i,j)} className={`w-16 h-16 ${(i + j) % 2 == 0 ? 'bg-green-600' : 'bg-green-300'} flex justify-center items-center text-2xl font-bold ${square?.color === 'b' ? 'text-slate-950' : 'text-slate-50'} `}>
                            {square ? square.type.toUpperCase() : ""}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}