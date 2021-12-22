// server - client variables

let clientSocket = io();
clientSocket.on("connect", newConnection);

// sketch variables

let fillColor = [
'red', 'pink', 'purple', 'orange', 'blue'
];
let img;


// server communication 

function preload () {
  img = loadImage("./assets/quadretti_bg.jpg")
  console.log('image loaded');
}

function newConnection() {
  console.log("your id:", clientSocket.id);
} 


// sketch

function setup() {
  createCanvas(windowWidth, windowHeight);
  image(img, -50, -50, 1920, 1080); // bg image, stays fixed
  noStroke();
  fill(random(fillColor)); // in setup to not change at every frame 
  frameRate(3);

  let myText1 = "write a kind message to make a stranger happy";

  drawingContext.font = "42px Lora";
  fill('pink');
  textLeading(52);
  text(myText1, windowWidth*1/24, windowHeight*1/24, 500, 500);
  
}


// socket 

clientSocket.on('mouseBroadcast', otherMouse);

function otherMouse(dataReceived) {
  fill(fillColor);
  circle(dataReceived.x, dataReceived.y, 10); // part of the sketch 
}

function mouseDragged () {
  console.log (mouseX + ',' + mouseY);
  noStroke();
  fill(fillColor);
  circle(mouseX, mouseY, 10); 

  let message = {
    id: clientSocket.id,
    x: mouseX,y: mouseY,
  };
clientSocket.emit('mouse', message);
}

// color changes when there is a new click
function mouseClicked() {
  fill(random(fillColor));
  noStroke ();
 }
 

// sketch - text



