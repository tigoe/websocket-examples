/*
  WebSocket client for ArduinoHttpClient library
  Connects to the WebSocket server, reads a sensor once
  every five seconds, and sends a message with the reading.
  Based on Sandeep Mistry's SimpleWebSocket example.
  Uses the following libraries:
  http://librarymanager/All#ArduinoHttpClient.h
  http://librarymanager/All#WiFiNINA.h  for Nano 33 IoT, MKR1010
  or
  http://librarymanager/All#WiFi101.h  for MKR1000
  
  for more detail see the readme.md page. 
  
  created 11 Nov 2021
  updated 26 Feb 2023
  by Tom Igoe
*/

#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>  // use this for MKR1010 and Nano 33 IoT
//#include <WiFi101.h>    // use this for MKR1000
// your passwords go in arduino_secrets.h
#include "arduino_secrets.h"

// settings for a local test with websocketd or your own server:
// set up a WiFi client (not using SSL):
// WiFiClient wifi;
// char serverAddress[] = "192.168.1.91"; // fill in your computer's IP address
// int port = 8080;        // port that websocketd is running on
// char endpoint[] = "/";  // you can also leave this blank for websocketd

// settings for a test on postman.com's websocket echo server
// set up a WiFi client ( using SSL):
WiFiSSLClient wifi;
char serverAddress[] = "ws.postman-echo.com";
int port = 443;           // standard HTTPS port
char endpoint[] = "/raw";

// initialize the webSocket client
WebSocketClient client = WebSocketClient(wifi, serverAddress, port);
// message sending interval, in ms:
int interval = 5000;
// last time a message was sent, in ms:
long lastSend = 0;

void setup() {
  Serial.begin(9600);
  if (!Serial) delay(3000);

  // connect to WIFi:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(SECRET_SSID);
    // Connect to WPA/WPA2 network:
    WiFi.begin(SECRET_SSID, SECRET_PASS);
  }

  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  // If there's an API endpoint to connect to, add it here.
  // leave blank if there's no endpoint:
  client.begin(endpoint);
}

void loop() {
  // if not connected to the socket server, try to connect:
  if (!client.connected()) {
    client.begin();
    delay(1000);
    Serial.println("attempting to connect to server");
    // skip the rest of the loop:
    return;
  }

  if (millis() - lastSend > interval) {
    // read sensor:
    int sensor = analogRead(A0);
    // format the message as JSON string:
    String message = "{\"sensor\": READING}";
    // replace READING with the reading:
    message.replace("READING", String(sensor));
    // send the message:
    client.beginMessage(TYPE_TEXT);
    client.print(message);
    client.endMessage();
    Serial.print("sending: ");
    Serial.println(message);
    // update the timestamp:
    lastSend = millis();
  }

  // check if a message is available to be received
  int messageSize = client.parseMessage();
  // if there's a string with length > 0:
  if (messageSize > 0) {
    Serial.print("Received a message:");
    Serial.println(client.readString());
  }
}