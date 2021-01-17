/* 
   webSocket client using p5.js

   created 19 Sep 2020 
   by Tom Igoe
*/

// the web socket:
let socket;
// divs for local and remote messages:
let localDiv;
let remoteDiv;
// text to be sent out to the server:
let outputText = '';
// text for a blinking cursor
let cursor = '<span class="blinking">_</span>';

function setup() {
   // get the url that this page came from, then 
   // swap out http for ws and https for wss:
   let urlString = window.location.href.replace("https", "wss");
   urlString = urlString.replace("http", "ws");

   // make a websocket with the address:
   socket = new WebSocket(urlString);

   // make a remote div, and position it at 10,60:
   remoteDiv = createDiv();
   remoteDiv.position(10, 60);
   remoteDiv.style("color:#00ff00; font-family: monospace;");

   // make a local div and position it at 10, 10:
   localDiv = createDiv("local" + cursor);
   localDiv.position(10, 00);
   // fix its position so the other will scroll under it:
   localDiv.style("color:#00ff00; font-family: monospace; position: fixed; background: rgba(0, 0, 0, 1.0);");
   localDiv.size(300,60);

   // The socket connection needs two event listeners:
   socket.onopen = openSocket;
   socket.onmessage = showData;
}

// when you connect to the server, send a message:
function openSocket() {
   socket.send("Hello my friends");
}

// when you get a message from the server, display it:
function showData(result) {
   remoteDiv.html(remoteDiv.html() + result.data + '<br>');
}

// when character keys are typed, add them to the output text:
function keyTyped() {
   outputText += key;
   localDiv.html(outputText + cursor);
}

// when non-character keys are typed, deal with them:
function keyPressed() {
   switch (keyCode) {
      case RETURN:
         socket.send(outputText);
         outputText = '';
         break;
      case BACKSPACE:
         // TODO: fix on Firefox. It closes the window currently
         // delete the last character from outputText:
         outputText = outputText.slice(0, -1);
   }
   // update the local div:
   localDiv.html(outputText + cursor);
   // // scroll the remote text div if it's longer than the window:
    window.scrollTo(0, remoteDiv.elt.scrollHeight);
}
