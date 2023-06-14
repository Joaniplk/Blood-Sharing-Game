class Player{
    constructor(x,y,width,height,speed=3,imgSrcL, imgSrcR, hitpoints=5, score=0){
        this.x = x;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.controls = new Controls();
        this.imgL = new Image();
        this.imgL.src = imgSrcL;
        this.imgR = new Image();
        this.imgR.src = imgSrcR;
        this.goingLeft = false;
        this.goingRight = true;
        this.score = score;
        this.hitpoints = hitpoints;
        this.InitialHitpoints = hitpoints;
        this.Initialx = x;
    }

    update(ctx, border, edge){
        this.#move(border, edge);
        this.#draw(ctx);
    }

    #move(border, edge){
        if(this.controls.right){
            this.goingRight = true;
            this.goingLeft = false;
            this.x += this.speed;
        }
        if(this.controls.left){
            this.goingRight = false;
            this.goingLeft = true;
            this.x -= this.speed;
        }
        if(this.x >= edge - this.width)this.x = edge - this.width;
        if(this.x <= border)this.x = border;
    }

    #draw(ctx){
        if(this.goingRight)ctx.drawImage(this.imgR, this.x, this.y, this.width, this.height);
        if(this.goingLeft)ctx.drawImage(this.imgL, this.x, this.y, this.width, this.height);
    }

    reset(){
        this.score = 0;
        this.hitpoints = this.InitialHitpoints;
        this.x = this.Initialx;
    }
}