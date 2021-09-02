const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementsByName("button");

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
var prevSquares = [];

// getting random value between min and max
// uz: min va max oralig'ida random son olish
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// for filling squares array
// uz: squares arrayini elementlar bilan to'ldirish uchun
for (var r = 0; r < squareColumnCount; r++) {
  squares[r] = [];
  for (var c = 0; c < squareRowCount; c++) {
    squares[r][c] = 0;
  }
}

// key down listener
// uz: klaviatura bosilishini tinglovchi
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  console.clear();
  savePrevious();
  fillSpace(e.key);
  updateSquares(e.key);
  fillSpace(e.key);

  if (checkFull()) {
    if (checkEndGame()) {
      console.log("you loose");
    } else {
      console.log("You stuck");
    }
  } else {
    generateRandomSquare();
  }
}

// for 1-view random starters
// uz: dastur dastlab ochilganda random holda dastlabki kataklarni joylash
function randomStarters() {
  setTimeout(() => {
    let randRow;
    let randColum;
    randRow = random(0, squareColumnCount - 1);
    randColum = random(0, 1);
    squares[randRow][randColum] = 2;
    randRow = random(0, squareColumnCount - 1);
    randColum = random(2, 3);
    squares[randRow][randColum] = random(1, 10) == 4 ? 4 : 2;
  }, 150);
}

// generating random square for 2048 to have a new square
// uz: 2048 da doimo yangi katak random holda chiqib turishi kerak, u yoq bu yoqqa surganda
var generate = false;
function generateRandomSquare() {
  generate = false;
  setTimeout(randomSquare, 150);
  checkEndGame();
}

// saving prev squares
// uz: oldingi katakchalarni saqlansh, nega yozganman bilmadim
function savePrevious() {
  for (var r = 0; r < squareRowCount; r++) {
    prevSquares[r] = [];
    for (var c = 0; c < squareColumnCount; c++) {
      prevSquares[r][c] = squares[r][c];
    }
  }
}

// for checking whether  squares fill the all places
// uz: kataklar butun maydonni egalladimi tekshirish uchun
function checkFull() {
  let isFull = true;
  forLoop: for (var r = 0; r < squareRowCount; r++) {
    for (var c = 0; c < squareColumnCount; c++) {
      if (!squares[r][c]) {
        isFull = false;
        break forLoop;
      }
    }
  }
  return isFull;
}

// for checking whether game is over
// o'yin tugaganini tekshriish uchun
function checkEndGame() {
  var checkLoose = true;
  if (checkFull()) {
    forLoop2: for (var r = 0; r < squareRowCount - 1; r++) {
      for (var c = 0; c < squareColumnCount - 1; c++) {
        if (
          squares[r][c] === squares[r][c + 1] ||
          squares[r][c] == squares[r + 1][c]
        ) {
          checkLoose = false;
          break forLoop2;
        }
      }
    }
    return checkLoose;
  }
  return false;
}

// random square maker
// random square yasovchi funksiya
function randomSquare() {
  if (!checkFull()) {
    var i, j;
    do {
      i = random(0, 3);
      j = random(0, 3);
      console.log("while");
    } while (squares[i][j]);
    squares[i][j] = random(1, 10) === 4 ? 4 : 2;
  }
}

// updating square positions
// kataklarni positsiyasini update qilish
function updateSquares(key) {
  var plus = 0;
  var apocalypse = 1;
  var score = 0;
  switch (key) {
    case "ArrowUp":
      for (var r = 0; r < squareRowCount - 1; r++) {
        for (var c = 0; c < 4; c++) {
          if (squares[r][c] && squares[r][c] === squares[r + 1][c]) {
            //apocalypse=0;
            squares[r][c] += squares[r + 1][c];
            squares[r + 1][c] = 0;
            // plus+=((Math.log2(squares[r][c]))-1)*(squares[r][c]);
            // score+=(((Math.log2(squares[r][c]))-1)*(squares[r][c]));
            generate = true;
          }
        }
      }
      break;
    case "ArrowDown":
      for (var r = 3; r > 0; r--) {
        for (var c = 0; c < 4; c++) {
          if (squares[r][c] && squares[r][c] === squares[r - 1][c]) {
            //apocalypse=0;
            squares[r][c] += squares[r - 1][c];
            squares[r - 1][c] = 0;
            // plus+=((Math.log2(squares[r][c]))-1)*(squares[r][c]);
            // score+=(((Math.log2(squares[r][c]))-1)*(squares[r][c]));
            generate = true;
          }
        }
      }
      break;
    case "ArrowLeft":
      for (var r = 0; r < squareRowCount; r++) {
        for (var c = 0; c < squareColumnCount - 1; c++) {
          if (squares[r][c] && squares[r][c] == squares[r][c + 1]) {
            squares[r][c] += squares[r][c + 1];
            squares[r][c + 1] = 0;
            generate = true;
          }
        }
      }
      break;
    case "ArrowRight":
      for (var r = 0; r < squareRowCount; r++) {
        for (var c = squareColumnCount - 1; c > 0; c--) {
          if (squares[r][c] && squares[r][c] == squares[r][c - 1]) {
            squares[r][c] += squares[r][c - 1];
            squares[r][c - 1] = 0;
            generate = true;
          }
        }
      }
      break;
    default:
      console.log("default updateSquares..");
  }
}

