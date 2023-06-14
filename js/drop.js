class Drop{
    constructor(width, height ,vel, imageSrc, edge, margin=10){
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.vel = vel;
        this.img = new Image();
        this.img.src = imageSrc;
        this.edge = edge;
        this.margin = margin;
        this.x = this.getDropX();
    }

    getDropX(){
        return (Math.round(Math.random() * (this.edge - this.width - 2*this.margin)) + this.margin);
    }

    reset(){
        this.y = 0;
        this.x = this.getDropX();
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    update(ctx){
        this.y += this.vel;
        this.draw(ctx);
    }
}