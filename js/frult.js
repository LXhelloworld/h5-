var frultObj = function () {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.l = [];
    this.aneNo = [];
    this.frultType = [];
    this.spd = [];
    this.fruit = new Image();
    this.blue = new Image();
}
frultObj.prototype.num = 30;
frultObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.aneNo[i] = 0;
        this.frultType[i] = "";
        this.spd[i] = Math.random()*0.01 + 0.008;
    }
    this.fruit.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}
frultObj.prototype.draw = function () {
    for(var i = 0; i<this.num; i++) {
        if (this.alive[i]) {
            if(this.frultType[i] == "blue"){
                var pic = this.blue;
            }else{
                var pic = this.fruit;
            }

            if (this.l[i] <= 14) {
                var No = this.aneNo[i]
                this.x[i] = ane.headx[No];
                this.y[i] = ane.heady[No];
                this.l[i] += this.spd[i] * 2 * deltaTime;
                ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            } else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
                //ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }
    }
}
frultObj.prototype.born = function (i) {
    var aneID = Math.floor(Math.random()*ane.num);
    this.aneNo[i] = aneID;
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.25){
        this.frultType[i] = "blue";
    } else {
        this.frultType[i] = "fruit";
    }
}
frultObj.prototype.dead = function (i) {
    this.alive[i] = false;
}

frultObj.prototype.update  = function () {
    var num = 0;
    for(var i = 0; i < this.num; i++){
        if(this.alive[i]) num++;
    }
}
function frultMonitor() {
    var num = 0;
    for(var i = 0; i < frult.num; i++){
        if(frult.alive[i]) num++;
    }
    if(num < 12){
        sendFrult();
    }

}
function sendFrult(){
    for(var i = 0; i < frult.num; i++){
        if(!frult.alive[i]){
            frult.born(i);
            return;
        }
    }
}