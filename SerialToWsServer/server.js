/*
  Serial To Websocket server

  Expected command line invocation:
  node server.js portname linemode

  * portname is the serial port path
  * linemode is whether or not the program should parse for
  the newline character. 

  This server does not serve normal HTTP requests, only
  websocket requests.

  created 6 Oct 2016
  modified 26 Feb 2023
  by Tom Igoe
*/

// serial port initialization:
const SerialPort = require('serialport');  // include the serialport library
const portName = process.argv[2];          // get the port name from the command line
const lineMode = process.argv[3];          // t/f for readline parsing
// serial port config:
var portConfig = {
  baudRate: 9600
};

// open the serial port:
const myPort = new SerialPort(portName, portConfig);
// port open listener:
myPort.on('open', openPort);


// Web socket initialization:
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
// configure and initiate the webSocket server:
const wssPort = 8080;
const wss = new WebSocketServer({ port: wssPort }, startServer);

// server start callback function:
function startServer() {
  // listen for webSocket messages:
  wss.on('connection', connectClient);

  console.log('WebSocket server running.');
  console.log('port:' + wss.options.port);
}


// serial port start callback function:
function openPort() {
  // if the lineMode argument was given, use a readLine parser:
  if (lineMode) {
    // make a readLine parser:
    const parser = new SerialPort.parsers.Readline();
    // pipe the serial stream to the parser and start listening:
    myPort.pipe(parser);
    parser.on('data', listen);
  } else {
    // listen for raw serial data:
    myPort.on('data', listen);
  }

  console.log('Serial port: ' + myPort.path + ' open');
  console.log('baud rate: ' + myPort.baudRate);
  console.log('readLine mode: ' + lineMode);
}

//-------------- Serial port functions
function listen(data) {
  // send the serial data to each client:
  for (let thisClient of wss.clients) {
    // check if client is open:
    if (thisClient.readyState === WebSocket.OPEN) {
      thisClient.send(data.toString());
    }
  }
}

//-------------- webSocket connection callback function:
function connectClient(client) {
  // when a webSocket message comes in from this client:
  function readMessage(data) {
    console.log(data.toString());
  }

  // remove client when they disconnect:
  function removeClient(thisClient) {
    console.log('client disconnected');
  }

  // set up event listeners:
  client.on('message', readMessage);
  client.on('close', removeClient)
  // acknowledge new client:
  console.log("new client");
}