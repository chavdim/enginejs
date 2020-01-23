class DynamicObject {
  constructor(x, y, size, speed, imgSrc, xcap, ycap, gravity, inputMap) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.imgSrc = imgSrc;
    //RECT
    this.rect = new Rect(x, y, this.size, this.size);
    this.dead = 0;
    this.speed = speed;
    // Custom
    this.acceleration = new Acceleration(this, xcap, ycap, 0.12, gravity);
    this.inputMap = inputMap;
    //image
    if (imgSrc !== '') {
      this.animatedImage = new AnimatedImage(
          './images/enemy.png', 5, 3, 0, 0, 0, 0);
    }
  }

  update(input) {
    this.inputMap.update(input);
    // this.processInputs(input);
    loopFor(this.collections, 'update', input);

    this.acceleration.update();
    this.rect.setTo(this.x, this.y);
  }

  draw(ctx) {
    ctx.fillStyle = 'green';
    this.rect.draw(ctx);
    loopFor(this.collections, 'draw', ctx);
    //this.drawImage(ctx);
  }

  drawImage(ctx) {
    if (this.imgSrc !== '') {
      this.animatedImage.draw(ctx, this.x, this.y);
    }
  }

  decelerate() {
    this.acceleration.decelerateAllAxis(this.speed);
  }

  // put in Acceleration
  moveLeft() {
    this.acceleration.applyXAccleration(-this.speed);
  };

  moveRight() {
    this.acceleration.applyXAccleration(this.speed);
  };

  moveUp() {
    this.acceleration.applyYAccleration(-this.speed);
  };

  moveDown() {
    this.acceleration.applyYAccleration(this.speed);
  };

  changeAx(target) {
    this.acceleration.changeAx(target);
  };

  resetTick(target) {
    //this.acceleration.resetOneTick(target);
  };

  changeAy(target) {
    this.acceleration.changeAy(target);
  };

  // TODO where to declare such custom methods
  shoot() {
    this.collections[0].add(new Bullet(18, this.x, this.y));
  }
}
