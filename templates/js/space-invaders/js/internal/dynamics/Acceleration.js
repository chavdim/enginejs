function Acceleration(parent, xcap, ycap, friction = 0.12) {
  this.parent = parent;
  this.ax = 0;
  this.ay = 0;
  this.xcap = xcap;
  this.ycap = ycap;
  this.friction = friction;
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
    };

  this.moveParent = function() {
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

}
