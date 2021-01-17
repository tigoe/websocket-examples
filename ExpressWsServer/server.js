/*
  Websocket server with express.js and express-ws.js
  (https://www.npmjs.com/package/express-ws)
  Serves an index page from /public. That page makes
  a websocket client back to this server.

  created 17 Jan 2021
  by Tom Igoe
*/


var express = require('express');			    // include express.js
// a local instance of express:
var server = express();
// instance of the websocket server:
var wsServer = require('express-ws')(server); 
// list of client connections:
var clients = new Array;

// serve static files from /public:
server.use('/', express.static('public')); 

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port ' + port);
}

function handleWs(ws, request) {
  console.log("New Connection");        // you have a new client
  clients.push(ws);    // add this client to the clients array

  function endClient() {
    // when a client closes its connection
    // get the client's position in the array
    // and delete it from the array:
    var position = clients.indexOf(ws);
    clients.splice(position, 1);
    console.log("connection closed");
  }

  // if a client sends a message, print it out:
  function clientResponse(data) {
    console.log(request.connection.remoteAddress + ': ' + data);
    broadcast(request.connection.remoteAddress + ': ' + data);
  }

  // set up client event listeners:
  ws.on('message', clientResponse);
  ws.on('close', endClient);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
  // iterate over the array of clients & send data to each
  for (c in clients) {
    clients[c].send(JSON.stringify(data));
  }
}

// start the server:
server.listen(process.env.PORT || 8080, serverStart);
// listen for websocket connections:
server.ws('/', handleWs);