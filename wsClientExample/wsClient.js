/*
	A minimal websocket client for node.js. This client 
	attempts to connect to a websocker server running on port
	8080. When it connects, it listens to the command line
	input and sends whatever text it receives there. 
	It also prints out any incominb messages from the websocket 
	server.

	created 17 Jan 2021
	modified 23 Feb 2023
	by Tom Igoe
*/

var WebSocket = require('ws');
var stdin = process.openStdin();	// enable input from the keyboard
stdin.setEncoding('utf8');			  // encode everything typed as a string

var ws = new WebSocket('ws://localhost:8080/');

ws.on('open', function open() {
	// this function runs if there's input from the keyboard.
	// you need to hit enter to generate this event.
	function sendMessage(data) {
		data = data.trim();
		ws.send(data);
	}
  stdin.on('data', sendMessage);
	ws.send('Hello');
});

ws.on('error', function(error) {
	console.log(error);
});

ws.on('message', function(data, flags) {
	console.log('Server said: ' + data);	// print the message
});
