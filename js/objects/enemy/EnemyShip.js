function EnemyShip(xgen, y, size, speed, imgSrc) {
    this.x = xgen.getValue(); // TODO
    this.y = y;
    this.size = size;
    this.imgSrc = imgSrc;
    //RECT
    this.rect = new Rect(this.x, this.y, this.size, this.size);
    this.dead = false;
    this.speed = speed;

    // TODO internal/movements/ContinuousMovement, RepetitiveMovement, ConditionalMovement ect?
    this.acceleration = new Acceleration(this, speed, speed);
    this.acceleration.applyYAccleration(speed);

    this.timers = [new TimedEvent(100, 1, this, 'doShoot')];
    this.collections = [new Collection(parent = this, id = "bullets", attributes = {})];
    //image
    if (imgSrc !== "") {
        this.animatedImage = new AnimatedImage("./images/enemy.png", 5, 3, 0, 0, 0, 0);
    }
    this.update = function () {
        loopFor(this.timers, 'update');
        this.acceleration.moveParent();

        this.rect.setTo(this.x, this.y);
    };
    this.draw = function (ctx) {
        ctx.fillStyle = "red";
        this.rect.draw(ctx);
        //this.drawImage(ctx);
    };
    this.drawImage = function (ctx) {
        if (this.imgSrc !== "") {
            this.animatedImage.draw(ctx, this.x, this.y);
        }
    };
    this.doShoot = function () {
        this.collections[0].add(new Bullet(-18, this.x, this.y))
    };

}
