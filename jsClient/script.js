/*
  WebSocket connection Script
  Uses standard W3C WebSocket API, not socket.io API
  Connects to a local websocket server

  created 7 Jan 2021
  modified 17 Jan 2021
  by Tom Igoe
*/
let serverURL;

let socket;
// variables for the DOM elements:
let incomingSpan;
let outgoingText;
let connectionSpan;
let connectButton;

function setup() {
  // get all the DOM elements that need listeners:
  incomingSpan = document.getElementById('incoming');
  outgoingText = document.getElementById('outgoing');
  connectionSpan = document.getElementById('connection');
  connectButton = document.getElementById('connectButton');
  // set the listeners:
  outgoingText.addEventListener('change', sendMessage);
  connectButton.addEventListener('click', changeConnection);
  serverURL = document.getElementById('serverURL').value;
  openSocket(serverURL);
}

function openSocket(url) {
  // open the socket:
  socket = new WebSocket(url);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', readIncomingMessage);
}


function changeConnection(event) {
  // open the connection if it's closed, or close it if open:
  if (socket.readyState === WebSocket.CLOSED) {
    openSocket(serverURL);
  } else {
    socket.close();
  }
}

function openConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "true";
  connectButton.value = "Disconnect";
}

function closeConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "false";
  connectButton.value = "Connect";
}

function readIncomingMessage(event) {
  // display the incoming message:
  incomingSpan.innerHTML = event.data;
}

function sendMessage() {
  //if the socket's open, send a message:
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(outgoingText.value);
  }
}

// add a listener for the page to load:
window.addEventListener('load', setup);