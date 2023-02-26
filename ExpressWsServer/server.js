/*
  Websocket server with express.js
    (https://www.npmjs.com/package/express) and ws.js
  (https://www.npmjs.com/package/ws)
  Serves an index page from /public. That page makes
  a websocket client back to this server.

  created 17 Jan 2021
  modified 23 Feb 2023
  by Tom Igoe
*/
// include express, http, and ws libraries:
const express = require("express");
const {createServer} = require("http");
const {WebSocketServer} = require("ws");
// make an instance of express:
const app = express();
// serve static content from the project's public folder:
app.use(express.static("public"));
// make an instance of http server using express instance:
const server = createServer(app);
// WebSocketServer needs the http server instance:
const wss = new WebSocketServer({ server });
// list of client connections:
var clients = new Array();

// this runs after the http server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log("Server listening on port " + port);
}

// this handles websocket connections:
function handleClient(thisClient, request) {
  // you have a new client
  console.log("New Connection"); 
  // add this client to the clients array

  clients.push(thisClient); 
  
  function endClient() {
    // when a client closes its connection
    // get the client's position in the array
    // and delete it from the array:
    var position = clients.indexOf(thisClient);
    clients.splice(position, 1);
    console.log("connection closed");
  }

  // if a client sends a message, print it out:
  function clientResponse(data) {
    console.log(data.toString());
    broadcast(data.toString());
  }

  // This function broadcasts messages to all webSocket clients
  function broadcast(data) {
    // iterate over the array of clients & send data to each
    for (let c in clients) {
      clients[c].send(data);
    }
  }

  // set up client event listeners:
  thisClient.on("message", clientResponse);
  thisClient.on("close", endClient);
}

// start the server:
server.listen(process.env.PORT || 3000, serverStart);
// start the websocket server listening for clients:
wss.on("connection", handleClient);
