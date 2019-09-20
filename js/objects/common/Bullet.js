function Bullet(speed, x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.imgSrc = '';
    // TODO decide where to declare
    this.acceleration = new Acceleration(this, speed, speed);
    this.acceleration.applyYAccleration(-speed);


    //RECT
    this.rect = new Rect(x, y, this.size, this.size);
    this.dead = 0;
    this.speed = speed;


    this.update = function (input) {
        // TODO apply here?
        // this.acceleration.applyYAccleration(this.speed/100);
        this.acceleration.moveParent();
        this.rect.setTo(this.x, this.y);
    };
    this.draw = function (ctx) {
        ctx.fillStyle = "green";
        this.rect.draw(ctx);
        //this.drawImage(ctx);
    };
}
