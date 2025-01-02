import WebSocket, { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import express from "express";
import { createClient } from "redis";
import { v4 as uuidv4 } from 'uuid';



const app = express();

const server = app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

const wss = new WebSocketServer({ server });
const gameManager = new GameManager();
let connections: Record<string, WebSocket> = {};

// const redisClient = createClient();
// redisClient.connect();

wss.on("connection", function connection(ws: WebSocket, req) {
  const token = uuidv4();
  connections[token] = ws;
  console.log("connected")
  // Add user to the game manager
  gameManager.addUser(ws, token);
  //set the token in request cookie on handshake for user to fetch cached moves
  // Handle WebSocket disconnection
  ws.on("close", async () => {

    // Remove user from GameManager
    gameManager.removeUser(ws);

  });
});



//both http and websocket running on same port
//https://www.geeksforgeeks.org/what-is-guid/