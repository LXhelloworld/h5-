function momFrultCollision() {
    if(!data.gameOver){
        for(var i = 0; i < frult.num; i++){
            if(frult.alive[i]){
                var l = calLength (frult.x[i], frult.y[i], mom.x, mom.y);
                if (l < 900){
                    frult.dead(i);
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if(mom.momBodyCount > 7){
                        mom.momBodyCount =7;
                    }
                    if(frult.frultType[i] == "blue"){
                        data.double = 2;
                    }
                    wave.born(frult.x[i], frult.y[i]);
                }
            }
        }
    }
}


function momBabyCollision () {
    if(data.fruitNum > 0 && !data.gameOver){
        var l = calLength(mom.x, mom.y, baby.x, baby.y);
        if(l < 900){
            baby.babyBodyCount = 0;
            mom.momBodyCount = 0;
            data.addScore();
            halo.born(baby.x, baby.y);
        }
    }

}