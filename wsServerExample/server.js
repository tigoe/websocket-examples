/*
WebSocket server example

This server does not serve any HTML, or respond to
HTTP requests, only websocket requests. 

created 11 Nov 2017
modified 26 Feb 2023
by Tom Igoe
*/
var WebSocketServer = require('ws').Server;   // webSocket library

// configure the webSocket server:
const wssPort = process.env.PORT || 8080;             // port number for the webSocket server
const wss = new WebSocketServer({port: wssPort}); // the webSocket server
var clients = new Array;         // list of client connections


// ------------------------ webSocket Server functions
function handleConnection(client, request) {
	console.log("New Connection");        // you have a new client
	clients.push(client);    // add this client to the clients array

	function endClient() {
		// when a client closes its connection
		// get the client's position in the array
		// and delete it from the array:
		var position = clients.indexOf(client);
		clients.splice(position, 1);
		console.log("connection closed");
	}

	// if a client sends a message, print it out:
	function clientResponse(data) {
		console.log(request.connection.remoteAddress + ': ' + data);
		broadcast(request.connection.remoteAddress + ': ' + data);
	}

	// set up client event listeners:
	client.on('message', clientResponse);
	client.on('close', endClient);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
	// iterate over the array of clients & send data to each
	for (c in clients) {
		clients[c].send(JSON.stringify(data));
	}
}

// listen for clients and handle them:
wss.on('connection', handleConnection);