// filling free spaces with squares that need changing position
// pozitsiyasi o'zgarishi kerak bo'lgan kataklar bilan bosh joylarni toldirish
function fillSpace(key) {
  switch (key) {
    case "ArrowDown":
      for (var r = squareRowCount - 1; r > 0; r--) {
        for (var c = 0; c < squareColumnCount; c++) {
          if (!squares[r][c]) {
            for (var k = r - 1; k >= 0; k--) {
              if (squares[k][c]) {
                squares[r][c] = squares[k][c];
                squares[k][c] = 0;
                generate = true;
                break;
              }
            }
          }
        }
      }
      break;
    case "ArrowUp":
      for (var r = 0; r < squareRowCount; r++) {
        for (var c = 0; c < squareColumnCount; c++) {
          if (!squares[r][c]) {
            for (var k = r + 1; k < squareColumnCount; k++) {
              if (squares[k][c]) {
                squares[r][c] = squares[k][c];
                squares[k][c] = 0;
                generate = true;
                break;
              }
            }
          }
        }
      }
      break;
    case "ArrowLeft":
      for (var r = 0; r < squareRowCount; r++) {
        for (var c = 0; c < squareColumnCount - 1; c++) {
          if (!squares[r][c]) {
            for (var k = c + 1; k < squareColumnCount; k++) {
              if (squares[r][k]) {
                squares[r][c] = squares[r][k];
                squares[r][k] = 0;
                generate = true;
                break;
              }
            }
          }
        }
      }
      break;
    case "ArrowRight":
      for (var r = 0; r < squareRowCount; r++) {
        for (var c = squareColumnCount - 1; c >= 0; c--) {
          if (!squares[r][c]) {
            for (var k = c - 1; k >= 0; k--) {
              if (squares[r][k]) {
                squares[r][c] = squares[r][k];
                squares[r][k] = 0;
                generate = true;
                break;
              }
            }
          }
        }
      }
      break;
    default:
      console.log("default fillSpace..");
  }
}

// uz: color yashovchi funksiya
// function for color making
function makeColor(val, x) {
  let squareColor;
  switch (val) {
    case 2:
      squareColor = "rgb(228, 228, 228)";
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
      squareColor = "rgb(221, 159, 0)";
      harfX = x + 22;
      break;
    case 64:
      squareColor = "rgb(235, 118, 22)";
      harfX = x + 22;
      break;
    case 128:
      squareColor = "rgb(246, 89, 0)";
      harfX = x + 15;
      break;
    case 256:
      squareColor = "rgb(250, 60, 60)";
      harfX = x + 15;
      break;
    case 512:
      squareColor = "rgb(255, 25, 25)";
      harfX = x + 15;
      break;
    case 1024:
      squareColor = "rgb(221, 10, 10)";
      harfX = x + 8;
      break;
    case 2048:
      squareColor = "rgb(43, 25, 5)";
      harfX = x + 8;
      console.log("you win");
      break;
    default:
      squareColor = "rgb(198, 198, 198)";
      harfX = x + 22;
  }
  return squareColor;
}

// ekranga kataklarni chizish
// uz: draw squares to the screen
var harfX, harfY;

function drawSquares() {
  for (var r = 0; r < squareRowCount; r++) {
    for (var c = 0; c < squareColumnCount; c++) {
      var s = squares[r][c];
      var squareX = c * (squareWidth + squarePadding) + squareOffsetLeft;
      var squareY = r * (squareHeight + squarePadding) + squareOffsetTop;
      var squareColor = makeColor(s, squareX);
      harfY = squareY + 50;

      ctx.beginPath();
      ctx.rect(squareX, squareY, squareWidth, squareHeight);
      ctx.fillStyle = squareColor;
      ctx.fill();
      ctx.closePath();

      ctx.font = "30px Arial";
      ctx.fillStyle = s == 2048 ? "rgb(255, 255, 255)" : "#000000";
      ctx.fillText(s == 0 ? "" : s, harfX, harfY);
    }
  }
}

// calling random starters
// uz: randomStarters funksiyasini chaqirayapmiz
randomStarters();

// uz: shuncha tayyorlagan anrsalarimizni chizuvchi dastur
// function that draws everything we do
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquares();
  // console.log('draw');

  requestAnimationFrame(draw);
}

// uz:funskiyani chaqirish
// calling function
draw();
