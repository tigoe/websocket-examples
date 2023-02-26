# Arduino WebSocket Client Example

This example creates a websocket connection to a websocket server.
To make it work, you'll need a server to connect to. Listed below are two
possible servers you could use. 

## Postman.com
[Postman](https://www.postman.com/) is a tool for testing various web protocols. It allows you to send all kinds of HTTP, WebSocket, RPC, etc. requests to test the responses a server would give. You can either make an account and use their browser interface or download their [desktop client](https://www.postman.com/downloads/).  Their [WebSocket echo server](https://blog.postman.com/introducing-postman-websocket-echo-service/) supports both the raw WebSocket protocol,  which this client uses, and some of the additions from the socket.io JavaScript library.

Here's an echo test with postman.com that will work with this example: 
```
// set up a WiFi client ( using SSL):
WiFiSSLClient wifi;
char serverAddress[] = "ws.postman-echo.com";
int port = 443;           // standard HTTPS port
char endpoint[] = "/raw";
````

## Websocketd

[Websocketd](http://websocketd.com/) is a command line application, available for MacOS, Windows, and
Linux, which creates a websocket server and connects it to another command line application. To make it work, you need to have a command line script or program which will listen and respond.

Here's a test with websocketd that will also work with this example: 
````
// settings for a local test with websocketd or your own server:
// set up a WiFi client (not using SSL):
// WiFiClient wifi;
// char serverAddress[] = "192.168.1.91"; // fill in your computer's IP address
// int port = 8080;        // port that websocketd is running on
// char endpoint[] = "/";  // you can also leave this blank for websocketd
````
Then on your computer, run [websocketd](http://websocketd.com/) like so:

````$ websocketd --port=8080 tee log.txt````

This will echo the output back to the client and send it to a file called log.txt

Both the Postman WebSocket echo server and the websocketd echo server will only send messages back to the client
that sends them. Neither will not broadcast to other clients. For a server
that will broadcast to all clients, you'll need to write your own. 
There is a [node.js example](https://github.com/tigoe/websocket-examples/blob/main/ExpressWsServer/server.js) in this repository
that will do that.
