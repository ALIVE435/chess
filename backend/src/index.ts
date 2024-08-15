import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });
let cnt = 0;
const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
  console.log("connection established", cnt++)
  gameManager.addUser(ws);

  ws.on('disconnect', function() {
    gameManager.removeUser(ws)
  });

});