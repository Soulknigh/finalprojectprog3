//knchum enq socket.io ev haytarum en side canvasi hamar
var side = 20;
var socket = io();

var weatherclient= "Summer";

socket.on("exanak", function(w){
    weatherclient = w;
});
 //setup
 function setup() {
    createCanvas(20 * side , 20 * side);
    background('blue');  
 }
 
 function drawWeather(w){
    var p = document.getElementById('seasson');
    var weather = w;
    console.log(weather);

    if(weather == "Summer"){
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
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

//yndunuma serveric matrixy ev kanchuma drawMatrix
socket.on("matrix", drawMatrix);
socket.on("exanak", drawWeather);

//function event kisata grac serverum el code petqa grvi sa vorpes hushum
//  function mousePressed() {
//     var x = Math.floor(mouseX / side);
//     var y = Math.floor(mouseY / side);
//     arr = [x, y];
//     console.log(arr);
//     socket.emit("Sxmvec", arr)

// }

