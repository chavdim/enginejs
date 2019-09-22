function Acceleration(parent, xcap, ycap) {
    this.parent = parent;
    this.ax = 0;
    this.ay = 0;
    this.xcap = xcap;
    this.ycap = ycap;
    //image
    this.applyXAccleration = function (value) {
        if (Math.abs(this.ax + value ) <= this.xcap) {
            this.ax += value
        }
    };
    this.applyYAccleration = function (value) {
        if (Math.abs(this.ay + value ) <= this.ycap) {
            this.ay += value
        }
    };

    this.moveParent = function () {
        this.parent.x += this.ax;
        this.parent.y += this.ay;
    };
    this.decelerateAllAxis = function (value) {
        // ax
        if ( this.ax < 0 ) {
            if (this.ax + value > 0) {this.ax = 0}
            else {this.ax += value;}
        } else {
            if (this.ax - value <= 0) {this.ax = 0}
            else {this.ax -= value;}
        }

        // ay
        if ( this.ay < 0 ) {
            this.ay += value;
            if (this.ay + value > 0) {this.ay = 0}
            else {this.ay += value;}

        } else {
            if (this.ay - value <= 0) {this.ay = 0}
            else {this.ay -= value;}
        }
    }

}
