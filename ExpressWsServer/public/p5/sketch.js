/*
	p5.js websocket client
	makes a websocket client connection to a websocket server.
	Listens for messages from the server. 
  
  This won't work on editor.p5.js unless you modify
  the websocket server address. 
  
  created 12 Apr 2021
  modified 12 Nov 2021
  by Tom Igoe
*/

// change 'wss' to 'ws' for running without SSL):
let socket = new WebSocket('wss://' + window.location.host);
let sensorData = 'not connected'; 
let xPos = 10;
let textDiv;

function setup() {
	// The socket connection needs two event listeners:
	socket.onopen = openSocket;
	socket.onmessage = getData;
  
	// make a new div and position it at 10, 50:
	textDiv = createDiv("Sensor reading:");
	textDiv.position(10,50);
}

function draw() {
  textDiv.html(sensorData);
  textDiv.position(xPos, 50);        // position the text
 }

function openSocket() {
	sensorData = "Socket open";
}
/*
getData(), below, will get called whenever there is new data
from the server:
*/
function getData(result) {
	// when you get some data, put it in sensorData:
  sensorData = result.data;
  // parse it to see if it's valid JSON:
  let incoming = JSON.parse(sensorData);
  // if it is, get the sensor value for the X position
	xPos = int(incoming.sensor);
}