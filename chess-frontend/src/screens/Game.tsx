import ChessBoard from "../components/ChessBoard.tsx"
import { useSocket } from "../hooks/useSocket.ts"
import { Button } from "../components/Button.tsx";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";


export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export default function Game(){
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board()) //chess.board() return instantaneus chess board of current chess intance in the form of 2D array of objects
    // console.log(chess.ascii());
    // console.log(board)
    useEffect(()=>{
        if(!socket) return;

        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data)
            console.log(message)

            switch (message.type){
                case INIT_GAME:
                    setChess(new Chess())
                    setBoard(chess.board())
                    console.log("Game initialised")
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move)
                    setBoard(chess.board())
                    console.log("Move made")
                    console.log(chess.ascii())
                    break;
                case GAME_OVER:
                    console.log("Game over")
                    break;
            }
        }
    },[])



    if(!socket) return <div>Connecting...</div>
    return(
        <div className="flex justify-center bg-slate-900">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4 min-h-screen border-2 border-red-600">
                        <ChessBoard board={board}/>
                    </div>
                    <div className="col-span-2 border-2 border-green-50 bg-green-300">
                        <Button onClick={()=>{
                            socket.send(JSON.stringify({
                                type:INIT_GAME
                            }))
                        }}>PLAY</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}