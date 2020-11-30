var momObj = function () {
    this.x;
    this.y;
    this.angle;
    this.eye = new Image();
    this.fish = new Image();
    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;

    this.momBodyCount = 0;
}
momObj.prototype.init = function () {
    this.x = c2Width*0.5;
    this.y = c2Height*0.5;
    this.angle = 0;
    this.fish.src = "./src/bigSwim0.png";
    this.eye.src = "./src/bigEye0.png";
}
momObj.prototype.draw = function () {
    this.x = lerpDistance(mx, this.x, 0.98);
    this.y = lerpDistance(my, this.y, 0.98);

    var deltaX = mx-this.x;
    var deltaY = my-this.y;
    var beta = Math.atan2(deltaY, deltaX) - Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.9);
    this.momTailTimer += deltaTime;
    if(this.momTailTimer > 50){
        this.momTailCount = (this.momTailCount + 1) %8;
        this.momTailTimer %= 50;
    }

    this.momEyeTimer += deltaTime;
    if(this.momEyeTimer > this.momEyeInterval){
        this.momEyeCount = (this.momEyeCount + 1) %2;
        this.momEyeTimer  %= this.momEyeInterval;
        if(this.momEyeCount == 0){
            this.momEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.momEyeInterval = 200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    var momTailCount = this.momTailCount;
    var momEyeCount = this.momEyeCount;
    var momBodyCount = this.momBodyCount;
    if(data.double ==1){
        ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width * 0.5,-momBodyOra[momBodyCount].height * 0.5);
    }else{
        ctx1.drawImage(momBodyBlu[momBodyCount],-momBodyBlu[momBodyCount].width * 0.5,-momBodyBlu[momBodyCount].height * 0.5);
    }
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width * 0.5 + 30,-momTail[momTailCount].height * 0.5);

    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height  * 0.5);
    ctx1.restore();
}