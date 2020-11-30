var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeInterval = 1000;
    this.babyEyeCount = 0;
    this.babyEyeTimer = 0;

    this.babyBodyCount = 0;
    this.babyBodyTimer = 0;
}
babyObj.prototype.init = function () {
    this.x = c2Width*0.5 - 50;
    this.y = c2Height*0.5 + 50;
    this.angle = 0;

}
babyObj.prototype.draw = function () {
    this.x = lerpDistance(mom.x, this.x, 0.986);
    this.y = lerpDistance(mom.y, this.y, 0.986);

    var deltaX = mom.x-this.x;
    var deltaY = mom.y-this.y;
    var beta = Math.atan2(deltaY, deltaX) - Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.92);

    this.babyTailTimer += deltaTime;
    this.babyEyeTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else{
            this.babyEyeInterval = 200;
        }
    }

    this.babyBodyTimer +=deltaTime;
    if( this.babyBodyTimer > 220){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 220;
        if(this.babyBodyCount >19 ){
            this.babyBodyCount = 19;//game over
            data.gameOver = true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    var babyTailCount = this.babyTailCount;
    var babyEyeCount = this.babyEyeCount;
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5 + 24,-babyTail[babyTailCount].height * 0.5);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width * 0.5,-babyBody[babyBodyCount].height * 0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height  * 0.5);
    ctx1.restore();
}