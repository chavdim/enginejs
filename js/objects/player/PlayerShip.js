function PlayerShip(x, y, size, speed, imgSrc, inputMap) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.imgSrc = imgSrc;
    //RECT
    this.rect = new Rect(x, y, this.size, this.size);
    this.dead = false;
    this.speed = speed;
    // Custom
    this.acceleration = new Acceleration(this, 8, 8); // TODO how to define object specific objects (util objects). Creator for the objects?
    this.collections = [new Collection(parent = this, id = "bullets", attributes = {})];
    this.cooldown = new ActionWithCooldown(6, this, 'doShoot');
    this.inputMap =  inputMap;


    //image
    if (imgSrc !== "") {
        this.animatedImage = new AnimatedImage("./images/enemy.png", 5, 3, 0, 0, 0, 0);
    }
    this.update = function (input) {
        this.inputMap.update(input);
        loopFor(this.collections, 'update', input);
        this.cooldown.update();
        this.acceleration.moveParent();
        this.rect.setTo(this.x, this.y);
    };
    this.draw = function (ctx) {
        ctx.fillStyle = "green";
        this.rect.draw(ctx);
        loopFor(this.collections, 'draw', ctx)
        //this.drawImage(ctx);
    };
    this.drawImage = function (ctx) {
        if (this.imgSrc !== "") {
            this.animatedImage.draw(ctx, this.x, this.y);
        }
    };
    this.decelerate = function () {
        this.acceleration.decelerateAllAxis(this.speed)
    };
    // custom object methods
    this.moveLeft = function () {
        console.log(this)
        this.acceleration.applyXAccleration(-this.speed)
    };
    this.moveRight = function () {
        this.acceleration.applyXAccleration(this.speed)
    };
    this.moveUp = function () {
        this.acceleration.applyYAccleration(-this.speed)
    };
    this.moveDown = function () {
        this.acceleration.applyYAccleration(this.speed)
    };
    this.doShoot = function () {
        this.collections[0].add(new Bullet(18, this.x, this.y))
    };
    this.shoot = function () {
        this.cooldown.doAciton()
    }
}
