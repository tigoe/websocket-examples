/*
	p5.js websocket client
	makes a websocket client connection to a websocket server.
	Listens for messages from the server. 

*/

let socket;
let input, text, serverURL, connectButton, sendButton;

function setup() {
	// make an input for the server URL:
	let urlLabel = createSpan("server address:");
	urlLabel.position(10, 210);
	serverURL = createInput("ws://localhost:8080");
	serverURL.position(120, 210);
	// make a connect button:
	connectButton = createButton("connect");
	connectButton.position(300, 210);
	connectButton.mousePressed(connectToServer);

	// make an input for outgoing text:
	let inputLabel = createSpan("Text to send:");
	inputLabel.position(10, 240);
	input = createInput();
	input.position(120, 240);
	// make a send button:
	sendButton = createButton("send");
	sendButton.position(300, 240);
	sendButton.mousePressed(sendText);

	// make a div for incoming text:
	text = createDiv("Incoming text will go here");
	text.position(10, 280);
}

function connectToServer() {
	socket = new WebSocket(serverURL.value());
	// The socket connection needs two event listeners:
	socket.onopen = openSocket;
	socket.onmessage = showData;
}

function openSocket() {
	text.html("Socket open");
}
/*
showData(), below, will get called whenever there is new data
from the server. So there's no need for a draw() function:
*/
function showData(result) {
	// when the server returns, show the result in the div:
	text.html("Received:" + result.data);
}

// This function sends text to the server:
function sendText() {
	socket.send(input.value());
}
