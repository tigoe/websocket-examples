let ws = new WebSocket('ws://localhost:8080/');
let textBox;
let outputDiv;

ws.onmessage = function (event) {
  outputDiv.innerHTML = event.data;
};

function setup() {
  textBox = document.getElementById('text');
  textBox.addEventListener('keyup', getText);
  outputDiv = document.getElementById('out');
}

function getText(event) {
  let data = event.target.value;
  console.log(event.keyCode);
  // if you get a newline, send and clear the textBox:
  if (event.keyCode == 13) {
    ws.send(data);
    textBox.value = "";
  }
}

window.addEventListener('DOMContentLoaded', setup);
