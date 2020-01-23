class Player extends DynamicObject {
  constructor(x, y, size, speed, imgSrc, xcap, ycap, gravity, collections, inputMap) { // TODO add actions[]?
    super(x, y, size, speed, imgSrc, xcap, ycap, gravity, inputMap
    );
    // Custom
    this.collections = collections;
    this.condition = new ActionWithCondition(this, 'doJump', function() {
        return master.loopCollection['loops'][1]['collisionHandlers'][0].collisionState;  // TODO dangerous indexing
      });
  }

  updateCustom(input) {
    this.condition.update();
  }

  doJump() {
    this.acceleration.changeAy(-25);
  }

  jump() {
    this.condition.doAction();
  }
}
