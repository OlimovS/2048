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
    squares[c][r] = 0;
  }
}
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    //randomSquares();
    fillSpace(e.key);
    updateSquares(e.key);
    randomSquare();
    fillSpace(e.key);
}
function randomStarters() {
  let randomC;
  let randomR;
  randomC = random(0, 1);
  randomR = random(0, squareRowCount-1);
  squares[randomC][randomR] = 2;
  randomC = random(2, 3);
  randomR = random(0, squareRowCount-1);
  squares[randomC][randomR] = random(1,7) == 4? 4: 2;
}
function randomSquare() {
  let i = 9;
   while(i--){
     let randomC = random(0, squareColumnCount-1);
     let randomR = random(0, squareRowCount-1);
     if(!squares[randomC][randomR]){
       squares[randomC][randomR] = random(1,7) == 4? 4: 2;
       break;
     }
     console.log('whil is working..')
   }
}

function updateSquares(key){
   var plus=0;
   var apocalypse=1;
   var score =0;
   switch (key) {
     case "ArrowUp":
        for(var i=0;i<4;i++){
          for(var j=3;j>0;j--){
            if(squares[i][j]&&squares[i][j]===squares[i][j-1]){
              //apocalypse=0;
              squares[i][j]+=squares[i][j-1];
              squares[i][j-1]=0;
              // plus+=((Math.log2(squares[i][j]))-1)*(squares[i][j]);
              // score+=(((Math.log2(squares[i][j]))-1)*(squares[i][j]));
            }
          }
        }
       break;
     case "ArrowDown":
        for(var i=0;i<4;i++){
          for(var j=0;j<3;j++){
            if(squares[i][j]&&squares[i][j]===squares[i][j+1]){
              //apocalypse=0;
              squares[i][j+1]+=squares[i][j];
              squares[i][j]=0;
              // plus+=((Math.log2(squares[i][j]))-1)*(squares[i][j]);
              // score+=(((Math.log2(squares[i][j]))-1)*(squares[i][j]));
            }
          }
        }
       break;
     case "ArrowLeft":
      for(var c=0; c<squareColumnCount; c++){
        for(var r=3; r>0; r--){
          if(squares[r][c]&&squares[r][c]==squares[r-1][c]){
             squares[r-1][c]+=squares[r][c];
             squares[r][c]=0;
          }
        }
      }
      break;
    case "ArrowRight":
     for(var c=0; c<squareColumnCount; c++){
       for(var r=0; r<squareRowCount-1; r++){
         if(squares[r][c]&&squares[r][c]==squares[r+1][c]){
            squares[r+1][c]+=squares[r][c];
            squares[r][c]=0;
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
         for(var c = 0; c < squareColumnCount; c++){
           for(var r = squareRowCount-1; r>=0; r--){
             if(!squares[c][r]){
               for(var k=r-1; k>=0; k--){
                 if(squares[c][k]){
                   squares[c][r] = squares[c][k];
                   squares[c][k] = 0;
                   break;
                 }
               }
             }
           }
         }
      break;
    case "ArrowUp":
         for(var c = 0; c < squareColumnCount; c++){
           for(var r = 0; r<squareRowCount; r++){
             if(!squares[c][r]){
               for(var k=r+1; k<squareRowCount; k++){
                 if(squares[c][k]){
                   squares[c][r] = squares[c][k];
                   squares[c][k] = 0;
                   break;
                 }
               }
             }
           }
         }
      break;
    case "ArrowLeft":
        for(var c = 0; c < squareColumnCount; c++){
           for(var r = 0; r < squareRowCount; r++){
             if(!squares[r][c]){
               for(var k = r+1; k < squareRowCount; k++){
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
    case "ArrowRight":
        for(var c = 0; c < squareColumnCount; c++){
          for(var r = squareRowCount-1; r>=0; r--){
            if(!squares[r][c]){
              for(var k = r-1; k>=0; k--){
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
    default: console.log('default fillSpace..');

  }

}



function makeColor(val, x) {
  // squareColor = `rgb(${228}, ${228-4*val}, ${228-10*val})`
  let squareColor;
  switch (val) {
    case 2:
       squareColor = 'rgb(228, 228, 228)';
       harfX = x + 30;
      break;
    case 4:
       squareColor = "rgb(224, 220, 150)";
       harfX = x + 30;
      break;
    case 8:
       squareColor = "rgb(222, 190, 110)";
       harfX = x + 30;
      break;
    case 16:
       squareColor = "rgb(218, 170, 60)";
       harfX = x + 22;
      break;
    case 32:
       squareColor = "rgb(210, 130, 40)";
       harfX = x + 22;
      break;
    default:
      squareColor = 'rgb(198, 198, 198)';
      harfX = x + 22;
  }
  return squareColor;
}
var harfX, harfY;
function drawSquares() {
  for(var c=0; c<squareColumnCount; c++){
    for(var r=0; r<squareRowCount; r++){
      var s = squares[c][r];
      var squareX = (c*(squareWidth+squarePadding)) + squareOffsetLeft;
      var squareY = (r*(squareHeight+squarePadding)) + squareOffsetTop;
      var squareColor = makeColor(s, squareX);
      harfY = squareY + 50;

      ctx.beginPath();
      ctx.rect(squareX, squareY, squareWidth, squareHeight);
      ctx.fillStyle = squareColor;
      ctx.fill();
      ctx.closePath();

      ctx.font = "30px Arial";
      ctx.fillStyle = "#000000";
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
