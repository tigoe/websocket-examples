# Websocket Examples

[Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) are an extension to the HTTP specification that support full duplex, aka two-way, session-based communication between client and server. A standard HTTP exchange between client and server is initiated by a client request. The server, on receiving the request, sends back a response, then closes the connection between the two. The server can't initiate an exchange, and communication can't go both directions at once. Websockets expand on HTTP by allowing for both of these features. 

A websocket connection works as follows: the client request via HTTP or HTTPS. The server responds with an upgrade message and sends a key for encryption. The client responds, the server opens an encrypted socket between the two. Either side can send a message at any time, and either side can close the connection. The protocol supports a message event, for when a new message arrives. and a close event, for when the remote host closes the connection. 

These examples use two different server-side websocket libraries, [ws](https://www.npmjs.com/package/ws) and [express-ws](https://www.npmjs.com/package/express-ws). The latter is just like the former, but integrates better with express.js, so you can just declare the websocket connection as a route. 

## Servers
* [ExpressWsServer](ExpressWsServer/) - a server example using [express-ws](https://www.npmjs.com/package/express-ws) and [express.js](https://expressjs.com/). 
* [wsServerExample](wsServerExample/) - a server example using [ws](https://www.npmjs.com/package/ws) - a server example using ws and [express.js](https://expressjs.com/)

## Clients
These clients are duplicated in the `public` directory of each of the servers
* [wsClientExample](wsClientExample/) - a node.js command-line client
* [jsClient](jsClient/) - a browser-based example in native JavaScript
* [p5jsClient](p5jsClient/) - a browser-based example in p5.js
* [ArduinoWebsocketClient](ArduinoWebsocketClient/) - an Arduino client using the ArduinoHttpClient library




