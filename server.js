var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runninng")

});

//stex kapum en mer classery
Grass = require("./module/Grass.js");
GrassEater = require("./module/GrassEater.js");
Xishnik = require("./module/Predator.js");
TRex = require("./module/TRex.js");
Triceratops = require("./module/Triceratops.js");


//haytarum en zanvacnery
grassArr = [];
grasseaterArr = [];
xishnikArr = [];
trexArr = [];
triceratopsArr = [];

Wheater = "Summer";

wheaterinit = 1;
//stexcum en matrix generacnox function
var w = 50;
var h = 60;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 30) r = 1;
            else if (r < 55) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}


//stexcum en zangvacic patahakan andam tvox function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//kanchum en genMatrix functiony ev talis en matrix popoxakanin
matrix = genMatrix(w, h);

//stex pptvum en matrix-i mejov u stexcum en objectnery
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
        }
        else if (matrix[y][x] == 3) {
            xishnikArr.push(new Xishnik(x, y, 3));
        }
        else if (matrix[y][x] == 4) {
            trexArr.push(new TRex(x, y, 4));
        }
        else if (matrix[y][x] == 5) {
            triceratopsArr.push(new Triceratops(x, y, 5));
        }
    }
}

function drawserver() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for (var i in trexArr) {
        trexArr[i].eat();
    }
    for (var i in xishnikArr) {
        xishnikArr[i].eat();
    }
    for (var i in triceratopsArr) {
        triceratopsArr[i].eat();
    }
    // console.log(matrix)
    io.sockets.emit("matrix", matrix);
}



function draw_wheater() {
    wheaterinit++;
    if(wheaterinit == 5){
        wheaterinit =1;
    }
    if(wheaterinit == 4){
        Wheater ="Autumn";
    }
    if(wheaterinit == 3){
        Wheater ="Winter";
    }
    if(wheaterinit == 2){
        Wheater ="Spring";
    }
    if(wheaterinit == 1){
        Wheater ="Summer";
    }

    io.sockets.emit("exanak", Wheater);
}

setInterval(drawserver, 2000);
setInterval(draw_wheater, 4000);