var lastTime;
var deltaTime;


var c1;
var ctx1;

var c2;
var ctx2;
var c2Width;
var c2Height;

var frult;
var ane;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlu = [];

var data;

var wave;
var halo;

var dust;
var dustPic = [];

var bgPic = new Image();
document.body.onload = game;
function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init(){
    c1 = document.getElementById("canvas1");
    ctx1 = c1.getContext("2d");//鱼
    c2 = document.getElementById("canvas2"); //背景 海葵 果实
    ctx2 = c2.getContext("2d");
    c1.addEventListener('mousemove', onMouseMove, false);
    bgPic.src = "./src/background.jpg";
    c2Width = c2.width;
    c2Height = c2.height;
    ane = new aneObj();
    ane.init();
    frult = new frultObj();
    frult.init();
    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();
    mx = c2Width*0.5;
    my = c2Height*0.5;
    for( var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/bigTail" + i + ".png";
    }
    for( var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    for (var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for( var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }
    for( var i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }

    data = new dataObj();
    for( var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlu[i] = new Image();
        momBodyOra[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlu[i].src = "./src/bigSwimBlue" + i + ".png";
    }

    ctx1.font = "40px Verdana";
    ctx1.textAlign = "center";
    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for(var i = 0; i < 7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }

    dust  = new dustObj();
    dust.init();
}

function gameloop(){
    setTimeout(gameloop , 17);//每秒多少帧
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    drawBackground();
    ane.draw();
    frultMonitor();
    frult.draw();

    ctx1.clearRect(0, 0, c2Width, c2Height);
    mom.draw();
    baby.draw();
    momFrultCollision();
    momBabyCollision ();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();


}
function onMouseMove (e){
    if(!data.gameOver){
        if(e.offSetX || e.layerX){
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}

function lerpDistance (aim, cur, ratio){
    var delta = cur-aim;
    return aim + delta * ratio;
}
function lerpAngle (a, b,radio){
    var d = b - a;
    if(d > Math.PI) d = d - 2*Math.PI;
    if(d< -Math.PI) d = d + 2 * Math.PI;
    return  a + d * 0.9;
}

function calLength (x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}