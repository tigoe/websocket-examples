/*
   A WebSocket server that uses Express.js for static pages.

   created 19 Sep 2020
   by Tom Igoe
*/

// require express.js, http, and ws:
const express = require('express');
const http = require('http');
let WebSocketServer = require('ws').Server;

// instantiate all three. Use express' httpServer instance
// to get the port for the webSocket server:
let server = express();
let httpServer = http.createServer(server);
let wss = new WebSocketServer({ server: httpServer });

// make all the files in 'public' available:
server.use(express.static("public"));

// make an array of websocket clients:
let clients = new Array;


// ------------------------ webSocket Server functions
// you have a new client:
function handleConnection(client, request) {
   console.log("New Connection");
   // add this client to the clients array
   clients.push(client);

   // if a client disconnects, delete them:
   function endClient() {
      // when a client closes its connection
      // get the client's position in the array
      // and delete it from the array:
      let position = clients.indexOf(client);
      clients.splice(position, 1);
      console.log("connection closed");
   }

   // if a client sends a message, print it out:
   function clientResponse(data) {
      // convert IPV6 address to IPv4:
      let addr = request.socket.remoteAddress.replace('::ffff:', '')
      console.log(addr + ': ' + data);
      broadcast(addr + ': ' + data);
   }

   // set up client event listeners:
   client.on('message', clientResponse);
   client.on('close', endClient);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
   // iterate over the array of clients & send data to each
   for (let c in clients) {
      clients[c].send(data);
   }
}

// start the servers listening:
const listener = httpServer.listen(8080, function () {
   console.log("Server is listening on port " + listener.address().port);
   // listen for webSocket connections:
   wss.on('connection', handleConnection);
});



