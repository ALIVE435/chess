import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";


export class GameManager {
    private games: Game[];           //list of objects of Game class (list of all games)
    private pendingUser : WebSocket | null;
    private users: WebSocket[];      //maintaining list of users
    private pendingToken : string | null;
    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.pendingToken = null;
        this.users = []
    }
    addUser(socket:WebSocket, token:string){    //anytime a new user joins in, add it into users
        //console.log(socket)
        this.users.push(socket);
        this.addHandler(socket, token)
    }
    removeUser(socket:WebSocket){
        this.users = this.users.filter(user => user !== socket)
        //stop the game here because the user left
    }
    handleMessage(data:any, socket:WebSocket, token:string){
        const message = JSON.parse(data.toString());
        console.log(token)
        if(message.type === INIT_GAME) {
            if(this.pendingUser && this.pendingUser !== socket){
                //start a game
                const game = new Game(this.pendingUser, socket, this.pendingToken, token);
                this.games.push(game);
                this.pendingUser = null;
                this.pendingToken = null;
            }
            else{
                this.pendingUser = socket; //await him
                this.pendingToken = token;
                socket.send(JSON.stringify("no user found, please wait"))
            }
        }
        if(message.type === MOVE ){
            //find that specific game and handle the move
            console.log(message)
            const game:Game | undefined = this.games.find((game:Game) => (game.player1 === socket || game.player2 === socket));
            if(game){
                console.log("game is initialised")
                game.makeMove(socket, message.payload)
            }
        }
    }
    private addHandler(socket:WebSocket, token:string){
        socket.on("message",(data)=>this.handleMessage(data, socket, token))
    }
}