function Acceleration(parent, xcap, ycap, friction = 0.12, gravity = 0) {
  this.parent = parent;
  this.ax = 0;
  this.ay = 0;
  this.xcap = xcap;
  this.ycap = ycap;
  this.friction = friction;
  this.gravity = gravity;
  this.previousTickX = null;
  this.previousTickY = null;

  this.applyXAccleration = function(value) {
      if (Math.abs(this.ax + value) <= this.xcap) {
        this.ax += value;
      }
    };
  this.applyYAccleration = function(value) {
      if (Math.abs(this.ay + value) <= this.ycap) {
        this.ay += value;
      }
    };

  this.update = function() {
      this.decelerateAllAxis();
      this.moveParent();
      this.applyGravity();
    };

  this.changeAy = function(target) {
      this.ay = target;
    };

  this.changeAx = function(target) {
      this.ax = target;
    };

  this.resetOneTick = function(target) {
      if (target === 'y') {
        // console.log(this.previousTickY + this.ay*0.8)
        this.parent.y = this.previousTickY + this.ay * 0.9;
        this.previousTickY = this.parent.y;

      } else {
        this.parent.x = this.previousTickX;
      }
    };

  this.moveParent = function() {
      this.previousTickX = this.parent.x;
      this.previousTickY = this.parent.y;

      this.parent.x += this.ax;
      this.parent.y += this.ay;
    };
  this.decelerateAllAxis = function() {
      const xdiffZero = Math.abs(0 - this.ax);
      const ydiffZero = Math.abs(0 - this.ay);
      if (this.ax < 0) {
        this.ax += this.friction * xdiffZero;
      } else {
        this.ax -= this.friction * xdiffZero;
      }
      if (this.ay < 0) {
        this.ay += this.friction * ydiffZero;
      } else {
        this.ay -= this.friction * ydiffZero;
      }
    };
  this.applyGravity = function() {
      if (this.ay < this.ycap) {
        this.ay += this.gravity;
      }
    };

}
