//whenever a new game is created an object is created of this class
import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

type moveType = {
    from : string;
    to : string;
}


export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board : Chess;
    private moves : moveType[];
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
        
        if(this.moves.length%2 === 0 && socket !== this.player1){  //moves.length is 0, 2, 4 it is player1 turn and vice-versa
            console.log("its player 1 chance, player 2 moving")
            return; 
        }
        if(this.moves.length%2 === 1 && socket !== this.player2) {
            console.log('its player 2 chance, player 1 moving')
            return;
        }
        
        //validate the type of move ie make the move if it is correct move
        try{
            console.log(move)
            this.board.move(move)
        }catch(e){
            console.log("error while move:")
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
        if(this.moves.length % 2 === 0){  //if it was player1 turn, let his move known to player2 and vice-versa
            this.moves.push(move)
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }else{
            this.moves.push(move)
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
    }
}