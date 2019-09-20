function EnemyShip(x, y, size, speed, imgSrc) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.imgSrc = imgSrc;
    //RECT
    this.rect = new Rect(x, y, this.size, this.size);
    this.dead = 0;
    this.speed = speed;
    //image
    if (imgSrc !== "") {
        this.animatedImage = new AnimatedImage("./images/enemy.png", 5, 3, 0, 0, 0, 0);
    }
    this.update = function () {
        this.rect.setTo(this.x, this.y);
    };
    this.draw = function (ctx) {
        ctx.fillStyle = "black";
        this.rect.draw(ctx);
        //this.drawImage(ctx);
    };
    this.drawImage = function (ctx) {
        if (this.imgSrc !== "") {
            this.animatedImage.draw(ctx, this.x, this.y);
        }
    };
}
