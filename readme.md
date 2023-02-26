# WebSocket Examples

[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) are an extension to the HTTP specification that support full duplex, aka two-way, session-based communication between client and server. A standard HTTP exchange between client and server is initiated by a client request. The server, on receiving the request, sends back a response, then closes the connection between the two. The server can't initiate an exchange, and communication can't go both directions at once. WebSockets expand on HTTP by allowing for both of these features. 

A WebSocket connection works as follows: the client request via HTTP or HTTPS. The server responds with an upgrade message and sends a key for encryption. The client responds, the server opens an encrypted socket between the two. Either side can send a message at any time, and either side can close the connection. The protocol supports a `message` event, for when a new message arrives. and a `close` event, for when the remote host closes the connection. 

WebSockets bear some resemblance to MQTT, a message-based protocol for communication between low-power networked devices. Here is a [comparison between the two](https://tigoe.github.io/mqtt-examples/mqtt-vs-websockets.html). 

## Clients
These clients can be used with the [ExpressWsServer]({{site.codeurl}}ExpressWsServer/) as well as on their own, connecting to a different server (see Testing Servers, below). A version of the jsClient is included in the ExpressWsServer directory.

* [wsClientExample](https://github.com/tigoe/websocket-examples/tree/main/wsClientExample/) - a node.js command-line client. This client attempts to connect to a WebSocket server on port 8080, and then listens to the command line input for text to send. 
* [jsClient](jsClient/) - a browser-based example in native JavaScript ([source code link]({{site.codeurl}}jsClient/))
* [p5jsClient](p5jsClient/) - a browser-based example in p5.js ([source code link]({{site.codeurl}}p5jsClient/))
* [ArduinoWebsocketClient]({{site.codeurl}/ArduinoWebsocketClient/) - an Arduino client using the ArduinoHttpClient library. It can connect to any of the servers in this repository.

## Testing Servers
To test a WebSocket client, you need a WebSocket server. If you don't want to write your own, here are two options:

### Postman.com's Websocket Echo Server
[Postman](https://www.postman.com/) is a tool for testing various web protocols. It allows you to send all kinds of HTTP, WebSocket, RPC, etc. requests to test the responses a server would give. You can either make an account and use their browser interface or download their [desktop client](https://www.postman.com/downloads/).  Their [WebSocket echo server](https://blog.postman.com/introducing-postman-websocket-echo-service/) supports both the raw WebSocket protocol and some of the additions from the socket.io JavaScript library. It's a useful echo server to test clients on.

### Websocketd
[Websocketd](http://websocketd.com/) is a command line application, available for MacOS, Windows, and
Linux, which creates a WebSocket server and connects it to another command line application. To make it work, you need to have a command line script or program which will listen and respond. The websocketd examples show how to write a simple command line script to respond. You could write something more complex in node.js, python, etc. or you could use the command line program `tee` to echo the response back to the client and save to a local file, like so:

````
$ websocketd --port=8080 tee log.txt
````
Both the Postman WebSocket echo server and the websocketd echo server will only send messages back to the client
that sends them. Neither will not broadcast to other clients. For a server that will broadcast to all clients, you'll need to write your own. There are a couple of node.js examples below.

## Servers

These examples the server-side WebSocket library, [ws](https://www.npmjs.com/package/ws). 

* [wsServerExample](https://github.com/tigoe/websocket-examples/tree/main/wsServerExample/) - a server example using [ws](https://www.npmjs.com/package/ws). This example does not serve HTTP requests, just WebSocket connections
* [ExpressWsServer](https://github.com/tigoe/websocket-examples/tree/main/ExpressWsServer/) - a server example using [express.js](https://expressjs.com/) and [ws](https://www.npmjs.com/package/ws). This example serves both normal HTTP requests for static pages, and WebSocket requests. 
* [SerialToWsServer](https://github.com/tigoe/websocket-examples/tree/main/SerialToWsServer/) - a connector between the local serial port and a WebSocket server. This server can send serial data byte-by-byte to the WebSocket clients, or it can read ASCII-encoded text line-by-line. This does not include code to serve HTTP requests, just WebSocket connections. 

### Running the Servers
To get the servers below working, you'll need [node.js](https://www.nodejs.org) installed. Once you have that,  download the repository, then, on the command line, change directories into the directory of each server example. Once you're there, install the libraries using npm, the node package manager, like so:

````sh
$ npm install
````
This will download the necessary libraries. Then run the server like so:
````sh
node server.js
````

The  server `ExpressWsServer` is an HTTP server that also support WebSockets. When you're running it, open a browser and enter `http://localhost:3000/` in the address bar. The server script will serve you the `index.html` page in the `public` folder, which is a browser-based client of the server. You can also load the [jsClient](jsClient) example by opening the `index.html` page from that example in a browser. It will connect to the server running on your terminal window as well. 

To stop any node.js script, type control-C in the terminal window. 


The `WsServerExample` does not have a HTTP server included in it, it is just a WebSocket server. You can run it the same way as the others, but only the Arduino example of an HTML file opened from the local filesystem can connect to it. The server will not serve an HTML page itself. 