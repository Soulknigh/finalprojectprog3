//knchum enq socket.io ev haytarum en side canvasi hamar
var side = 20;
var socket = io();

var state = false;

var weatherclient = "Summer";

socket.on("exanak", function (w) {
    weatherclient = w;
});
//setup
function setup() {
    createCanvas(20 * side, 20 * side);
    background('blue');
}


function drawWeather(w) {
    var p = document.getElementById('seasson');
    var weather = w;
    console.log(weather);

    if (weather == "Summer") {
        p.innerText = "Summer";
    }
    else if (weather == "Winter") {
        p.innerText = "Winter";
    }
    else if (weather == "Autumn") {
        p.innerText = "Autumn";
    }
    else if (weather == "Spring") {
        p.innerText = "Spring";
    }
}
//nuyn draw functiony uxaki serveric ekac matrixi hashvin 
function drawMatrix(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                if (weatherclient === "Summer") {
                    fill("green");
                } else if (weatherclient === "Summer") {
                    fill("green");
                } else if (weatherclient === "Spring") {
                    fill("#9ACD32");
                } else if (weatherclient === "Winter") {
                    fill("#20B2AA");
                } else if (weatherclient === "Autumn") {
                    fill("#808000");
                }

            }
            else if (matrix[y][x] == 2) {
                if (weatherclient === "Spring") {
                    fill("yellow");
                } else if (weatherclient !== "Spring") {
                    fill("yellow");
                }

            }
            else if (matrix[y][x] == 3) {
                if (weatherclient === "Winter") {
                    fill("blue");
                } else if (weatherclient !== "Winter") {
                    fill("blue");
                }

            }
            else if (matrix[y][x] == 4) {
                if (weatherclient === "Autumn") {
                    fill("red");
                } else if (weatherclient !== "Autumn") {
                    fill("red");
                }
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
            }
            else if (matrix[y][x] == 6) {
                fill("black");
            }
            else if (matrix[y][x] == 7) {
                fill("pink");
            }
            else if (matrix[y][x] == 8) {
                fill("white");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

//yndunuma serveric matrixy ev kanchuma drawMatrix
socket.on("matrix", drawMatrix);
socket.on("exanak", drawWeather);

function Firebutton() {
    socket.emit('armagedon');
}

function mousePressed(){
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x,y];
    console.log(arr);
    socket.emit("touch", arr);
    state = true
}


function drawImage() {
    if(state == true){
        fill('grey');
        var x = Math.floor(mouseX / side);
        var y = Math.floor(mouseY / side);
        arr = [x,y];
        socket.emit("drawer", arr);

    }
  
}

function draw(){
  
    if (mouseIsPressed) {
        if (mouseButton === LEFT) {
            drawImage(); 
          }
      if (mouseButton === RIGHT) {
        var x = Math.floor(mouseX / side);
        var y = Math.floor(mouseY / side);
        arr = [x,y];
        socket.emit("right", arr);
      }
      if (mouseButton === CENTER) {
        var x = Math.floor(mouseX / side);
        var y = Math.floor(mouseY / side);
        arr = [x,y];
        socket.emit("center", arr);
      }  

    }
}




