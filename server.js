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

var Wheater = "Summer";

var wheaterinit = 1;
Grassinit = 0
GrassEaterinit = 0
Predatorinit = 0
TRexinit = 0
Triceratopsinit = 0
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
            else if (r < 45) r = 2;
            else if (r < 65) r = 3;
            else if (r < 75) r = 4;
            else if (r < 90) r = 5;
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
            Grassinit++;
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
            GrassEaterinit++;
        }
        else if (matrix[y][x] == 3) {
            xishnikArr.push(new Xishnik(x, y, 3));
            Predatorinit++;
        }
        else if (matrix[y][x] == 4) {
            trexArr.push(new TRex(x, y, 4));
            TRexinit++;
        }
        else if (matrix[y][x] == 5) {
            triceratopsArr.push(new Triceratops(x, y, 5));
            Triceratopsinit++;
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

io.on('connection', function (socket) {

    socket.on('armagedon', function () {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 6
            }
        }

        grassArr.lenght = 0;
        grasseaterArr.lenght = 0;
        xishnikArr.lenght = 0;
        trexArr.lenght = 0;
        triceratopsArr = 0;

        socket.emit("matrix", matrix);
        clearInterval(interval);
        clearInterval(weatherint);
    })

    socket.on('touch', function (arr) {
        var x = arr[0];
        var y = arr[1];

        if (x > 0 && x < matrix[0].length && y > 0 && y < matrix.length) {
            if (matrix[y][x] == 1) {

                for (var i in grassArr) {
                    if (y == grassArr[i].y && x == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

            }
            if (matrix[y][x] == 2) {

                for (var i in grasseaterArr) {
                    if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }

            }
            if (matrix[y][x] == 3) {

                for (var i in xishnikArr) {
                    if (y == xishnikArr[i].y && x == xishnikArr[i].x) {
                        xishnikArr.splice(i, 1);
                        break;
                    }
                }

            }
            if (matrix[y][x] == 4) {

                for (var i in trexArr) {
                    if (y == trexArr[i].y && x == trexArr[i].x) {
                        trexArr.splice(i, 1);
                        break;
                    }
                }

            }
            if (matrix[y][x] == 5) {

                for (var i in triceratopsArr) {
                    if (y == triceratopsArr[i].y && x == triceratopsArr[i].x) {
                        triceratopsArr.splice(i, 1);
                        break;
                    }
                }

            }
            matrix[y][x] = 0;
        }

        socket.emit("matrix", matrix);
    })


    socket.on('drawer', function (arr) {
        var x = arr[0];
        var y = arr[1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (y == grassArr[i].y && x == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 2) {
                for (var i in grasseaterArr) {
                    if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 3) {
                for (var i in xishnikArr) {
                    if (y == xishnikArr[i].y && x == xishnikArr[i].x) {
                        xishnikArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 4) {
                for (var i in trexArr) {
                    if (y == trexArr[i].y && x == trexArr[i].x) {
                        trexArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 5) {
                for (var i in triceratopsArr) {
                    if (y == triceratopsArr[i].y && x == triceratopsArr[i].x) {
                        triceratopsArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[y][x] = 0;
        }
        
        socket.emit("matrix", matrix);
    })

    socket.on('right', function (arr) {
        var x = arr[0];
        var y = arr[1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (y == grassArr[i].y && x == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 2) {
                for (var i in grasseaterArr) {
                    if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 3) {
                for (var i in xishnikArr) {
                    if (y == xishnikArr[i].y && x == xishnikArr[i].x) {
                        xishnikArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 4) {
                for (var i in trexArr) {
                    if (y == trexArr[i].y && x == trexArr[i].x) {
                        trexArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 5) {
                for (var i in triceratopsArr) {
                    if (y == triceratopsArr[i].y && x == triceratopsArr[i].x) {
                        triceratopsArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[y][x] = 7;
        }
        
        socket.emit("matrix", matrix);
    })

    socket.on('center', function (arr) {
        var x = arr[0];
        var y = arr[1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (y == grassArr[i].y && x == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 2) {
                for (var i in grasseaterArr) {
                    if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 3) {
                for (var i in xishnikArr) {
                    if (y == xishnikArr[i].y && x == xishnikArr[i].x) {
                        xishnikArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 4) {
                for (var i in trexArr) {
                    if (y == trexArr[i].y && x == trexArr[i].x) {
                        trexArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[y][x] == 5) {
                for (var i in triceratopsArr) {
                    if (y == triceratopsArr[i].y && x == triceratopsArr[i].x) {
                        triceratopsArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[y][x] = 8;
        }
        
        socket.emit("matrix", matrix);
    })
});


function draw_wheater() {
    wheaterinit++;
    if (wheaterinit == 5) {
        wheaterinit = 1;
    }
    if (wheaterinit == 4) {
        Wheater = "Autumn";
    }
    if (wheaterinit == 3) {
        Wheater = "Winter";
    }
    if (wheaterinit == 2) {
        Wheater = "Spring";
    }
    if (wheaterinit == 1) {
        Wheater = "Summer";
    }

    io.sockets.emit("exanak", Wheater);
}
var obj = { "info": [] };
function main() {
    var file = "Statistics.json";
    obj.info.push({ "Cnvac xoteri kanak@": Grassinit, "Cnvac xotakerneri kanak@": GrassEaterinit, "Cnvac predatorneri kanak@": Predatorinit, "Cnvac TRexneri kanak@": TRexinit, "Cnvac Triceratopsneri kanak@": Triceratopsinit })
    fs.writeFileSync(file, JSON.stringify(obj, null, 5));
}
var interval = setInterval(drawserver, 2000);
var weatherint = setInterval(draw_wheater, 6000);
setInterval(main, 3000);