function DynamicObject(x, y, size, speed, imgSrc, xcap, ycap, collections, inputMap) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.imgSrc = imgSrc;
    //RECT
    this.rect = new Rect(x, y, this.size, this.size);
    this.dead = 0;
    this.speed = speed;
    // Custom
    this.acceleration = new Acceleration(this, xcap, ycap);
    this.collections = collections;
    this.inputMap = inputMap;

    //image
    if (imgSrc !== "") {
        this.animatedImage = new AnimatedImage("./images/enemy.png", 5, 3, 0, 0, 0, 0);
    }
    this.update = function (input) {
        this.processInputs(input);
        loopFor(this.collections, 'update', input);

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
    //
    // TODO input mapping object ? (input to method)
    this.processInputs = function (input) {
        if (inputMap) {
            const keyStates = input[2].keyStates; // TODO call like input.getKeyEvent
            for (let key in this.inputMap) {
                if (keyStates[key] === 'pressed') {
                    let methodName = this.inputMap[key];
                    this[methodName]()
                }
            }
        }
        // if (keyStates['a'] !== 'pressed' &&
        //     keyStates['d'] !== 'pressed') {
        //     this.decelerate()
        // }

    };
    this.moveLeft = function () {
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
    // TODO where to declare such custom methods
    this.shoot = function () {
        this.collections[0].add(new Bullet(18, this.x, this.y))
    }
}
