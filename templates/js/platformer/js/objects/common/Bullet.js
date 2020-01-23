function Bullet(speed, x, y) {
  this.x = x;
  this.y = y;
  this.size = 5;
  this.imgSrc = '';
  this.dead = false;
  // TODO decide where to declare
  this.acceleration = new Acceleration(this, speed, speed);
  this.acceleration.applyYAccleration(-speed);


  //RECT
  this.rect = new Rect(x, y, this.size, this.size);
  this.speed = speed;

  this.update = function(input) {
      // TOOD how to delare delete of screen
      if (this.y < -this.size) {
        this.dead = true;
      }

      // TODO apply here?
      // this.acceleration.applyYAcleration(this.speed/100);
      this.acceleration.moveParent();
      this.rect.setTo(this.x, this.y);
    };
  this.updateCustom = function(input) {
  };
  this.draw = function(ctx) {
      ctx.fillStyle = 'green';
      this.rect.draw(ctx);
      //this.drawImage(ctx);
    };
}
