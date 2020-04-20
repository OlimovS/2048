const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var x = 0;
var y = 0;
var squareWidth = 80;
var squareHeight = 80;
var squareColumnCount = 4;
var squareRowCount = 4;
var squarePadding = 5;
var squareOffsetTop = 5;
var squareOffsetLeft = 5;
var squares = [];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for(var r = 0; r <squareColumnCount ; r++){
  squares[r] = [];
  for(var c=0; c<squareRowCount; c++){
    squares[r][c] = 0;
  }
}
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    //randomSquares();
    fillSpace(e.key);
    // updateSquares(e.key);
    //fillSpace(e.key);
   randomSquare();
}
function randomStarters() {
  let randRow;
  let randColum;
  randRow = random(0, squareColumnCount-1);
  randColum = random(0, 1);
  squares[randRow][randColum] = 2;
  randRow = random(0, squareColumnCount-1);
  randColum= random(2,3);
  squares[randRow][randColum] = random(1,10) == 4? 4: 2;
}
function randomSquare() {
     var randRow = random(0, squareRowCount-1);
     var randColum= random(0, squareColumnCount-1);
     if(!squares[randRow][randColum]){
       squares[randRow][randColum] = random(1,7) == 4? 4: 2;
     }
}

function updateSquares(key){
   var plus=0;
   var apocalypse=1;
   var score =0;
   switch (key) {
     case "ArrowUp":
        for(var r=0;r<squareRowCount-1;r++){
          for(var c=0;c<4;c++){
            if(squares[r][c]&&squares[r][c]===squares[r+1][c]){
              //apocalypse=0;
              squares[r][c]+=squares[r+1][c];
              squares[r+1][c]=0;
              // plus+=((Math.log2(squares[r][c]))-1)*(squares[r][c]);
              // score+=(((Math.log2(squares[r][c]))-1)*(squares[r][c]));
            }
          }
        }
       break;
     case "ArrowDown":
        for(var r=0;r<4;r++){
          for(var c=0;c<3;c++){
            if(squares[r][c]&&squares[r][c]===squares[r][c+1]){
              //apocalypse=0;
              squares[r][c+1]+=squares[r][c];
              squares[r][c]=0;
              // plus+=((Math.log2(squares[r][c]))-1)*(squares[r][c]);
              // score+=(((Math.log2(squares[r][c]))-1)*(squares[r][c]));
            }
          }
        }
       break;
     case "ArrowLeft":
      for(var r=0; r<squareRowCount; r++){
        for(var c=squareColumnCount-1; c>0; c--){
          if(squares[c][r]&&squares[c][r]==squares[c-1][r]){
             squares[c-1][r]+=squares[c][r];
             squares[c][r]=0;
          }
        }
      }
      break;
    case "ArrowRight":
     for(var r=0; r<squareRowCount; r++){
       for(var c=0; c<squareColumnCount-1; c++){
         if(squares[c][r]&&squares[c][r]==squares[c+1][r]){
            squares[c+1][r]+=squares[c][r];
            squares[c][r]=0;
         }
       }
     }
     break;
     default: console.log('default updateSquares..');

   }
}

function fillSpace(key) {
  switch (key) {
    case "ArrowDown":
         for(var r = squareRowCount - 1; r>0; r--){
           for(var c=0; c<squareColumnCount; c++){
             if(!squares[r][c]){
               for(var k=r-1; k>=0; k--){
                 if(squares[k][c]){
                   squares[r][c] = squares[k][c];
                   squares[k][c] = 0;
                   break;
                 }
               }
             }
           }
         }
      break;
    case "ArrowUp":
         for(var r = 0; r<squareRowCount; r++){
           for(var c = 0; c<squareColumnCount; c++){
             if(!squares[r][c]){
               for(var k=r+1; k<squareColumnCount; k++){
                 if(squares[k][c]){
                   squares[r][c] = squares[k][c];
                   squares[k][c] = 0;
                   break;
                 }
               }
             }
           }
         }
      break;
    case "ArrowLeft":
        for(var r = 0; r < squareRowCount; r++){
           for(var c= 0; c< squareColumnCount-1; c++){
             if(!squares[r][c]){
               for(var k = c+1; k < squareColumnCount; k++){
                 if(squares[r][k]){
                   squares[r][c] = squares[r][k];
                   squares[r][k] = 0;
                   break;
                 }
               }
             }
           }
        }
      break;
    case "ArrowRight":
        for(var r = 0; r < squareRowCount; r++){
          for(var c= squareColumnCount-1; c>=0; c--){
            if(!squares[r][c]){
              for(var k = c-1; k>=0; k--){
                if(squares[r][k]){
                  squares[r][c] = squares[r][k];
                  squares[r][k] = 0;
                  break;
                }
              }
            }
          }
        }
      break;
    default: console.log('default fillSpace..');

  }

}

function makeColor(val, x) {
  let squareColor;
  switch (val) {
    case 2:
       squareColor= 'rgb(228, 228, 228)';
       harfX = x + 30;
      break;
    case 4:
       squareColor= "rgb(224, 220, 150)";
       harfX = x + 30;
      break;
    case 8:
       squareColor= "rgb(222, 190, 110)";
       harfX = x + 30;
      break;
    case 16:
       squareColor= "rgb(218, 170, 60)";
       harfX = x + 22;
      break;
    case 32:
       squareColor= "rgb(221, 159, 0)";
       harfX = x + 22;
      break;
    case 64:
       squareColor= "rgb(235, 118, 22)";
       harfX = x + 22;
      break;
    case 128:
       squareColor= "rgb(246, 89, 0)";
       harfX = x + 15;
      break;
    case 256:
       squareColor= "rgb(250, 60, 60)";
       harfX = x + 15;
      break;
    case 512:
       squareColor= "rgb(255, 25, 25)";
       harfX = x + 15;
      break;
    case 1024:
       squareColor= "rgb(221, 10, 10)";
       harfX = x + 8;
      break;
    case 2048:
       squareColor= "rgb(43, 25, 5)";
       harfX = x + 8;
      break;
    default:
      squareColor= 'rgb(198, 198, 198)';
      harfX = x + 22;
  }
  return squareColor;
}
var harfX, harfY;

function drawSquares() {
  for(var r=0; r<squareRowCount; r++){
    for(var c=0; c<squareColumnCount; c++){
      var s = squares[r][c];
      var squareX = (c*(squareWidth+squarePadding)) + squareOffsetLeft;
      var squareY = (r*(squareHeight+squarePadding)) + squareOffsetTop;
      var squareColor= makeColor(s, squareX);
      harfY = squareY + 50;

      ctx.beginPath();
      ctx.rect(squareX, squareY, squareWidth, squareHeight);
      ctx.fillStyle = squareColor;
      ctx.fill();
      ctx.closePath();

      ctx.font = "30px Arial";
      ctx.fillStyle = s==2048?'rgb(255, 255, 255)':"#000000";
      ctx.fillText(s==0?"":s, harfX, harfY);
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
