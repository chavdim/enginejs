class StaticObject {
  constructor(x, y, w, h, imgSrc, inputMap) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.imgSrc = imgSrc;
    //RECT
    this.rect = new Rect(x, y, this.w, this.h);
    this.dead = 0;
    // Custom
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

}
