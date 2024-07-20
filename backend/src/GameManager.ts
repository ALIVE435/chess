import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {
    private games: Game[];           //list of objects of Game class (list of all games)
    private pendingUser : WebSocket | null;
    private users: WebSocket[];      //maintaining list of users

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = []
    }
    addUser(socket:WebSocket){    //anytime a new user joins in, add it into users
        this.users.push(socket);
        this.addHandler(socket)

    }
    removeUser(socket:WebSocket){
        this.users = this.users.filter(user => user != socket)
        //stop the game here because the user left
    }
    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString());
            if(message.type == INIT_GAME) {
                if(this.pendingUser){
                    //start a game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else{
                    this.pendingUser = socket; //await him
                }
            }
            if(message.type == MOVE ){
                //find that specific game and handle the move
                const game:Game | undefined = this.games.find((game:Game) => (game.player1 == socket || game.player2 == socket));
                if(game){
                    game.makeMove(socket, message.move)
                }
            }
        })
    }
}