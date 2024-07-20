//whenever a new game is created an object is created of this class
import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";



export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board : Chess;
    private moves : string[];
    private startTime : Date;

    constructor(player1:WebSocket, player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
        
    }
    
    makeMove(socket:WebSocket, move:{from:string, to:string}) {
        console.log(this.board.move.length)
        if(this.board.moves.length%2 === 0 && socket != this.player1) return; //0 is player1 and 1 is player2
        if(this.board.moves.length%2 === 1 && socket != this.player2) return;
        
        //validate the type of move
        try{
            this.board.move(move)
        }catch(e){
            console.log("error while move:", e)
            return;
        }
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload:{
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload:{
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return
        }
        if(this.board.moves.length % 2 === 0){
            this.player1.emit(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }else{
            this.player2.emit(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
    }
}