class PlayerShip extends DynamicObject {
  constructor(x, y, size, speed, imgSrc, xcap, ycap, collections, inputMap) { // TODO add actions[]?
    super(x, y, size, speed, imgSrc, xcap, ycap, inputMap);
    // Custom
    this.collections = collections;
    this.cooldown = new ActionWithCooldown(6, this, 'doShoot');
    console.log(this.inputMap);
  }

  updateCustom(input) {
    this.cooldown.update();
  }

  doShoot() {
    this.collections[0].add(new Bullet(18, this.x, this.y)); // TODO dont use hardcoded index. maybe actions as dict
  }
  shoot() {
    this.cooldown.doAction();
  }
}
