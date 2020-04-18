const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var x = 0;
var y = 0;
var squareWidth = 80;
var squareHeight = 80;
var squareRowCount = 4;
var squareColumnCount = 4;
var squarePadding = 5;
var squareOffsetTop = 5;
var squareOffsetLeft = 5;
var squares = [];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for(var c = 0; c <squareRowCount ; c++){
  squares[c] = [];
  for(var r=0; r<squareColumnCount; r++){
    var squareX = (c*(squareWidth+squarePadding)) + squareOffsetLeft;
    var squareY = (r*(squareHeight+squarePadding)) + squareOffsetTop;
    squares[c][r] = {x: squareX, y: squareY, value: ""};
  }
}
document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    // if(e.key == "Right" || e.key == "ArrowRight") {
    //     rightPressed = true;
    // }
    // else if(e.key == "Left" || e.key == "ArrowLeft") {
    //     leftPressed = true;
    // }
    // if(e.key == "Up" || e.key == "ArrowUp") {
    //     rightPressed = true;
    // }
    // else if(e.key == "Down" || e.key == "ArrowDown") {
    //     leftPressed = true;
    // }
    updateSquares(e.key);
    console.log(`${e.key} is downed`);

}

// function keyUpHandler(e) {
//     // if(e.key == "Right" || e.key == "ArrowRight") {
//     //     rightPressed = true;
//     // }
//     // else if(e.key == "Left" || e.key == "ArrowLeft") {
//     //     leftPressed = true;
//     // }
//     // if(e.key == "Up" || e.key == "ArrowUp") {
//     //     rightPressed = true;
//     // }
//     // else if(e.key == "Down" || e.key == "ArrowDown") {
//     //     leftPressed = true;
//     // }
//     console.log(`${e.code} is upped`);
// }

function updateSquares(key) {
  switch (key) {
    case "ArrowDown":
         for(var c = 0; c < squareColumnCount; c++){
           for(var r = squareRowCount-1; r>=0; r--){
             if(!squares[c][r].value){
               for(var k=r-1; k>=0; k--){
                 if(squares[c][k].value){
                   squares[c][r].value = squares[c][k].value;
                   squares[c][k].value = "";
                   break;
                 }
               }
             }
           }
         }
      break;
    default: console.log('waiting..');

  }

}

function randomStarters() {
  var randomC = random(0, 1);
  var randomR = random(0, squareRowCount-1);
  squares[randomC][randomR].value = "2";

  var randomC2 = random(2, 3);
  var randomR2 = random(0, squareRowCount-1);
  squares[randomC2][randomR2].value = "2";
}

function makeColor(val, x) {
  let squareColor;
  switch (val) {
    case "2":
       squareColor = 'rgb(228, 228, 228)';
       harfX = x + 30;
      break;
    case "4":
       squareColor = "rgba(247, 242, 171, 0.86)";
       harfX = x + 30;
      break;
    case "8":
       squareColor = "rgb(255, 213, 133)";
       harfX = x + 30;
      break;
    case "16":
       squareColor = "rgb(255, 186, 54)";
       harfX = x + 22;
      break;
    case "32":
       squareColor = "rgb(222, 132, 13)";
       harfX = x + 22;
      break;
    default: squareColor = 'rgb(198, 198, 198)';
  }
  return squareColor;
}
var harfX, harfY;
function drawSquares() {
  for(var c=0; c<squareColumnCount; c++){
    for(var r=0; r<squareRowCount; r++){
      var s = squares[c][r];
      harfY = s.y + 50;
      var squareColor = makeColor(s.value, s.x);

      ctx.beginPath();
      ctx.rect(s.x, s.y, squareWidth, squareHeight);
      ctx.fillStyle = squareColor;
      ctx.fill();
      ctx.closePath();

      ctx.font = "30px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(s.value, harfX, harfY);
    }
  }
}

randomStarters();
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquares();

  requestAnimationFrame(draw);
}
draw()
